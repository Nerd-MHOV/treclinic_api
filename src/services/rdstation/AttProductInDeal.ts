import {Deal} from "./rd.types";
import {createProduct} from "./createProduct";
import {updateProduct} from "./updateProduct";

export async function AttProductInDeal(deal: Deal, price: number, product_id: string) {
    try {
        if(deal.deal_products.length > 0 && deal.deal_products.find(prod => prod.product_id === product_id)) {
            if(deal.deal_products.find(prod => prod.price !== price)) {
                await updateProduct(deal, deal.deal_products[0].id, { price })
                    .then(() => console.log(` [ INFO ] - Updated product in a deal `, deal.name, price))
                    .catch(() => {
                        throw new Error(`Error to update product ${deal.name} ${price}`)
                    })
            }
        } else {
            await createProduct(deal, {
                product_id,
                amount: 1,
                price
            })
                .then(() => console.log(` [ INFO ] - Created Product in a deal`, deal.name, price))
                .catch(() => {
                    throw new Error(`Error to create product ${deal.name} ${price}`)
                })
        }
    }catch (e) {
        console.log(` [ ERROR ] - Error to Att product function`)
    }
}