import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields, getUniqueField} from "../../services/dbfunctions/compareFields";
import {CheckDeadLine} from "../../services/rdstation/checkDeadLine";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {AttProductInDeal} from "../../services/rdstation/AttProductInDeal";
import {EditField} from "../../services/chatguru/EditField";
import {format} from "date-fns";
import {getAttendancePk} from "../../db";
import {Sleep} from "../../services/chatguru/Sleep";
import {Dialog} from "../../services/chatguru/Dialog";


/**
 *  Funil: Dermatologia
 *  Etapa: Confirmação de agendamento
 *  Ações: Editar Campos no Chatguru, Enviar mensagem de confirmação, mudar de etapa
 */
export const AppointmentConfirmationDermatology = async () => {
    console.log(` [ INFO ] - init process appointmentConfirmation ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "646e06782e8a2c000ea12f0a"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in appointment confirmation in Dermatology ...`)

        for (const deal of deals.deals) {
        let custom_fields = deal.deal_custom_fields.map(({custom_field_id, value}) => ({custom_field_id, value}))
        const agenda_id = getUniqueField(custom_fields, "64d3f8ff01197600181424eb")
        const attendance = (await getAttendancePk(agenda_id?.value + ""))?.rows[0];
           if(deal.contacts[0]?.phones[0]?.phone && attendance) {


                // enviar campos personalizados,
                const phone = '55' + deal.contacts[0].phones[0].phone;
                const doctorName = attendance.medic_name;
                const date = format(attendance.start_date, 'dd/MM/yyyy');
                const hour = format(attendance.start_date, 'HH:mm');

                console.log(` [INFO] - att info ${phone}, ${doctorName}, ${date}, ${hour}`)
                await EditField(phone, {
                    API_Nome_Medico: doctorName,
                    API_Data: date,
                    API_Hora: hour,
                    RD_ID: deal.id,
                    API_Funil: "Dermatologia"
                });
                await Sleep(1000);
                await Dialog(phone, '64b0554f63d1265a3b53f785')
                // enviar menssagem de confirmação
            } else {
               console.log('not found')
           }

        }
        console.log(` [ INFO ] - Finish process appointmentConfirmationDermatology....`)
        return `Appointment Confirmation process`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function AppointmentConfirmationDermatology()....", err)
        return null;
    })

}