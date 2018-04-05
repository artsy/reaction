import React, { SFC } from "react"
import Nav from "../../Nav"
import Title from "../../Title"
import styled from "styled-components"
import { Provider } from "unstated"
import { Redirect, Route, StaticRouter } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { ShippingForm } from "./ShippingForm"
import { PaymentForm } from "./PaymentForm"
import { ReviewForm } from "./ReviewForm"
import { StepMarker } from "./StepMarker"

export const formSteps = [
  {
    path: "/shipping",
    component: ShippingForm,
    label: "Shipping",
  },
  {
    path: "/payment",
    component: PaymentForm,
    label: "Payment",
  },
  {
    path: "/review",
    component: ReviewForm,
    label: "Review",
  },
]

export const OrderForm: SFC = props => {
  const { Router, basename } = getConfig()

  return (
    <Provider>
      <Router basename={basename}>
        <Container>
          <Nav height={70} logoIcon="logotype">
            <Title titleSize="xsmall">Secure Checkout</Title>
            <StepMarker />
          </Nav>

          <Redirect from="/" to="/shipping" />

          <Content>
            {formSteps.map(({ path, component }, key) => {
              return <Route path={path} component={component} key={key} />
            })}
          </Content>
        </Container>
      </Router>
    </Provider>
  )
}

const getConfig = () => {
  const isClient = typeof window !== "undefined"
  const Router = isClient ? BrowserRouter : StaticRouter // TODO: Replace with MemoryRouter
  const basename = isClient && "/order2" // For mounting on SSR route

  return {
    Router,
    basename,
  }
}

const Container = styled.div`
  border: 1px solid green;
`

const Content = styled.div``
