import axios from "axios";
import config from "../../config/chatGuruConfig"

export async function SendFile(
    number: string,
    caption: string, // caption is the text message sending with img
    file_url: string,
    send_date?: string,
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    // &var__context=context;
    return (await axios.post(
        base_url
    , {}, {
            params: {
                action: "message_file_send",
                key,
                account_id,
                phone_id,
                chat_number: number,
                caption,
                file_url,
                send_date,
            }
        })).data;
}
