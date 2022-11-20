import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useListCompanies from '../hooks/useListCompanies'
import { errorHandler } from '../utils/errorHandler'
import { CardCarousel } from '../components/CardCarousel'
import CompanyCardExtended from '../components/CompanyCardExtended'
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import useListAllCompanies from '../hooks/useListAllCompanies'
import { Helmet } from 'react-helmet-async'

const CompaniesScreen = () => {
  const [companySearch, setCompanySearch] = useState('')
  const [locationSearch, setLoacationSearch] = useState('')

  const [showResetButton, setShowResetButton] = useState(false)

  const resetFiltersHandler = () => {
    setCompanySearch('')
    setLoacationSearch('')
    setTrigger((state) => !state)
  }

  const [pageNumber, setPageNumber] = useState(1)

  const {
    setTrigger,
    query: {
      data,
      isLoading,
      isFetching,
      error,
      isError,
      refetch: fetchCompaniesWithKeywords,
    },
  } = useListCompanies({
    companySearch,
    locationSearch,
    pageNumber,
    setShowResetButton,
  })

  const {
    data: dataAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useListAllCompanies()

  useEffect(() => {
    fetchCompaniesWithKeywords()
    window.scrollTo(0, 0)
  }, [pageNumber])

  return isLoading || isLoadingAll ? (
    <Loader />
  ) : isError || isErrorAll ? (
    <Message variant='danger'>{errorHandler(error || errorAll)}</Message>
  ) : (
    <>
      <Helmet>
        <title>Job finder - All companies</title>
      </Helmet>
      <h2>
        <b>Most job offers</b>
      </h2>
      <CardCarousel sortBy='offersCount' companies={dataAll.companies} />
      <hr />
      <h2>
        <b>Most loved</b>
      </h2>
      <CardCarousel sortBy='rating' companies={dataAll.companies} />
      <h1 className='text-center mt-3'>
        <b>Search for Companies</b>
      </h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          setShowResetButton(true)
          fetchCompaniesWithKeywords()
        }}
        className='m-3 d-flex flex-md-row flex-column'
      >
        <Form.Control
          className='mx-md-3 my-1 my-md-0'
          type='text'
          placeholder='enter company name'
          value={companySearch}
          onChange={(e) => setCompanySearch(e.target.value)}
        ></Form.Control>

        <Form.Control
          className='mx-md-3 my-1 my-md-0'
          type='text'
          placeholder='enter city'
          value={locationSearch}
          onChange={(e) => setLoacationSearch(e.target.value)}
        ></Form.Control>

        <Button type='submit' className='mx-md-3 my-1 my-md-0'>
          Find company
        </Button>
      </Form>
      {showResetButton && (
        <Button onClick={resetFiltersHandler} className='my-2'>
          Reset filters
        </Button>
      )}
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          {data!.companies
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((company) => (
              <CompanyCardExtended key={company._id} company={company} />
            ))}
          <Pagination
            totalPagesCount={data!.pages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </>
      )}
    </>
  )
}

export default CompaniesScreen
