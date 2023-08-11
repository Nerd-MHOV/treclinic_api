import {UpdateContactParams, UpdateContactResponse, UpdateDealParams, UpdateDealResponse} from "./rd.types";
import {rdApi} from "./rdApi";

export async function UpdateContact(contact_id: string,params: UpdateContactParams) {
    return new Promise<UpdateContactResponse>((resolve, reject) => {
        rdApi.put("/contacts/"+contact_id, {...params})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.log(` [ ERROR ] - error updating a contact....`)
                reject(error);
            })
    })
}