import {ResolutionEnums} from "./enums";

export type VideoModel = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: null | ResolutionEnums[]
}

export type InputVideoType = {
    title: string
    author: string
    availableResolutions: ResolutionEnums[]
}


