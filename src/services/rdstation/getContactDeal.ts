import {rdApi} from "./rdApi";
import {GetContactResponse} from "./rd.types";

export function rdGetContactDeal(deal_id: string ) {
    return new Promise<GetContactResponse>((resolve, reject) => {
         rdApi.get(`/deals/${deal_id}/contacts`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(" [ ERROR ] - error getting contact deal in RD Stations");
                reject(error);
            });
    });
}

