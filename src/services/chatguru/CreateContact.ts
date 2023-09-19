import config from "../../config/chatGuruConfig"
import axios from "axios";

async function CreateContact(
    number: string,
    name: string,
    user_id = "6107ec20ba62219844e717ec",
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id,
    base_url = config.base_url,
) {
    console.log("create contact", number);
    return (await axios.post(
        base_url
    , {}, {
            params: {
                action: "chat_add",
                key,
                account_id,
                phone_id,
                chat_number: number,
                name,
                user_id,
                text:"",
            }
        })).data;
}

export default CreateContact;
