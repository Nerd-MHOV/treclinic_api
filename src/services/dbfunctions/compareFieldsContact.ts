import {Contact, Deal} from "../rdstation/rd.types";
import {getPatientPK} from "../../db";
import {rdCreateTask} from "../rdstation/createTask";
import {format} from "date-fns";
import {getUniqueField} from "./compareFields";

export async function CompareFieldsContact(contact: Contact, deal: Deal) {
    try { //27819125
        let attContact = false;
        let custom_fields = contact.contact_custom_fields.map(({ custom_field_id, value }) => ({
            custom_field_id,
            value
        }))
        let emails = contact.emails.map(({email}) => ({email}));
        let phones = contact.phones.map(({phone}) => ({phone}))
        const patient_id = getUniqueField(custom_fields, "64d3f8432234fa001a714afe")
        const cpf = getUniqueField(custom_fields,"646e0b2800a1d40017275748");
        const rg = getUniqueField(custom_fields, "646e0b3cf345ab001392f58f");
        const born = getUniqueField(custom_fields, "646e0b4eb442450017264c61")
        const job = getUniqueField(custom_fields, "646e0b6c824211000f819355")
        const civil_status = getUniqueField(custom_fields, '646e0b7bce6b70000e1a18ea')
        const cep = getUniqueField(custom_fields, "646e0bb63f6493000fad9e23")
        const address = getUniqueField(custom_fields, "646e0baaf2596c000fa9a323")


        const patient = (await getPatientPK(patient_id?.value + ""))?.rows[0]

        if(!patient) {
            const taskDate = new Date()
            taskDate.setFullYear(taskDate.getFullYear() - 1);
            if(deal.next_task.subject !== "ERRO ID AGENDAMENTO" && deal.next_task.subject !== "ERRO ID PACIENTE")
            await rdCreateTask({
                task: {
                    deal_id: deal.id,
                    subject: "ERRO ID PACIENTE",
                    type: "task",
                    date: format(new Date(), "yyyy-MM-dd"),
                    hour: format(new Date(), "HH:ii"),
                    notes: `O id: ${patient_id?.value} não foi encontrado nos pacientes!`
                }
            }).then(() => console.log(`[ INFO ] - task to change contactID created`))
                .catch(() => console.log(` [ ERROR ] - err to create task change contactID`))
            throw new Error(`patient not found`)
        }
        if( cpf && !cpf.value && !!patient.cpf) {
            cpf.value = patient.cpf
            attContact = true
            console.log(` [ INFO ] - field deal cpf`);
        }
        if( rg && !rg.value && !!patient.rg) {
            rg.value = patient.rg
            attContact = true
            console.log(` [ INFO ] - field deal rg`);
        }
        if( born && !born.value && !!patient.born) {
            born.value = format(patient.born, "dd/MM/yyyy")
            attContact = true
            console.log(` [ INFO ] - field deal born`);
        }
        if( job && !job.value && !!patient.jobrole ) {
            job.value = patient.jobrole
            attContact = true
            console.log(` [ INFO ] - field deal job role`);
        }
        if ( civil_status && !civil_status.value && !!patient.civil_status ) {
            civil_status.value = patient.civil_status
            attContact = true
            console.log(` [ INFO ] - field deal civil_state`);
        }
        if( cep && !cep.value && !!patient.address_cep) {
            cep.value = patient.address_cep
            attContact = true
            console.log(` [ INFO ] - field deal CEP`);
        }
        if ( address && !address.value && ( patient.address_address || patient.address_number || patient.address_complement
            || patient.address_district || patient.address_city || patient.address_state || patient.address_country
            )
        ) {
            let addressString = "";
            if(patient.address_address) addressString += `${patient.address_address} `
            if(patient.address_number) addressString += `${patient.address_number}, `
            if(patient.address_complement) addressString += `${patient.address_complement}, `
            if(patient.address_district) addressString += `${patient.address_district} - `
            if(patient.address_city) addressString += `${patient.address_city} - `
            if(patient.address_state) addressString += `${patient.address_state} - `
            if(patient.address_country) addressString += `${patient.address_country} - `
            address.value = addressString
            attContact = true
            console.log(` [ INFO ] - field deal address`);
        }
        if ( emails.length === 0 && !!patient.email) {
            emails.push({
                email: patient.email
            })
            attContact = true
            console.log(` [ INFO ] - field deal emails`);
        }
        if ( phones.length === 0
            && (!!patient.contact_cellphone || !!patient.contact_phone_home || !! patient.contact_phone_work)) {
            if(patient.contact_cellphone) phones.push({ phone: patient.contact_cellphone})
            if(patient.contact_phone_home) phones.push({ phone: patient.contact_phone_home})
            if(patient.contact_phone_work) phones.push({ phone: patient.contact_phone_work})
            attContact = true
            console.log(` [ INFO ] - field deal phones`);
        }

        console.log(` [ INFO ] - contact update`, attContact);
        const params = {
            contact: {
                contact_custom_fields: custom_fields,
                emails,
                phones
            }
        }
        return {
            contact,
            params,
            attContact,
        }
    }catch (e) {
        console.log(` [ ERROR ] - error to compare fields contact: `, contact?.name)
        return null
    }


}