import {SendMessage} from "../chatguru/sendMessage";

export const CheckDeadLine = async (scheduled_day: Date | null) => {

    try {
        if(!scheduled_day) throw new Error(`this is not a Date`)
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