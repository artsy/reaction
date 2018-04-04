import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"

export const ShippingForm = withRouter(props => {
  return <Link to="/payment">shipping form</Link>
})
