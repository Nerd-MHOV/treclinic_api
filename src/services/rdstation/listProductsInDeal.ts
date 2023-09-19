import {rdApi} from "./rdApi";
import {CreateProductParams, Deal} from "./rd.types";

export async function listProductsInDeal(deal: Deal) {
    return new Promise((resolve, reject) => {
        rdApi.get(`/deals/${deal.id}/deal_products`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                console.log(" [ ERROR ] - error to update product in Deal: ", deal.name)
                reject(error);
            })
    })
}