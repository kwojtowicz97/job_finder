const id = '6316272e9f757323a2e1124b'

function addDays(days: number) {
  var result = new Date()
  result.setDate(result.getDate() + days)
  return result
}

const offers = [
  {
    title: 'Sales Manager',
    address: 'Cupertino, LA',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    salaryMin: 3000,
    salaryMax: 5000,
    responsibilities: [
      'Creating fullstack web applications',
      'Designing UI/UX',
      'Fixing bugs',
    ],
    requirements: ['2+ years of experience', 'JS and React', 'RWD', 'Github'],
    benefits: ['Private healtcare', 'Company car', 'Budget on courses'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    tags: ['MS Office'],
    company: id,
  },
  {
    title: 'Senior Software Engineer',
    address: 'Remote',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Senior',
    salaryMin: 3000,
    salaryMax: 5000,
    responsibilities: [
      'Creating fullstack web applications',
      'Designing UI/UX',
      'Fixing bugs',
    ],
    requirements: ['2+ years of experience', 'JS and React', 'RWD', 'Github'],
    benefits: ['Private healtcare', 'Company car', 'Budget on courses'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    tags: ['JavaScript', 'TypeScript', 'HTML', 'React'],
    company: id,
  },
  {
    title: 'Sales Manager',
    address: 'Cupertino, LA',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    salaryMin: 7000,
    salaryMax: 8000,
    responsibilities: [
      'Creating fullstack web applications',
      'Designing UI/UX',
      'Fixing bugs',
    ],
    requirements: ['2+ years of experience', 'JS and React', 'RWD', 'Github'],
    benefits: ['Private healtcare', 'Company car', 'Budget on courses'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    tags: ['JavaScript', 'TypeScript', 'HTML', 'React'],
    company: id,
  },
  {
    title: 'Sales Manager',
    address: 'Cupertino, LA',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    salaryMin: 3000,
    salaryMax: 5000,
    responsibilities: [
      'Creating fullstack web applications',
      'Designing UI/UX',
      'Fixing bugs',
    ],
    requirements: ['2+ years of experience', 'JS and React', 'RWD', 'Github'],
    benefits: ['Private healtcare', 'Company car', 'Budget on courses'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    tags: ['JavaScript', 'TypeScript', 'HTML', 'React'],
    company: id,
  },
  {
    title: 'Sales Manager',
    address: 'Cupertino, LA',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    salaryMin: 3000,
    salaryMax: 5000,
    responsibilities: [
      'Creating fullstack web applications',
      'Designing UI/UX',
      'Fixing bugs',
    ],
    requirements: ['2+ years of experience', 'JS and React', 'RWD', 'Github'],
    benefits: ['Private healtcare', 'Company car', 'Budget on courses'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    tags: ['JavaScript', 'TypeScript', 'HTML', 'React'],
    company: id,
  },
]

export default offers
