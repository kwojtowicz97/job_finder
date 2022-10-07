export interface PersonalInfo {
  photo?: string
  name: string | undefined
  bithData?: string
  country: string | undefined
  city: string | undefined
  phoneNumber: string | undefined
  email: string | undefined
}

interface ExperienceItem {
  startDate: string | undefined
  endDate: string | undefined
  company: string | undefined
  description: string | undefined
}

interface EducationItem {
  startDate: string | undefined
  endDate: string | undefined
  school: string | undefined
  specialization: string | undefined
  title: string | undefined
}

interface LanguageItem {
  language: string | undefined
  level: string | undefined
}

interface CourseItem {
  name: string | undefined
  organizer: string | undefined
  date: string | undefined
}

export type Experience = ExperienceItem[]
export type Education = EducationItem[]
export type Languages = LanguageItem[]
export type Courses = CourseItem[]
export type Skills = string[]
export type Hobbys = string[]

export interface CvBuilderData {
  personalInfo: PersonalInfo
  experience?: Experience
  education?: Education
  courses?: Courses
  skills?: Skills
  hobbys?: Hobbys
}

export enum ActionsEnum {
  UPDATE_PERSONAL_INFO,
  UPDATE_EXPERIENCE,
  UPDATE_EDUCATION,
  UPDATE_COURSES,
  UPDATE_SKILLS,
  UPDATE_HOBBYS,
}

export type CvBuilderActions =
  | {
      type: ActionsEnum.UPDATE_PERSONAL_INFO
      payload: PersonalInfo
    }
  | {
      type: ActionsEnum.UPDATE_EXPERIENCE
      payload: Experience
    }
  | {
      type: ActionsEnum.UPDATE_EDUCATION
      payload: Education
    }
  | {
      type: ActionsEnum.UPDATE_COURSES
      payload: Courses
    }
  | {
      type: ActionsEnum.UPDATE_SKILLS
      payload: Skills
    }
  | {
      type: ActionsEnum.UPDATE_HOBBYS
      payload: Hobbys
    }
