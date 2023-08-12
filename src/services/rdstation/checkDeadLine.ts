import {format} from "date-fns";
import {Deal} from "./rd.types";
import {SendMessage} from "../chatguru/sendMessage";
import {UpdateDeal} from "./updateDeal";

export const CheckDeadLine = async (scheduled_day: Date, deal: Deal) => {

    try {
        const deadLine = new Date();
        deadLine.setDate(deadLine.getDate() +2);

        if(scheduled_day <= deadLine) {
            console.log(" [ INFO ] - 2 days left", scheduled_day, deadLine)
            await SendMessage();
            return true
        }
        return false
    }   catch (e) {
        console.log(` [ ERROR ] - error to check dead line`)
        return false
    }
}