import React from "react"
import { RouterTab, RouterTabs } from "Styleguide/Components/RouterTabs"

export const Navigation = () => {
  return (
    <RouterTabs>
      <RouterTab to="/" exact>
        Overview
      </RouterTab>
      <RouterTab to="/cv">CV</RouterTab>
      <RouterTab to="/articles">Articles</RouterTab>
      <RouterTab to="/shows">Shows</RouterTab>
      <RouterTab to="/auction-results">Auction results</RouterTab>
      <RouterTab to="/related-artists">Related artists</RouterTab>
    </RouterTabs>
  )
}
