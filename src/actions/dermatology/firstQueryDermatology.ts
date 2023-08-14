import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields} from "../../services/dbfunctions/compareFields";
import {CheckDeadLine} from "../../services/rdstation/checkDeadLine";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {AttProductInDeal} from "../../services/rdstation/AttProductInDeal";

export const FirstQueryDermatology = async () => {
    console.log(` [ INFO ] - init process Dermatology.firstQuery ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "646e06782e8a2c000ea12f09"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in DERMATOLOGY first query ...`)

        for (const deal of deals.deals) {
            await CompareFields(deal).then(async res => {

                const checkDeadLine = await CheckDeadLine(res.deal?.attendance.start_date, 2);

                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(() => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(() => console.log(` [ ERROR ] - error to update contact information`))

                if(res.deal?.attDeal || checkDeadLine) {
                    const params = {
                        ...(res.deal?.params ? res.deal?.params : null),
                        ...(checkDeadLine ? {deal_stage_id: "646e06782e8a2c000ea12f0a"} : null )
                    }
                    await UpdateDeal(deal.id, params)
                        .then(() => console.log(` [ INFO ] - updated deal ${deal.name}...`))
                        .catch(err => {
                            console.log(` [ ERROR ] - error to update deal...`)
                            throw new Error(err)
                        })
                }

                if(res.deal?.attendance.price !== 0)
                    await AttProductInDeal(deal, res.deal?.attendance.price, "6476897a6ee1810001122a17");
            })

        }
        console.log(` [ INFO ] - Finish process Dermatology.firstQuery....`)

        return `Dermatology First Query Process`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function FirstQuery()....", err)
        return null;
    })

}