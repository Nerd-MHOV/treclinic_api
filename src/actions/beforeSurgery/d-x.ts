import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields} from "../../services/dbfunctions/compareFields";
import {CheckDeadLine} from "../../services/rdstation/checkDeadLine";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";

export const Day_x = async (day_dead_line: number, actual_stage: string, next_stage: string) => {
    console.log(` [ INFO ] - init process BeforeSurgery.D-X (${day_dead_line}) ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: actual_stage
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in BeforeSurgery.D-X (${day_dead_line}) ...`)

        for (const deal of deals.deals) {
            await CompareFields(deal, true).then(async res => {
                const checkDeadLine = await CheckDeadLine(res.deal?.attendance.start_date, day_dead_line, false)
                if(checkDeadLine) console.log(" [ INFO ] - Find Dead Line to", deal.name);

                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(() => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(() => console.log(` [ ERROR ] - error to update contact information`))

                if(res.deal?.attDeal || checkDeadLine) {
                    const params = {
                        ...(res.deal?.params ? res.deal?.params : null),
                        ...(checkDeadLine ? {deal_stage_id: next_stage} : null )
                    }
                    await UpdateDeal(deal.id, params)
                        .then(() => console.log(` [ INFO ] - updated deal ${deal.name}...`))
                        .catch(err => {
                            console.log(` [ ERROR ] - error to update deal...`)
                            throw new Error(err)
                        })
                }
            })

        }
        console.log(` [ INFO ] - Finish process BeforeSurgery.D-X (${day_dead_line})....`)

        return `BeforeSurgery Day-x (${day_dead_line})`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function Day-x()....", err)
        return null;
    })

}