import {Deal} from "./rd.types";
import {createProduct} from "./createProduct";
import {updateProduct} from "./updateProduct";

export async function AttProductInDeal(deal: Deal, price: number) {
    try {
        if(deal.deal_products.length > 0) {
            await updateProduct(deal, deal.deal_products[0].id, { price })
                .then(res => console.log(` [ INFO ] - Updated product in a deal `, deal.name, price))
                .catch(err => {
                    throw new Error(`Error to update product ${deal.name} ${price}`)
                })
        } else {
            await createProduct(deal, {
                product_id: "6476897a6ee1810001122a17",
                amount: 1,
                price
            })
                .then(res => console.log(` [ INFO ] - Created Product in a deal`, deal.name, price))
                .catch(err => {
                    throw new Error(`Error to create product ${deal.name} ${price}`)
                })
        }
    }catch (e) {
        console.log(` [ ERROR ] - Error to Att product function`)
    }
}