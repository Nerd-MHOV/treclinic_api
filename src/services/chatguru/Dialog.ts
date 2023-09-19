import axios from "axios";
import config from "../../config/chatGuruConfig"

export async function Dialog(
    number:string,
    dialog_id = "64ae9dc9b2af1dec7a14c7fb",
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    return (await axios.post(
        base_url
    , {}, {
            params: {
                action: "dialog_execute",
                key,
                account_id,
                phone_id,
                chat_number: number,
                dialog_id,
            }
        })).data;
}
