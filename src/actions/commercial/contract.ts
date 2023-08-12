import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields, getUniqueField} from "../../services/dbfunctions/compareFields";
import {CheckDeadLine} from "../../services/rdstation/checkDeadLine";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {AttProductInDeal} from "../../services/rdstation/AttProductInDeal";

export const Contract = async () => {
    console.log(` [ INFO ] - init process Contract ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "646e03f8f081250018761ba1"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in contract ...`)

        for (const deal of deals.deals) {
            let custom_fields = deal.deal_custom_fields.map(({custom_field_id, value}) => ({custom_field_id, value}))
            const first_query_date = getUniqueField(custom_fields, "646e0d0700a1d40017275b92")
            await CompareFields(deal).then(async res => {


                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(res_contact => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(err => console.log(` [ ERROR ] - error to update contact information`))

                if(res.deal?.attDeal) {
                    const params = {
                        ...(res.deal?.params ? res.deal?.params : null),
                    }
                    await UpdateDeal(deal.id, params)
                        .then(res_deal => console.log(` [ INFO ] - updated deal ${deal.name}...`))
                        .catch(err => {
                            console.log(` [ ERROR ] - error to update deal...`)
                            throw new Error(err)
                        })
                }

                if(res.deal?.attendance.price !== 0) await AttProductInDeal(deal, res.deal?.attendance.price);
            })

        }
        console.log(` [ INFO ] - Finish process contract....`)

        return `Commercial.Contract`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function Commercial.Contract()....", err)
        return null;
    })

}