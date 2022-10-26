import React, { useContext, useRef, useState } from 'react'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import { cvBuilderContext } from './CvBuilder/CvBuilderContextProvider'
import { Button, Col, Container, Row } from 'react-bootstrap'
import useUploadFile from '../hooks/useUploadFile'
import { useMutation } from '@tanstack/react-query'
import useUploadCV from '../hooks/useUploadCV'

const CvBuilderDownload = () => {
  const [cvFilePath, setCvFilePath] = useState<string | undefined>('')
  const { isSend, isSending, sendFileHandler } = useUploadCV(setCvFilePath)
  const {
    previewDiv,
    experienceCardState,
    personalInfoCardState,
    skillsCardState,
  } = useContext(cvBuilderContext)
  const [pdf, setPdf] = useState<any>()

  const createPdf = async (element: HTMLDivElement) => {
    let worker = await html2pdf()
      .from(element)
      .toPdf()
      .output('blob')
      .then((data: Blob) => {
        setPdf(data)
      })
      .save('Resume.pdf')
    return worker
  }

  const uploadCvPdf = async (element: HTMLDivElement) => {
    let worker = await html2pdf()
      .from(element)
      .toPdf()
      .output('blob')
      .then((data: Blob) => {
        setPdf(data)
        console.log(pdf)
        sendFileHandler(pdf, {
          experienceCardState,
          personalInfoCardState,
          skillsCardState,
        })
      })

    return worker
  }

  return (
    <Container className='p-0 m-0 text-center'>
      <h2 className='p-3  border-bottom m-0'>Your CV is ready!</h2>
      <Row>
        <Col className='p-3 text-center border-end'>
          <p>Download your CV as PDF</p>
          <Button
            style={{ minWidth: '12ch' }}
            onClick={() =>
              previewDiv?.current && createPdf(previewDiv?.current!)
            }
          >
            Download
          </Button>
        </Col>
        <Col className='p-3 text-center'>
          <p>Save your CV on your account</p>
          <Button
            style={{ minWidth: '12ch' }}
            onClick={() =>
              previewDiv?.current && uploadCvPdf(previewDiv?.current!)
            }
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default CvBuilderDownload
