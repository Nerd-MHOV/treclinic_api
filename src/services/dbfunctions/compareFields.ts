import {Contact, Deal} from "../rdstation/rd.types";

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


export function getUniqueField(custom_fields: { custom_field_id: string; value: string | string[] | number | null }[], id: string) {
    return custom_fields
        .find(field => field.custom_field_id === id)
}


