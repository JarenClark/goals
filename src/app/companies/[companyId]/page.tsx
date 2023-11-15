import React from 'react'

export default async function CompanyPage({
    params,
  }: {
    params: { companyId: string };
  }) {
  return (
    <div className='container py-20'>company page: {params.companyId}</div>
  )
}
