import React from 'react'

type Props = {
    params: {
        organizationId: string;
    }
}

function OrganizationHomepage({params}: Props) {
  return (
    <div>

        <div className="container p-8">
            {JSON.stringify(params,null,2)}
            <br />
        4e864f7c-1dad-4ed0-83a8-e9e9df8ec6df
        </div>
    </div>
  )
}

export default OrganizationHomepage