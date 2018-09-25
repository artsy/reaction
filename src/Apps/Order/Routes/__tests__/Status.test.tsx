import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import {
  mockResolver,
  OrderWithShippingDetails,
} from "../../../../Apps/__test__/Fixtures/Order"
import { MockRelayRenderer } from "../../../../Artsy/Relay/MockRelayRenderer"
import { StatusFragmentContainer as StatusRoute } from "../Status"

const query = graphql`
  query routes_StatusQuery {
    order(id: "123") {
      ...Status_order
    }
  }
`
describe("Status", () => {
  const getWrapper = resolvers =>
    mount(
      <MockRelayRenderer
        Component={StatusRoute}
        query={query}
        mockResolvers={resolvers}
      />
    )

  it("should render the status route", () => {
    const wrapper = getWrapper(
      mockResolver({
        ...OrderWithShippingDetails,
        state: "CANCELED",
      })
    )
    console.log(wrapper.html())
  })
})
