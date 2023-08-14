import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import {errorMiddleware} from "./middleware/error";
import {FirstQuery} from "./actions/attendance/firstQuery";
import {OperationalSurgery} from "./actions/beforeSurgery/operationalSurgery";

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


app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})