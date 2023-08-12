import {rdApi} from "./rdApi";
import {CreateProductParams, Deal} from "./rd.types";

export async function createProduct(deal: Deal, params: CreateProductParams) {
    return new Promise((resolve, reject) => {
        rdApi.post(`/deals/${deal.id}/deal_products`, params)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                console.log(" [ ERROR ] - error to create product in Deal: ", deal.name)
                reject(error);
            })
    })
}