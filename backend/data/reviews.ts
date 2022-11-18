import { LoremIpsum } from 'lorem-ipsum'

const description = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const user = '63068ea7db0f26ca10cb7829'

export type TDummyReview = {
  user: string
  company: string
  contents: string
  rating: number
}

export const generateReview = (company: string): TDummyReview => {
  return {
    user,
    company,
    contents: description.generateSentences(3),
    rating: 1 + Math.ceil(Math.random() * 4),
  }
}
