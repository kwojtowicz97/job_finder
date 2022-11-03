import React, { useContext, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { cvBuilderContext } from './CvBuilderContextProvider'

interface Props {
  step: number
}

const Preview = ({ step }: Props) => {
  const {
    previewDiv,
    experienceCardState: { jobExperienceItems, educationItems, languagesItems },
    personalInfoCardState,
    skillsCardState: { skillsItems, hobbyItems },
  } = useContext(cvBuilderContext)

  const { name } = personalInfoCardState
  return (
    <div ref={previewDiv}>
      <Container className={'cv-preview p-3 position-relative'}>
        <section className='border-bottom border-top p-1'>
          <h1 style={{ fontSize: '1.8em' }}>
            <b>{name}</b>
          </h1>
          <ul
            className='cv-personal-info p-0 m-0'
            style={{ listStyle: 'none' }}
          >
            <li>
              <span className='label'>E-mail</span>
              <span>{personalInfoCardState.email}</span>
            </li>
            <li>
              <span className='label'>Phone number</span>
              <span>{personalInfoCardState.phoneNumber}</span>
            </li>
            <li>
              <span className='label'>Birth date</span>
              <span>{personalInfoCardState.dateOfBirth}</span>
            </li>
            <li>
              <span className='label'>City</span>
              <span>{personalInfoCardState.city}</span>
            </li>
          </ul>
        </section>
        <section className='border-bottom p-1'>
          <h3 style={{ fontSize: '1.2em' }}>
            <b>Job experience</b>
          </h3>
          <ul
            className='cv-personal-info p-0 m-0'
            style={{ listStyle: 'none' }}
          >
            {jobExperienceItems.map((item) => (
              <li className='d-flex'>
                <span className='label-date'>{`${item.startDate
                  .substring(0, item.startDate.length - 3)
                  .replace('-', '/')} - ${item.endDate
                  .substring(0, item.endDate.length - 3)
                  .replace('-', '/')}`}</span>
                <span>
                  <b>{item.position}</b>
                  <br />
                  {`${item.company} | ${item.location}`}
                  <br />

                  <span style={{ color: 'grey' }}>Job description</span>
                  <p>{item.description}</p>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className='border-bottom p-1'>
          <h3 style={{ fontSize: '1.2em' }}>
            <b>Education</b>
          </h3>
          <ul
            className='cv-personal-info p-0 m-0'
            style={{ listStyle: 'none' }}
          >
            {educationItems.map((item) => (
              <li className='d-flex'>
                <span className='label-date'>{`${item.startDate
                  .substring(0, item.startDate.length - 3)
                  .replace('-', '/')} - ${item.endDate
                  .substring(0, item.endDate.length - 3)
                  .replace('-', '/')}`}</span>
                <span className='d-flex flex-column'>
                  <span>
                    <b>{item.school}</b>
                  </span>
                  <span>
                    <span>Level of education: </span>
                    {item.levelOfEducation}
                  </span>
                  <span>
                    <span>Level of education: </span>
                    {item.major}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className='border-bottom p-1'>
          <h3 style={{ fontSize: '1.2em' }}>
            <b>Languages</b>
          </h3>
          <ul
            className='cv-personal-info p-0 m-0'
            style={{ listStyle: 'none' }}
          >
            {languagesItems.map((item) => (
              <li>
                <b>{item.language}</b>
                {`: ${item.level}`}
              </li>
            ))}
          </ul>
        </section>
        <section className='border-bottom p-1'>
          <h3 style={{ fontSize: '1.2em' }}>
            <b>Skills</b>
          </h3>
          <span>{skillsItems.join(' • ')}</span>
        </section>
        <section className='border-bottom p-1'>
          <h3 style={{ fontSize: '1.2em' }}>
            <b>Hobbys</b>
          </h3>
          <span>{hobbyItems.join(' • ')}</span>
        </section>
      </Container>
    </div>
  )
}

export default Preview
