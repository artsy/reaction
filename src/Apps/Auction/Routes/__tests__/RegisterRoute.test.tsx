// Begun from example in Register_analytics.test.tsx
import { RegisterAppResponseFixture } from "Apps/__tests__/Fixtures/Auction/Routes/Register"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { RegisterRouteFragmentContainer } from "../Register"

jest.unmock("react-relay")

const { buildPage } = createTestEnv({
  Component: RegisterRouteFragmentContainer,
  defaultData: RegisterAppResponseFixture,
  TestPage: class RegistrationTestPage extends RootTestPage {
    get form() {
      return expectOne(this.find("form"))
    }
  },
  query: graphql`
    query RegisterRoute_Test_Query {
      sale(id: "whatever.") {
        ...Register_sale
      }
      me {
        ...Register_me
      }
    }
  `,
})

xdescribe("Auction Registration App", () => {
  // const getWrapper = (props: any) => {
  //   return [
  //     mount(
  //       <MockBoot breakpoint="lg">
  //         <SystemContextProvider>
  //           <Component {...props} />
  //         </SystemContextProvider>
  //       </MockBoot>
  //     ),
  //     dispatch,
  //   ]
  // }
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  it("tracks clicking submit button", async () => {
    // const { Component, dispatch } = mockTracking(RegisterRoute)
    // const wrapper = mount(<Component {...defaultProps} />)

    const page = await buildPage()

    // const wrapper = mount(
    //   <MockBoot breakpoint="lg">
    //     <SystemContextProvider>
    //       <Component {...{ ...defaultProps }} />
    //     </SystemContextProvider>
    //   </MockBoot>
    // )

    await page.form.simulate("submit")
    await flushPromiseQueue()

    expect(page.text()).toMatch("Name is required")
  })
})
