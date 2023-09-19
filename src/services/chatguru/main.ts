import CreateContact from "./CreateContact";
import {Dialog} from "./Dialog";
import {EditContext} from "./EditContext";
import {EditField} from "./EditField";
import {SendFile} from "./SendFile";
import {SendMessage} from "./SendMessage";

const ChatGuru = {
    createContext: CreateContact,
    dialog: Dialog,
    editContext: EditContext,
    editField: EditField,
    sendFile: SendFile,
    sendMessage: SendMessage,
}

export default ChatGuru
