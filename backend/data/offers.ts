function addDays(days: number) {
  var result = new Date()
  result.setDate(result.getDate() + days)
  return result
}

export const offersForDummyCompany = [
  {
    title: 'Demo Offer',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Creating schedules, project plans and pricing',
      'Active management of the project team',
      'Estimating, assessing and minimizing risks',
    ],
    requirements: [
      'University degree; technical preferred',
      'Minimum 5 years of experience in project management',
      'Sound knowledge of project management methodology and theory',
    ],
    benefits: [
      'Attractive salary conditions',
      'Employment contract or b2b cooperation',
      'Opportunity to work with professionals with years of experience',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Ernst & Young',
    address: '725 S Figueroa St #200 Los Angeles ',
    localization: 'Remote',
    contractType: 'Contract of employment ',
    time: 'Full time ',
    experience: 'Junior  ',
    responsibilities: ['Cokolwiek wpisuje'],
    requirements: ['Cokolwiek wpisuje '],
    benefits: [],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
]

const offers = [
  {
    title: 'It Project Manager',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Creating schedules, project plans and pricing',
      'Active management of the project team',
      'Estimating, assessing and minimizing risks',
    ],
    requirements: [
      'University degree; technical preferred',
      'Minimum 5 years of experience in project management',
      'Sound knowledge of project management methodology and theory',
    ],
    benefits: [
      'Attractive salary conditions',
      'Employment contract or b2b cooperation',
      'Opportunity to work with professionals with years of experience',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Full Stack Developer',
    localization: 'On site',
    address: '',
    city: '',
    contractType: 'B2B',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Design and implementation of new functionalities and development of existing software',
      'Ensuring proper quality of the produced software and compliance with standards',
      'Error analysis and removal',
    ],
    requirements: [
      'A minimum of 2.5 years of experience',
      'Knowledge of Java, Spring Boot, Hibernate',
    ],
    benefits: [
      'Stable, long-term cooperation in a dynamically developing company',
      'Implementation of tasks in Scrum methodology',
      'Interesting, challenging projects',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },

  {
    title: 'Internship - Mobile Communication Division',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of mandate',
    time: 'Part Time',
    experience: 'Trainee',
    responsibilities: [
      'Perform analysis in compliance with 3GPP standards',
      'Writing technical reports based on protocol analysis',
      'Mobile Equipment Tests - collecting logs',
    ],
    requirements: [
      'Last years of studies (Bachelor or Master degree in Telecommunication, Electronics or related fields)',
      'Good teamwork and communication skills',
    ],
    benefits: [
      'Cooperation based on a civil law contract',
      'Flexible working hours',
      'Possibility of long lasting cooperation',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },

  {
    title: 'Network Security Specialist',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Administration of firewall systems',
      'Monitoring of network links and devices',
      'Identifying threats present in network infrastructure and responding to incidents',
      'Ability to analyze network traffic',
    ],
    requirements: [
      'Experience in LAN administration',
      'Possess knowledge of network security',
      'Very good knowledge of firewall systems',
    ],
    benefits: [
      'Friendly working atmosphere',
      'Flexible working hours',
      'Wide range of trainings and a huge support in developing algorithmic skills',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Product Support Specialist',
    localization: 'Remote',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Assist Customers with their technical and operational queries & problems related to Cornerstone Products via phone, email and ticketing system',
      'Ensure that all incidents owned are followed through to resolution, whilst keeping the customer fully informed of progress',
    ],
    requirements: [
      'Must Have: Fluency in written and spoken English',
      'Experience in Customer Support. Experience in technical support or recruitment would be an asset',
      'Flexibility, ability to change priorities quickly and capacity to handle multiple tasks',
    ],
    benefits: ['Friendly working atmosphere', 'Flexible working hours'],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Backend Engineer for Cloud Services',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Design and implement backend applications',
      'Participate in R&D projects in the area of Cloud Services',
      'Establish and follow best coding practices',
    ],
    requirements: [
      'At least 3 years of commercial experience in developing Java/JVM based server solutions',
      'Very good knowledge of Spring framework',
      'Knowledge of protocols and data exchange formats: HTTP/1.1/2.0, RESTful API',
    ],
    benefits: [
      'Friendly working atmosphere',
      'Flexible working hours',
      'Opportunity to work in multiple projects',
      'Wide range of trainings and a huge support in developing algorithmic skills',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Product Support Senior Specialist',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Senior',
    responsibilities: [
      'Supporting existing user applications including but not limited to eFront',
      'Participating in analyzing and designing automated solutions to business problems',
      'Build SME knowledge to compliment Client Service, Alts Product in execution of investment case projects and deliverables',
    ],
    requirements: [
      'Bachelor’s degree in finance or accounting would be an asset',
      'Knowledge of fund accounting operations and financial activities',
      'Fluency in English',
    ],
    benefits: [
      'Private medical care for you and your family',
      'Life Insurance',
      'Hybrid Working and Travel Opportunities',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Linux Scripting Engineer',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Monitor and configure of CI/CD processes',
      'Develop internal tools for CI/CD',
      'Manage version control system GIT/Gerrit',
    ],
    requirements: [
      'Good knowledge of Linux',
      'Scripting language: Bash',
      'Knowledge of Version Control Systems GIT',
    ],
    benefits: [
      'Continuous learning opportunities',
      'Well-being programs to support you mentally and physically',
      'Opportunities to join and get supported by employee resource groups',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Technical Support Analyst',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'IGC application maintenance and support',
      'Applying IGC service packs',
      'Upgrading IGC software to new release(s)',
      'Performance tuning, cluster resource optimization',
    ],
    requirements: [
      'Bachelor degree in Computer Science, Engineering, or related technical field',
      '3 – 5 years hands on IGC platform experience',
      '3 – 5 yrs of hands-on experience in IT supporting and maintaining Linux operating systems',
    ],
    benefits: [
      '2 additional days added to your holiday calendar for Culture Celebration and Community Service',
      'Well-being programs to support you mentally and physically',
      'Opportunities to join and get supported by employee resource groups',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Back-End Software Developer – Azure & .NET',
    localization: 'Full office work',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'New development of our proven measurement and evaluation software for thermal analysis in web technologies',
      'Conceptual design and implementation of an innovative and future-proof software platform based on state-of-the-art technologies from .NET environment',
      'Ensuring build and test operations by establishment of a robust CI/CD pipeline',
      'Performance tuning, cluster resource optimization',
    ],
    requirements: [
      'Several years of practical experience in software development',
      'Experience in the cloud area, ideally Microsoft Azure',
      'Confident handling of .NET and C# for the development of service-based applications',
    ],
    benefits: [
      'Work in an international company with a strong position on the market',
      'Professional development opportunities',
      'Friendly, informal working environment',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'IT Operations Technical Support with English',
    localization: 'Remote',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Junior',
    responsibilities: [
      'Being the first point of contact for our global customers, in fact you are the face of the Service Desk and Lumen.',
      'Troubleshooting technical/functional issues',
      'Log Incidents / Requests and maintain ownership',
      'Utilize our Knowledgebase, policies and processes to find solutions',
    ],
    requirements: [
      'Excellent verbal, written and analytical skills in English',
      'Enjoy working in a team environment',
      'Pro-active and accountable',
    ],
    benefits: [
      'Work in an international company with a strong position on the market',
      'Professional development opportunities',
      'Friendly, informal working environment',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Cyber Security Architect with English',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Regular',
    responsibilities: [
      'Definition of the most feasible and worthwhile technical solution within security areas',
      'Vulnerability Management',
      'Patch Management',
    ],
    requirements: [
      'SIEM (Splunk/Sentinel etc.)',
      'EVulnerability Management (Tenable/Qualys etc.)',
      'Endpoint Protection (Defender/McAfee etc.)',
    ],
    benefits: [
      'You will work in a collaborative, close-knit team',
      'You will be encouraged to work smart and work in your own way',
      'You will be a part of a leading global technology business',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'IT Operations Technical Support with English',
    localization: 'Remote',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Junior',
    responsibilities: [
      'Being the first point of contact for our global customers, in fact you are the face of the Service Desk and Lumen.',
      'Troubleshooting technical/functional issues',
      'Log Incidents / Requests and maintain ownership',
      'Utilize our Knowledgebase, policies and processes to find solutions',
    ],
    requirements: [
      'Excellent verbal, written and analytical skills in English',
      'Enjoy working in a team environment',
      'Pro-active and accountable',
    ],
    benefits: [
      'Work in an international company with a strong position on the market',
      'Professional development opportunities',
      'Friendly, informal working environment',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
  {
    title: 'Senior Analyst with German - Customer Relationship Management',
    localization: 'Hybrid',
    address: '',
    city: '',
    contractType: 'Contract of employment',
    time: 'Full Time',
    experience: 'Senior',
    responsibilities: [
      'Creating new Salesforce users',
      'Continuous improvement of processes and Lean Six Sigma project coordination',
      'Training and consulting internal customers and co-workers in order to obtain proper inputs and raise the knowledge',
    ],
    requirements: [
      'Bachelor’s degree or higher',
      'English and German at minimum B2 level',
      'Min. 2-3 years of equivalent work experience (depending on the process: in Supply Chain, Pricing, CRM, Project Management, Salesforce, Reporting, Finance, Customer Service)',
    ],
    benefits: [
      'Private medical care',
      'Life insurance',
      'You will be a part of a leading global technology business',
    ],
    expiresAt: addDays(Math.ceil(Math.random() * 10)),
    company: '1',
  },
]

export default offers
