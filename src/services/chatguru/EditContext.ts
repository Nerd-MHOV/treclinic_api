import axios from "axios";
import config from "../../config/chatGuruConfig"
import {addPrefixToObjectKeys} from "./AddPrefixToObj";

export async function EditContext(
    number: string,
    context: {
        [key:string]: any
    },
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    // &var__context=context;
    const objContext = addPrefixToObjectKeys(context, "var__");
    return (await axios.post(
        base_url
    , {}, {
            params: {
                action: "chat_update_context",
                key,
                account_id,
                phone_id,
                chat_number:number,
                context,
                ...objContext
            }
        })).data;
}
