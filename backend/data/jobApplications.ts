import { faker } from '@faker-js/faker'

type TDummyJobAppliaction = {
  offer: string
  user: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  experience: string
  cvFile: string
  expiresAt: string
}

const getRandomExperience = () => {
  const EXPERIENCE = [
    'No experience',
    '0-1 years',
    '1-3 years',
    '3-5 years',
    '5+ years',
  ]

  return EXPERIENCE[Math.floor(Math.random() * EXPERIENCE.length)]
}

export const generateApplications = (
  user: string,
  offer: string
): TDummyJobAppliaction => {
  return {
    offer,
    user,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    country: faker.address.country(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    experience: getRandomExperience(),
    cvFile: './dummy.pdf',
    expiresAt: String(new Date()),
  }
}
