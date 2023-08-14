
// export  function getDealsFields(deal: Deal) {
//     return {
//         date_first_query: getValueCustomFieldDeal(deal, "646e0d0700a1d40017275b92"),
//         agenda_id: getValueCustomFieldDeal(deal, "64d3f8ff01197600181424eb"),
//         date_surgery: getValueCustomFieldDeal(deal, "646e0ceafcdd950011703ab2"),
//         date_before_surgery: getValueCustomFieldDeal(deal, "646e0d3f8fd39400114737f0"),
//         date_after_surgery: getValueCustomFieldDeal(deal, "646e0d7ede6ee9000f8fef0d"),
//         medic: getValueCustomFieldDeal(deal, "646ea8f90f9bd3000f6f6f8e"),
//         agenda_type: getValueCustomFieldDeal(deal, "64d4fd2db72bbb001e1ef67f"),
//     }
// }


import {Deal} from "../rdstation/rd.types";
import {rdGetContactDeal} from "../rdstation/getContactDeal";
import {CompareFieldsContact} from "./compareFieldsContact";
import {CompareFieldsDeal} from "./compareFieldsDeals";

export async function CompareFields(deal_to_compare: Deal) {
   const contact = await rdGetContactDeal(deal_to_compare.id)
        .then(async contact => {
            return await CompareFieldsContact(contact.contacts[0], deal_to_compare);
        })
    const deal = await CompareFieldsDeal(deal_to_compare)

    return {
       contact,
        deal
    }
}

export function getUniqueField(custom_fields: { custom_field_id: string; value: string | string[] | number | null }[], id: string) {
    return custom_fields
        .find(field => field.custom_field_id === id)
}


