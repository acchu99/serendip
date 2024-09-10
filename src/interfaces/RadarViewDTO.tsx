export default interface RadarViewDTO {
  allTopics: string[]
  allFlairs: string[]
  selectedTopics: string[]
  selectedFlairs: string[]
  flairTopicLikelihood: FlairTopicLikelihood[]
}

export interface FlairTopicLikelihood {
  flair: string
  topic: string
  likeliness: number
}
