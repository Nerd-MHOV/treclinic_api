import {rdApi} from "./rdApi";
import {CreateProductParams, Deal} from "./rd.types";

export async function updateProduct(deal: Deal, product_id: string, params: Partial<CreateProductParams>) {
    return new Promise((resolve, reject) => {
        rdApi.put(`/deals/${deal.id}/deal_products/${product_id}`, params)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                console.log(" [ ERROR ] - error to update product in Deal: ", deal.name)
                reject(error);
            })
    })
}