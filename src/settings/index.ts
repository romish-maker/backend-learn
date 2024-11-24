import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from 'dotenv'
import {videosRouter} from "../videos/videosRouter";
import {RoutesList} from "../common/routes";
import {testingRouter} from "../testing/router";

config()

export const app = express()
const parseBodyMiddleware = express.json()

app.use(parseBodyMiddleware)
app.use(RoutesList.VIDEOS, videosRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello back-end HomeWorks in it-incubator!!!')
})
app.use(RoutesList.TESTING, testingRouter)