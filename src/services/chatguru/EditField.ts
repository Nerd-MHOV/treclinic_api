import axios from "axios";
import config from "../../config/chatGuruConfig"
import {addPrefixToObjectKeys} from "./AddPrefixToObj";

export async function EditField(
    number: string,
    fields: {
        [key: string]: any,
    },
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    // &field__email=email;
    const objField = addPrefixToObjectKeys(fields, "field__")
    return (await axios.post(
        base_url, {}, {
            params: {
                action: "chat_update_custom_fields",
                key,
                account_id,
                phone_id,
                chat_number: number,
                ...objField,
            }
        })).data;
}

