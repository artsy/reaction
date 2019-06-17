import { mount } from "enzyme"
import React, { FC } from "react"
import {
  FilterContextConsumer,
  FilterContextProvider,
  useFilterContext,
} from "../FilterContext"

describe("FilterContext", () => {
  describe("paging", () => {
    it("Renders current page", () => {
      const wrapper = mount(
        <FilterContextProvider>
          <SubscribingFunctionComponent />
        </FilterContextProvider>
      )
      expect(wrapper.html()).toContain("current page: 1")
    })

    it("updates page", () => {
      const wrapper = mount(
        <FilterContextProvider>
          <SubscribingFunctionComponent />
        </FilterContextProvider>
      )

      const increment = wrapper.find("#increment")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current page: 2")
    })

    it("defaults to page passed in", () => {
      const wrapper = mount(
        <FilterContextProvider page={5}>
          <SubscribingFunctionComponent />
        </FilterContextProvider>
      )
      expect(wrapper.html()).toContain("current page: 5")
    })

    it("hasFilters is false when page is 1", () => {
      const wrapper = mount(
        <FilterContextProvider page={1}>
          <SubscribingFunctionComponent />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: false")
    })

    it("hasFilters is true when page is 4", () => {
      const wrapper = mount(
        <FilterContextProvider page={4}>
          <SubscribingFunctionComponent />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: true")
    })
  })

  describe("infrastructure", () => {
    it("Renders a class component that doesn't subscribe", () => {
      const wrapper = mount(
        <FilterContextProvider>
          <NonsubscribingClassComponent />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("class component that doesn't subscribe")
    })

    it("Renders a class component that subscribes", () => {
      const wrapper = mount(
        <FilterContextProvider>
          <SubscribingClassComponent />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("class component subscriber")

      const increment = wrapper.find("#increment")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current page: 2")
    })
  })
})

const SubscribingFunctionComponent: FC = () => {
  const context = useFilterContext()

  return (
    <div>
      <h1>function component using the custom hook</h1>
      <h2>current page: {context.filters.page}</h2>
      <h3>hasFilters: {context.hasFilters.toString()}</h3>
      <button
        id="increment"
        onClick={() => context.setPage(context.filters.page + 1)}
      />
      <button
        id="decrement"
        onClick={() => context.setPage(context.filters.page - 1)}
      />
    </div>
  )
}

class NonsubscribingClassComponent extends React.Component {
  render() {
    return <h1>class component that doesn't subscribe</h1>
  }
}

class SubscribingClassComponent extends React.Component {
  render() {
    return (
      <FilterContextConsumer>
        {({ filters: { page }, setPage }) => {
          return (
            <div>
              <h1>class component subscriber</h1>
              <h2>current page: {page}</h2>
              <button id="increment" onClick={() => setPage(page + 1)} />
              <button id="decrement" onClick={() => setPage(page - 1)} />
            </div>
          )
        }}
      </FilterContextConsumer>
    )
  }
}
