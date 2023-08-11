import {rdApi} from "./rdApi";
import {Opportunity, OpportunityParams} from "./rd.types";

export function rdGetDeals(params: OpportunityParams): Promise<Opportunity> {
    return new Promise<Opportunity>((resolve, reject) => {
        if(!params.limit) params.limit = 200
        rdApi.get("/deals", { params })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(" [ ERROR ] - error getting negotiations in RD Stations");
                reject(error);
            });
    });
}


// const queryParameters = {
//     page: params.page,
//     limit: params.limit || 200,
//     order: params.order || undefined,
//     direction: params.direction || undefined,
//     name: params.name || undefined,
//     win: params.win || undefined,
//     user_id: params.user_id || undefined,
//     closed_at: params.closed_at || undefined,
//     closed_at_period: params.closed_at_period || undefined,
//     created_at_period: params.created_at_period || undefined,
//     prediction_date_period: params.prediction_date_period || undefined,
//     start_date: params.start_date || undefined,
//     end_date: params.end_date || undefined,
//     campaign_id: params.campaign_id || undefined,
//     deal_stage_id: params.deal_stage_id || undefined,
//     deal_lost_reason_id: params.deal_lost_reason_id || undefined,
//     deal_pipeline_id: params.deal_pipeline_id || undefined,
//     organization: params.organization || undefined,
//     hold: params.hold || undefined,
//     product_presence: params.product_presence || undefined,
// }