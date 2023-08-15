import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import {errorMiddleware} from "./middleware/error";
import {FirstQuery} from "./actions/attendance/firstQuery";
import {OperationalSurgery} from "./actions/beforeSurgery/operationalSurgery";
import {BlockDateSurgery} from "./actions/commercial/blockDateSurgery";
import {FirstQueryDermatology} from "./actions/dermatology/firstQueryDermatology";
import {day_dead_line} from "./services/rdstation/Days";
import cron from "node-cron";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3333

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

//ports

app.get("/first-query", async  (req, res) => {
    const response = await FirstQuery()
    res.json(response);
})

app.get("/before-surgery", async (req, res) => {
    const response = await OperationalSurgery();
    res.json(response);
})

app.get("/block-date-surgery", async (req, res) => {
    const response = await BlockDateSurgery();
    res.json(response)
})

app.get("/dermatology/first-query", async (req, res) => {
    const response = await FirstQueryDermatology();
    res.json(response)
})

app.get("/before-surgery/d/:days", async (req, res) => {
    const {days} = req.params;
    if(days in day_dead_line) {
        // @ts-ignore
        const response = await day_dead_line[days]()
        return res.json(response)
    }

    return res.json(null)
})


// field	            value
// second	            0-59        is not necessary

// minute	            0-59
// hour	                0-23
// day of month	        1-31
// month	            1-12 (or names)
// day of week	        0-7 (or names, 0 or 7 are sunday)
cron.schedule('*/30 * * * *', async () => {
    await FirstQuery();
    console.log("-------------")
    console.log(" [ CRON TAB ] - schedule to: FirstQueryDermatology()");
    await FirstQueryDermatology()
    console.log("-------------")
    console.log(" [ CRON TAB ] - schedule to: BlockDateSurgery()");
    await BlockDateSurgery()
    console.log("-------------")
    console.log(" [ CRON TAB ] - schedule to: OperationalSurgery()");
    await OperationalSurgery();
})

cron.schedule("0 3 * * *", async () => {
    const days = Object.keys(day_dead_line).reverse();
    for(const day of days) {
        console.log(" [ CRON TAB ] - schedule to: ", day);
        // @ts-ignore
        await day_dead_line[day]()
        await sleep(10000)
        console.log("-------------")
    }
})

function sleep(ms: number) {
    console.log("sleep to ", ms, "ms")
    return new Promise(resolve => setTimeout(resolve, ms));
}




app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})