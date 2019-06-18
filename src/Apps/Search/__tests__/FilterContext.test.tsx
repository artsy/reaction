import { mount, ReactWrapper } from "enzyme"
import React, { FC } from "react"
import {
  FilterContextConsumer,
  FilterContextProvider,
  FilterContextValues,
  useFilterContext,
} from "../FilterContext"

describe("FilterContext", () => {
  describe("paging", () => {
    it("Renders current page", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return <h2>current page: {context.filters.page}</h2>
      }

      const wrapper = mount(
        <FilterContextProvider>
          <Subscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("current page: 1")
    })

    it("updates page from children", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return (
          <div>
            <h2>current page: {context.filters.page}</h2>
            <button
              onClick={() =>
                context.setFilter("page", context.filters.page + 1)
              }
            />
          </div>
        )
      }

      const wrapper = mount(
        <FilterContextProvider>
          <Subscriber />
        </FilterContextProvider>
      )

      const increment = wrapper.find("button")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current page: 2")
    })

    it("defaults to page passed in", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return <h2>current page: {context.filters.page}</h2>
      }

      const wrapper = mount(
        <FilterContextProvider page={5}>
          <Subscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("current page: 5")
    })

    it("hasFilters is false when page is 1", () => {
      const wrapper = mount(
        <FilterContextProvider page={1}>
          <HasFiltersSubscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: false")
    })

    it("hasFilters is true when page is 4", () => {
      const wrapper = mount(
        <FilterContextProvider page={4}>
          <HasFiltersSubscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: true")
    })

    it("unsets page from children", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return (
          <div>
            <h2>current page: {context.filters.page}</h2>
            <button onClick={() => context.unsetFilter("page")} />
          </div>
        )
      }

      const wrapper = mount(
        <FilterContextProvider page={4}>
          <Subscriber />
        </FilterContextProvider>
      )

      const increment = wrapper.find("button")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current page: 1")
    })
  })

  describe("medium", () => {
    it("Defaults to no medium if none passed", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return <h2>current medium: {context.filters.medium || "none"}</h2>
      }

      const wrapper = mount(
        <FilterContextProvider>
          <Subscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("current medium: none")
    })

    it("Defaults to medium passed in if it exists", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return <h2>current medium: {context.filters.medium || "none"}</h2>
      }

      const wrapper = mount(
        <FilterContextProvider medium="Photography">
          <Subscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("current medium: Photography")
    })

    it("updates medium from children", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return (
          <div>
            <h2>current medium: {context.filters.medium || "none"}</h2>
            <button onClick={() => context.setFilter("medium", "Sculpture")} />
          </div>
        )
      }

      const wrapper = mount(
        <FilterContextProvider>
          <Subscriber />
        </FilterContextProvider>
      )

      const increment = wrapper.find("button")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current medium: Sculpture")
    })

    it("hasFilters is false when medium is empty", () => {
      const wrapper = mount(
        <FilterContextProvider>
          <HasFiltersSubscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: false")
    })

    it("hasFilters is true when medium is not empty", () => {
      const wrapper = mount(
        <FilterContextProvider medium="Performance">
          <HasFiltersSubscriber />
        </FilterContextProvider>
      )

      expect(wrapper.html()).toContain("hasFilters: false")
    })

    it("unsets medium from children", () => {
      const Subscriber: FC = () => {
        const context = useFilterContext()
        return (
          <div>
            <h2>current medium: {context.filters.medium || "none"}</h2>
            <button onClick={() => context.unsetFilter("medium")} />
          </div>
        )
      }

      const wrapper = mount(
        <FilterContextProvider medium="Photography">
          <Subscriber />
        </FilterContextProvider>
      )

      const increment = wrapper.find("button")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current medium: none")
    })
  })

  describe("infrastructure", () => {
    class NonsubscribingClassComponent extends React.Component {
      render() {
        return <h1>class component that doesn't subscribe</h1>
      }
    }

    class SubscribingClassComponent extends React.Component {
      render() {
        return (
          <FilterContextConsumer>
            {({ filters: { page }, setFilter }) => {
              return (
                <div>
                  <h2>current page: {page}</h2>
                  <button onClick={() => setFilter("page", page + 1)} />
                </div>
              )
            }}
          </FilterContextConsumer>
        )
      }
    }

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

      expect(wrapper.html()).toContain("current page: 1")

      const increment = wrapper.find("button")
      increment.simulate("click")

      expect(wrapper.html()).toContain("current page: 2")
    })
  })

  const HasFiltersSubscriber: FC = () => {
    const context = useFilterContext()

    return <h2>hasFilters: {context.hasFilters.toString()}</h2>
  }
})
