import { faker } from '@faker-js/faker'

export type TDummyJobAppliaction = {
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
  status: string
}

export const getRandomExperience = () => {
  const EXPERIENCE = [
    'No experience',
    '0-1 years',
    '1-3 years',
    '3-5 years',
    '5+ years',
  ]

  return EXPERIENCE[Math.floor(Math.random() * EXPERIENCE.length)]
}
export const getRandomStatus = () => {
  const STATUS = ['New', 'Opened', 'Considering', 'Rejected', 'Accepted']

  return STATUS[Math.floor(Math.random() * STATUS.length)]
}

export const generateApplication = (
  user: string,
  offer: string
): TDummyJobAppliaction => {
  return {
    offer,
    user,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('###-###-###'),
    country: faker.address.country(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    experience: getRandomExperience(),
    cvFile: '.uploads/dummyCV.pdf',
    status: getRandomStatus(),
  }
}
