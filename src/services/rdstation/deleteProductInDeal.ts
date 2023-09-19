import {rdApi} from "./rdApi";
import {CreateProductParams, Deal} from "./rd.types";

export async function deleteProductInDeal(deal: Deal, productId: string) {
    return new Promise((resolve, reject) => {
        rdApi.delete(`/deals/${deal.id}/deal_products/${productId}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                console.log(" [ ERROR ] - error to delete product in Deal: ", deal.name, productId)
                reject(error);
            })
    })
}