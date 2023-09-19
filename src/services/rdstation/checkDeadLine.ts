import {differenceInCalendarDays, format} from "date-fns"

export const CheckDeadLine = async (scheduled_day: Date | null, days_to_dead_line: number, sendMessage = true) => {

    try {
        if(!scheduled_day) throw new Error(`this is not a Date`)
        const deadLine = new Date();
        deadLine.setDate(deadLine.getDate() +days_to_dead_line);

        console.log(differenceInCalendarDays(scheduled_day, new Date()), format(scheduled_day, "dd/MM/yyyy"), format(deadLine, "dd/MM/yyyy"))
        if(scheduled_day <= deadLine) {
            console.log(` [ INFO ] -  ${days_to_dead_line} days left`, scheduled_day, deadLine)
            // if(sendMessage) await SendMessage();
            return true
        }
        return false
    }   catch (e) {
        console.log(` [ ERROR ] - error to check dead line`)
        return false
    }
}