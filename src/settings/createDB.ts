import {ResolutionEnums} from "../videos/models/enums";
import {VideoModel} from "../videos/models/VideoModel";

export const db = {
    videos: [
        {
            id: 0,
            title: "Какое то видео",
            author: "Ромиш",
            canBeDownloaded: true,
            minAgeRestriction: 3,
            createdAt: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
            publicationDate:new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
            availableResolutions: [ResolutionEnums.P144]
        } as VideoModel
    ]
}