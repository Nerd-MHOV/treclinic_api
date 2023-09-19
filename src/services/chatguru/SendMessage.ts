import axios from "axios";
import config from "../../config/chatGuruConfig"

export async function SendMessage(
    number: string,
    text: string,
    send_date?: string,
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    return (await axios.post(
            base_url
        , {}, {
            params: {
                action: "message_file_send",
                key,
                account_id,
                phone_id,
                chat_number: number,
                text,
                send_date,
            }
        })).data;
}
