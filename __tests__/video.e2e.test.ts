import {RoutesList} from "../src/common/routes";
import {agent} from 'supertest'
import {app} from "../src/settings";
import {HttpStatusCode} from "../src/common/enums/HttpStatusesCode";
import {db} from "../src/settings/createDB";
import {ResolutionEnums} from "../src/videos/models/enums";
import {InputVideoType} from "../src/videos/models/VideoModel";
import exp from "node:constants";

export const request = agent(app)

describe('/videos', () => {
    beforeEach(async () => {
        await request.delete(`${RoutesList.TESTING}/all-data`)
    });

    it('should get empty array', async () => {
        const res = await request
            .get(RoutesList.VIDEOS)
            .expect(HttpStatusCode.OK_200)

        expect(res.body.length).toBe(0)
    })

    it('should get not empty array', async () => {
        const newVideo: InputVideoType = {
            title: "new video",
            author: "romish",
            availableResolutions: [ResolutionEnums.P144]
        }

        const createdVideoResponse = await request
            .post(RoutesList.VIDEOS)
            .send(newVideo)
            .expect(HttpStatusCode.CREATED_201)

        const getVideoResponse = await request
            .get(RoutesList.VIDEOS)
            .expect(HttpStatusCode.OK_200)

        const createdVideoBody = createdVideoResponse.body

        expect(getVideoResponse.body[0]).toEqual({
            id: createdVideoBody.id,
            title: createdVideoBody.title,
            author: createdVideoBody.author,
            canBeDownloaded: createdVideoBody.canBeDownloaded,
            minAgeRestriction: createdVideoBody.minAgeRestriction,
            createdAt: createdVideoBody.createdAt,
            publicationDate: createdVideoBody.publicationDate,
            availableResolutions: createdVideoBody.availableResolutions
        })
    })
    it('should create', async () => {
        const newVideo: InputVideoType = {
            title: "new video",
            author: "romish",
            availableResolutions: [ResolutionEnums.P144]
        }

        const res = await request
            .post(RoutesList.VIDEOS)
            .send(newVideo)
            .expect(HttpStatusCode.CREATED_201)


        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    })

    it('should not to be created, error with title', async () => {
        const newVideo: InputVideoType = {
            title: "",
            author: "romish",
            availableResolutions: [ResolutionEnums.P144]
        }

        await request
            .post(RoutesList.VIDEOS)
            .send(newVideo)
            .expect(HttpStatusCode.BAD_REQUEST_400)
    })

    it('should find video by id', async () => {
        const newVideo: InputVideoType = {
            title: "new video",
            author: "romish",
            availableResolutions: [ResolutionEnums.P144]
        }

        const createdVideo = await request
            .post(RoutesList.VIDEOS)
            .send(newVideo)
            .expect(HttpStatusCode.CREATED_201)

        await request
            .get(`${RoutesList.VIDEOS}/${createdVideo.body.id}`)
            .expect(HttpStatusCode.OK_200)

    })

    it('shouldn\'t find by id', async () => {
        await request
            .get(RoutesList.VIDEOS + '/1')
            .expect(HttpStatusCode.NOT_FOUND_404)
    })

    it('should update by id', async () => {
        const newVideo: InputVideoType = {
            title: "new video",
            author: "romish",
            availableResolutions: [ResolutionEnums.P144]
        }

        const createdVideoResponse = await request
            .post(RoutesList.VIDEOS)
            .send(newVideo)
            .expect(HttpStatusCode.CREATED_201)

        const updatedVideo = {
            title: "updated video",
            author: "romish new",
            availableResolutions: [ResolutionEnums.P360],
            canBeDownloaded: false,
            minAgeRestriction: 19
        }
        await request
            .put(`${RoutesList.VIDEOS}/${createdVideoResponse.body.id}`)
            .send(updatedVideo)
            .expect(HttpStatusCode.NO_CONTENT_204)

        const foundedEditedVideo = await request
            .get(`${RoutesList.VIDEOS}/${createdVideoResponse.body.id}`)
            .expect(HttpStatusCode.OK_200)

        expect(foundedEditedVideo.body.title).toEqual(foundedEditedVideo.body.title)
        expect(foundedEditedVideo.body.author).toEqual(foundedEditedVideo.body.author)
    })
})