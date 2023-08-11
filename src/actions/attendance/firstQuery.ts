import {rdGetDeals} from "../../services/rdstation/getDeals";
import {rdGetContactDeal} from "../../services/rdstation/getContactDeal";
import {CompareFieldsContact} from "../../services/dbfunctions/compareFieldsContact";
import {CompareFieldsDeal} from "../../services/dbfunctions/compareFieldsDeals";

export const FirstQuery = async () => {
    console.log(` [ INFO ] - init process firstQuery ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "646d27436d6ecc000f94f995"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in first query ...`)

        for (const deal of deals.deals) {
            //verify contact
            await rdGetContactDeal(deal.id)
                .then(async contact => {
                    await CompareFieldsContact(contact.contacts[0], deal.id);
                })

            await CompareFieldsDeal(deal)
        }
        console.log(` [ INFO ] - Finish process firstQuery....`)

        return `First Query Process`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function FirstQuery()....")
        return null;
    })

}