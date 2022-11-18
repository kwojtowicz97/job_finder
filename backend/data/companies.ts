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

export const demoCompany = {
  name: 'Demo Company',
  country: 'Poland',
  city: 'Warsaw',
  address: 'Marszałkowska 1',
  phoneNumber: '123-345-456',
  image: '/demoCompany.png',
  description: description.generateSentences(6),
  localization: 'Remote',
}

const companies = [
  {
    name: 'Apple inc.',
    address: 'One Apple Park Way',
    city: 'Cupertino',
    image: '../uploads/Apple-logo.png',
    user: '63068ea7db0f26ca10cb7829',
    postalAddress: 'CA 95014',
    phoneNumber: '(408) 996–1010',
    country: 'USA',
    description: description.generateSentences(5),
    reviews: [],
  },
  {
    name: 'Lingaro',
    address: 'ul. Marszałkowska 132/21',
    city: 'Warsaw',
    image: '../uploads/lingaro.png',
    user: '63068ea7db0f26ca10cb7829',
    postalAddress: '26-600',
    phoneNumber: '+48 539-32-21',
    country: 'Poland',
    description: description.generateSentences(5),
    reviews: [],
  },
  {
    name: 'Amazon',
    address: '410 Terry Ave N',
    city: 'Seattle',
    image: '../uploads/Amazon.png',
    user: '63068ea7db0f26ca10cb7829',
    postalAddress: '98109',
    phoneNumber: '(877) 375-9365',
    country: 'United States',
    description: description.generateSentences(5),
    reviews: [],
  },
  {
    name: 'Meta',
    address: '1 Hacker Way',
    city: 'Menlo Park',
    image: '../uploads/Meta.png',
    user: '63068ea7db0f26ca10cb7829',
    postalAddress: '94025',
    phoneNumber: '(877) 375-9365',
    country: 'United States',
    description: description.generateSentences(5),
    reviews: [],
  },
]

export default companies
