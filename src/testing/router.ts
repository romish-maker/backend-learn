import {Router} from "express";
import {create} from "node:domain";
import {HttpStatusCode} from "../common/enums/HttpStatusesCode";
import {db} from "../settings/createDB";

export const testingRouter = Router()

testingRouter.delete('/all-data', (req, res) => {
    db.videos.length = 0
    res.sendStatus(HttpStatusCode.NO_CONTENT_204)
})