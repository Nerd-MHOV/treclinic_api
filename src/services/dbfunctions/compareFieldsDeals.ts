import {Deal, UpdateDealParams} from "../rdstation/rd.types";
import {getAttendancePk} from "../../db";
import {rdCreateTask} from "../rdstation/createTask";
import {format} from "date-fns";
import {medics} from "../rdstation/medics";
import {UpdateDeal} from "../rdstation/updateDeal";
import {getUniqueField} from "./compareFields";

export async function CompareFieldsDeal(deal: Deal, surgery = false) {
    try {
        let attDeal = false;
        let custom_fields = deal.deal_custom_fields.map(({custom_field_id, value}) => ({custom_field_id, value}))
        const agenda_id = getUniqueField(custom_fields, "64d3f8ff01197600181424eb")
        const date_first_query = getUniqueField(custom_fields, "646e0d0700a1d40017275b92")
        const date_surgery = getUniqueField(custom_fields, "646e0ceafcdd950011703ab2")
        const medic = getUniqueField(custom_fields, "646ea8f90f9bd3000f6f6f8e")
        const agenda_type = getUniqueField(custom_fields, "64d4fd2db72bbb001e1ef67f")
        const attendance = (await getAttendancePk(agenda_id?.value + ""))?.rows[0];
        if(!attendance) {
            // todo: uma vez por dia!

            const taskDate = new Date()
            taskDate.setFullYear(taskDate.getFullYear() - 1);
            if(deal.next_task.subject !== "ERRO ID AGENDAMENTO" && deal.next_task.subject !== "ERRO ID PACIENTE")
            rdCreateTask({
                task: {
                    deal_id: deal.id,
                    subject: "ERRO ID AGENDAMENTO",
                    type: "task",
                    date: format(taskDate, "yyyy-MM-dd"),
                    hour: format(new Date(), "HH:ii"),
                    notes: `O id: ${agenda_id?.value} não foi encontrado no atendimentos futuros!`
                }
            }).then(res => console.log(`[ INFO ] - task to change attendanceID created`))
                .catch(err => console.log(` [ ERROR ] - err to create task change attendanceID`))
            throw new Error(`attendance not found`)
        }



        if(!surgery && date_first_query && !!attendance.start_date) {
            const formatStartDate = format(attendance.start_date, "dd/MM/yyyy")
            if(formatStartDate !== date_first_query.value) {
                date_first_query.value = formatStartDate
                attDeal = true
                console.log(` [ INFO ] - field deal data_first_query`);
            }
        } else if(!surgery && !date_first_query && !!attendance.start_date) {
            custom_fields.push({
                custom_field_id: '646e0d0700a1d40017275b92',
                value: format(attendance.start_date, "dd/MM/yyyy")
            })
            attDeal = true
            console.log(` [ INFO ] - field deal data_first_query`);
        }

        if(surgery && date_surgery && !!attendance.start_date) {
            const formatStartDate = format(attendance.start_date, "dd/MM/yyyy")
            if(formatStartDate !== date_surgery.value) {
                date_surgery.value = formatStartDate
                attDeal = true
                console.log(` [ INFO ] - field deal date_surgery`);
            }
        } else if (surgery && !date_surgery && !!attendance.start_date ) {
            custom_fields.push({
                custom_field_id: "646e0ceafcdd950011703ab2",
                value: format(attendance.start_date, "dd/MM/yyyy")
            })
            attDeal = true
            console.log(` [ INFO ] - field deal date_surgery`);
        }
        if(medic && Array.isArray(medic.value) && !!attendance.medic_name && !medic.value.includes(attendance.medic_name)) {
                medic.value.push(attendance.medic_name)
                attDeal = true
                console.log(` [ INFO ] - field deal medic_name`);
        } else if (!medic && !!attendance.medic_name) {
            custom_fields.push({
                custom_field_id: '646ea8f90f9bd3000f6f6f8e',
                // @ts-ignore
                value: [attendance.medic_name]
            })
            attDeal = true
            console.log(` [ INFO ] - field deal medic_name`);
        }
        if(agenda_type && !!attendance.agenda_name && agenda_type.value !== attendance.agenda_name) {
            agenda_type.value = attendance.agenda_name
            attDeal = true
            console.log(` [ INFO ] - field deal agenda_type`);
        } else if(!agenda_type && !!attendance.agenda_name) {
            custom_fields.push({
                custom_field_id: "64d4fd2db72bbb001e1ef67f",
                value: attendance.agenda_name
            })
            attDeal = true
            console.log(` [ INFO ] - field deal agenda_type`);
        }

        console.log(` [ INFO ] - deal update`, attDeal);
        const params = {
            deal: {
                deal_custom_fields: custom_fields
            }
        }
        return {
            deal,
            params,
            attDeal,
            attendance,
        }

    }catch (e) {
        console.log(` [ ERROR ] - error to compare fields deal: `, deal.name)
        return null
    }

}