import { useContext } from 'react'
import { cvBuilderContext } from '../../CvBuilderContextProvider'

interface Props {
  item: string
  index: number
}

const SkillItem = ({ item, index }: Props) => {
  const {
    skillsCardState: { setSkillsItems },
  } = useContext(cvBuilderContext)

  const deleteHandler = () => {
    setSkillsItems!((state) => state.filter((_, i) => i !== index))
  }
  return (
    <li className='my-2 skill-item '>
      <span className='rounded border shadow-sm p-2 px-3'>
        {item}
        <i
          role='button'
          onClick={deleteHandler}
          className='ms-2 fa-solid fa-xmark'
        />
      </span>
    </li>
  )
}

export default SkillItem
