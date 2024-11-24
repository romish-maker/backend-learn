import {Router} from "express";
import {VideoModel} from "./models/VideoModel";
import {ResolutionEnums} from "./models/enums";
import {HttpStatusCode} from "../common/enums/HttpStatusesCode";
import {db} from "../settings/createDB";

export const videosRouter = Router()

const videos = db.videos

videosRouter.get('/', async (req, res) => {
    res.send(videos)
        .status(HttpStatusCode.OK_200)
})

videosRouter.get('/:videoId', async (req, res) => {
    const foundVideoById = videos.find(video => video.id === +req.params.videoId)

    if (!foundVideoById) {
        res.sendStatus(HttpStatusCode.NOT_FOUND_404)
        return
    }

    res.send(foundVideoById)
        .status(HttpStatusCode.OK_200)
})

videosRouter.post('/', async (req, res) => {
    const { title, author, availableResolutions } = req.body
    const errorsMessages = []

    if (!title) {
        errorsMessages.push({
            message: "title cannot be empty",
            field: "title"
        })
        res.status(HttpStatusCode.BAD_REQUEST_400)
            .json(errorsMessages)
        return
    }

    if (!author) {
        errorsMessages.push({
            message: "author cannot be empty",
            field: "author"
        })
        res.status(HttpStatusCode.BAD_REQUEST_400)
            .json(errorsMessages)
        return
    }

    const newVideo = {
        id: Number(new Date()),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
        publicationDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
        availableResolutions,
    }

    videos.push(newVideo)

    res.status(HttpStatusCode.CREATED_201)
        .json(newVideo)
})

videosRouter.put('/:videoId', async (req, res) => {
    const videoId = +req.params.videoId;
    const foundVideo = videos.find(video => video.id === videoId);

    if (!foundVideo) {
        res.status(HttpStatusCode.NOT_FOUND_404)
        return
    }

    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const errorsMessages = [];

    if (!title) {
        errorsMessages.push({
            message: "Title cannot be empty",
            field: "title"
        });
    }

    if (!author) {
        errorsMessages.push({
            message: "Author cannot be empty",
            field: "author"
        });
    }

    if (!author) {
        errorsMessages.push({
            message: "Author cannot be empty",
            field: "author"
        });
    }

    if (errorsMessages.length > 0) {
        res.status(HttpStatusCode.BAD_REQUEST_400).json({ errorsMessages });

        return
    }

    foundVideo.title = title;
    foundVideo.author = author;
    foundVideo.availableResolutions = availableResolutions || foundVideo.availableResolutions;
    foundVideo.canBeDownloaded = typeof canBeDownloaded === 'boolean' ? canBeDownloaded : foundVideo.canBeDownloaded;
    foundVideo.minAgeRestriction = typeof minAgeRestriction === 'number' ? minAgeRestriction : foundVideo.minAgeRestriction;
    foundVideo.publicationDate = publicationDate || foundVideo.publicationDate;

    res.sendStatus(HttpStatusCode.NO_CONTENT_204);
});


videosRouter.delete('/', async (req, res) => {

})
