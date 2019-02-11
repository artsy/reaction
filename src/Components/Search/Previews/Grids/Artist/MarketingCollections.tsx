import React from "react"

export const MarketingCollectionsGrid: React.SFC<any> = ({
  marketingCollections,
}) => {
  return (
    <>
      <h1>Collections</h1>
      {marketingCollections.map(({ title }, index) => {
        return <div key={index}>{title}</div>
      })}
    </>
  )
}
