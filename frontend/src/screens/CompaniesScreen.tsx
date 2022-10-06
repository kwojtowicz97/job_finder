import React from 'react'
import useListAllCompanies from '../hooks/useListAllCompanies'

const CompaniesScreen = () => {
  const { data } = useListAllCompanies()
  return <div>CompaniesScreen</div>
}

export default CompaniesScreen
