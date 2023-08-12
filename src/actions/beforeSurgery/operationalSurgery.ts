import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields} from "../../services/dbfunctions/compareFields";
import {CheckDeadLine} from "../../services/rdstation/checkDeadLine";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {AttProductInDeal} from "../../services/rdstation/AttProductInDeal";

export const OperationalSurgery = async () => {
    console.log(` [ INFO ] - init process OperationalSurgery ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "64adea89c2b076002e98010e"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in operational surgery ...`)

        for (const deal of deals.deals) {
            await CompareFields(deal).then(async res => {
                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(() => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(() => console.log(` [ ERROR ] - error to update contact information`))
                if(res.deal?.attDeal) {
                    const params = {
                        ...(res.deal?.params ? res.deal?.params : null),
                    }
                    await UpdateDeal(deal.id, params)
                        .then(() => console.log(` [ INFO ] - updated deal ${deal.name}...`))
                        .catch(err => {
                            console.log(` [ ERROR ] - error to update deal...`)
                            throw new Error(err)
                        })
                }
                if(res.deal?.attendance.price !== 0) await AttProductInDeal(deal, res.deal?.attendance.price);
            })

        }
        console.log(` [ INFO ] - Finish process Operational Surgery....`)

        return `First Query Process`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function OperationalSurgery()....", err)
        return null;
    })

}