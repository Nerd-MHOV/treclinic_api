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
            //let custom_fields = deal.deal_custom_fields.map(({custom_field_id, value}) => ({custom_field_id, value}))
            //const first_query_date = getUniqueField(custom_fields, "646e0d0700a1d40017275b92")
            await CompareFields(deal).then(async res => {

                const checkDeadLine = await CheckDeadLine(res.deal?.attendance.start_date);

                if (res.contact?.attContact) await UpdateContact(res.contact.contact.id, res.contact.params)
                    .then(() => console.log(` [ INFO ] - updated contact information ${res.contact?.contact.name}`))
                    .catch(() => console.log(` [ ERROR ] - error to update contact information`))

                if(res.deal?.attDeal || checkDeadLine) {
                    //todo : verificar pq não editou o medico!
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

                if(res.deal?.attendance.price !== 0) await AttProductInDeal(deal, res.deal?.attendance.price);
            })

        }
        console.log(` [ INFO ] - Finish process Dermatology.firstQuery....`)

        return `First Query Process`
    }).catch( err => {
        console.log(" [ ERROR ] - Error executing function FirstQuery()....", err)
        return null;
    })

}