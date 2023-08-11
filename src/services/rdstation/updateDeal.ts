import {UpdateDealParams, UpdateDealResponse} from "./rd.types";
import {rdApi} from "./rdApi";

export async function UpdateDeal(deal_id: string, params: { deal: { deal_custom_fields: { custom_field_id: string; value: string | number | null }[] } }) {
    return new Promise<UpdateDealResponse>((resolve, reject) => {
        rdApi.put("/deals/"+deal_id, {...params})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if(error?.response?.status === 422) {
                    console.log(` [ INFO ] - 422 updated deal but some information is wrong`)
                    if(error?.response?.data) resolve(error?.response?.data)
                } else {
                    console.log(` [ ERROR ] - error updating a deal...`)
                }
                reject(error);
            })
    })
}