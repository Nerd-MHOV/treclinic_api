import {rdGetDeals} from "../../services/rdstation/getDeals";
import {CompareFields, getUniqueField} from "../../services/dbfunctions/compareFields";
import {UpdateContact} from "../../services/rdstation/updateContact";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {AttProductInDeal} from "../../services/rdstation/AttProductInDeal";

export const BlockDateSurgery = async () => {
    console.log(` [ INFO ] - init process BlockDateSurgery ...`)
    return rdGetDeals({
        win: "null",
        deal_stage_id: "646e03f8f081250018761ba0"
    }).then( async deals => {
        console.log(` [ INFO ] - find ${deals.total} deals in Block Date Surgery ...`)

        for (const deal of deals.deals) {
            await CompareFields(deal, true).then(async res => {
                let custom_fields = deal.deal_custom_fields.map(({custom_field_id, value}) => ({custom_field_id, value}))
                const surgery_date = getUniqueField(custom_fields, "646e0ceafcdd950011703ab2")
                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(() => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(() => console.log(` [ ERROR ] - error to update contact information`))


                if(res.deal?.attDeal || surgery_date) {
                    const params = {
                        ...(res.deal?.params ? res.deal?.params : null),
                        deal_stage_id: "646e03f8f081250018761ba1"
                    }
                    await UpdateDeal(deal.id, params)
                        .then(() => console.log(` [ INFO ] - updated deal ${deal.name}...`))
                        .catch(err => {
                            console.log(` [ ERROR ] - error to update deal...`)
                            throw new Error(err)
                        })
                }
                if(res.deal?.attendance.price !== 0)
                    await AttProductInDeal(deal, res.deal?.attendance.price, "6476897a6ee1810001122a22");
            })

        }
        console.log(` [ INFO ] - Finish process Block Date Surgery....`)

        return `Commercial.BlockDateSurgery`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function Commercial.BlockDateSurgery()....", err)
        return null;
    })

}