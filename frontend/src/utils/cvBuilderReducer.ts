import {
  ActionsEnum,
  CvBuilderActions,
  CvBuilderData,
} from '../types/CvBuilder'

export const cvBuilderReducer = (
  state: CvBuilderData,
  action: CvBuilderActions
): CvBuilderData => {
  switch (action.type) {
    case ActionsEnum.UPDATE_PERSONAL_INFO:
      return { ...state, personalInfo: action.payload }
    case ActionsEnum.UPDATE_EXPERIENCE:
      return { ...state, experience: action.payload }
    case ActionsEnum.UPDATE_EDUCATION:
      return { ...state, education: action.payload }
    case ActionsEnum.UPDATE_COURSES:
      return { ...state, courses: action.payload }
    case ActionsEnum.UPDATE_SKILLS:
      return { ...state, skills: action.payload }
    case ActionsEnum.UPDATE_HOBBYS:
      return { ...state, hobbys: action.payload }
    case ActionsEnum.UPDATE_SKILLS:
      return { ...state, skills: action.payload }
    default:
      return state
  }
}
