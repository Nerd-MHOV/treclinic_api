import {CreateTaskParams, Opportunity, OpportunityParams} from "./rd.types";
import {rdApi} from "./rdApi";

export function rdCreateTask(params: CreateTaskParams) {
    return new Promise<Opportunity>((resolve, reject) => {
        rdApi.post("/tasks", params)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(" [ ERROR ] - error getting negotiations in RD Stations");
                reject(error);
            });
    });
}
