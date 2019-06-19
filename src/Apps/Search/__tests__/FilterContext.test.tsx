import { mount } from "enzyme"
import React, { FC } from "react"
import { get } from "Utils/get"
import {
  FilterContextConsumer,
  FilterContextProvider,
  useFilterContext,
} from "../FilterContext"

describe("FilterContext", () => {
  describe.each`
    field                 | defaultValue        | nonDefaultValue      | hasFiltersWhenNonDefaultValue
    ${"keyword"}          | ${undefined}        | ${"monkey"}          | ${false}
    ${"page"}             | ${1}                | ${4}                 | ${true}
    ${"medium"}           | ${undefined}        | ${"Photography"}     | ${true}
    ${"for_sale"}         | ${undefined}        | ${true}              | ${true}
    ${"offerable"}        | ${undefined}        | ${true}              | ${true}
    ${"acquireable"}      | ${undefined}        | ${true}              | ${true}
    ${"at_auction"}       | ${undefined}        | ${true}              | ${true}
    ${"inquireable_only"} | ${undefined}        | ${true}              | ${true}
    ${"major_periods"}    | ${[]}               | ${["1990"]}          | ${true}
    ${"partner_id"}       | ${undefined}        | ${"1234"}            | ${true}
    ${"sort"}             | ${"-decayed_merch"} | ${"some,other,sort"} | ${true}
    ${"price_range"}      | ${"*-*"}            | ${"100-4000"}        | ${true}
    ${"height"}           | ${"*-*"}            | ${"33-66"}           | ${true}
    ${"width"}            | ${"*-*"}            | ${"33-66"}           | ${true}
    ${"color"}            | ${undefined}        | ${"lightgreen"}      | ${true}
  `(
    "Field $field",
    ({
      field,
      defaultValue,
      nonDefaultValue,
      hasFiltersWhenNonDefaultValue,
    }) => {
      it(`Defaults to ${defaultValue} if none passed`, () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <h2>
              current {field}:{" "}
              {get(context, c => c.filters[field].toString(), "none")}
            </h2>
          )
        }

        const wrapper = mount(
          <FilterContextProvider>
            <Subscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain(
          `current ${field}: ${get(defaultValue, d => d.toString(), "none")}`
        )
      })

      it(`Defaults to ${nonDefaultValue} if it is passed in`, () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <h2>
              current {field}: {context.filters[field].toString() || "none"}
            </h2>
          )
        }

        const initialValues = {
          [field]: nonDefaultValue,
        }

        const wrapper = mount(
          <FilterContextProvider {...initialValues}>
            <Subscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain(`current ${field}: ${nonDefaultValue}`)
      })

      it("sets value from children", () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <div>
              <h2>
                current {field}:{" "}
                {get(context, c => c.filters[field].toString(), "none")}
              </h2>
              <button
                onClick={() => context.setFilter(field, nonDefaultValue)}
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

        expect(wrapper.html()).toContain(`current ${field}: ${nonDefaultValue}`)
      })

      it("unsets value from children", () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <div>
              <h2>
                current {field}: {context.filters[field] || "none"}
              </h2>
              <button onClick={() => context.unsetFilter(field)} />
            </div>
          )
        }

        const initialValues = {
          [field]: nonDefaultValue,
        }

        const wrapper = mount(
          <FilterContextProvider {...initialValues}>
            <Subscriber />
          </FilterContextProvider>
        )

        const increment = wrapper.find("button")
        increment.simulate("click")

        expect(wrapper.html()).toContain(
          `current ${field}: ${defaultValue || "none"}`
        )
      })

      it(`hasFilters is false when value is ${defaultValue}`, () => {
        const wrapper = mount(
          <FilterContextProvider>
            <HasFiltersSubscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain("hasFilters: false")
      })

      it(`hasFilters is ${hasFiltersWhenNonDefaultValue} when value is ${nonDefaultValue}`, () => {
        const initialValues = {
          [field]: nonDefaultValue,
        }

        const wrapper = mount(
          <FilterContextProvider {...initialValues}>
            <HasFiltersSubscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain(
          `hasFilters: ${hasFiltersWhenNonDefaultValue.toString()}`
        )
      })

      it(`isDefaultValue is true when value is ${defaultValue}`, () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <h2>isDefaultValue: {context.isDefaultValue(name).toString()}</h2>
          )
        }

        const wrapper = mount(
          <FilterContextProvider>
            <Subscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain("isDefaultValue: true")
      })

      it(`isDefaultValue is false when value is ${nonDefaultValue}`, () => {
        const Subscriber: FC = () => {
          const context = useFilterContext()
          return (
            <h2>isDefaultValue: {context.isDefaultValue(field).toString()}</h2>
          )
        }

        const initialValues = {
          [field]: nonDefaultValue,
        }

        const wrapper = mount(
          <FilterContextProvider {...initialValues}>
            <Subscriber />
          </FilterContextProvider>
        )

        expect(wrapper.html()).toContain("isDefaultValue: false")
      })
    }
  )

  // describe("paging", () => {
  //   it("Renders current page", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return <h2>current page: {context.filters.page}</h2>
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("current page: 1")
  //   })

  //   it("updates page from children", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>current page: {context.filters.page}</h2>
  //           <button
  //             onClick={() =>
  //               context.setFilter("page", context.filters.page + 1)
  //             }
  //           />
  //         </div>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain("current page: 2")
  //   })

  //   it("defaults to page passed in", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return <h2>current page: {context.filters.page}</h2>
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider page={5}>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("current page: 5")
  //   })

  //   it("hasFilters is false when page is 1", () => {
  //     const wrapper = mount(
  //       <FilterContextProvider page={1}>
  //         <HasFiltersSubscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("hasFilters: false")
  //   })

  //   it("hasFilters is true when page is 4", () => {
  //     const wrapper = mount(
  //       <FilterContextProvider page={4}>
  //         <HasFiltersSubscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("hasFilters: true")
  //   })

  //   it("unsets page from children", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>current page: {context.filters.page}</h2>
  //           <button onClick={() => context.unsetFilter("page")} />
  //         </div>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider page={4}>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain("current page: 1")
  //   })
  // })

  // describe("medium", () => {
  //   it("Defaults to no medium if none passed", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return <h2>current medium: {context.filters.medium || "none"}</h2>
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("current medium: none")
  //   })

  //   it("Defaults to medium passed in if it exists", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return <h2>current medium: {context.filters.medium || "none"}</h2>
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider medium="Photography">
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("current medium: Photography")
  //   })

  //   it("updates medium from children", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>current medium: {context.filters.medium || "none"}</h2>
  //           <button onClick={() => context.setFilter("medium", "Sculpture")} />
  //         </div>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain("current medium: Sculpture")
  //   })

  //   it("hasFilters is false when medium is empty", () => {
  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <HasFiltersSubscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("hasFilters: false")
  //   })

  //   it("hasFilters is true when medium is not empty", () => {
  //     const wrapper = mount(
  //       <FilterContextProvider medium="Performance">
  //         <HasFiltersSubscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("hasFilters: true")
  //   })

  //   it("unsets medium from children", () => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>current medium: {context.filters.medium || "none"}</h2>
  //           <button onClick={() => context.unsetFilter("medium")} />
  //         </div>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider medium="Photography">
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain("current medium: none")
  //   })
  // })

  // describe("ways to buy", () => {
  //   const waysToBuyFields = [
  //     "for_sale",
  //     "offerable",
  //     "acquireable",
  //     "at_auction",
  //     "inquireable_only",
  //   ]
  //   it.each(waysToBuyFields)("Defaults to no %s if none passed", name => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <h2>
  //           current {name}: {context.filters[name] || "none"}
  //         </h2>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain(`current ${name}: none`)
  //   })

  //   it.each(waysToBuyFields)("Defaults to %s passed in if it exists", name => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <h2>
  //           current {name}: {(context.filters[name] || "none").toString()}
  //         </h2>
  //       )
  //     }

  //     const initialValues = { [name]: true }
  //     const wrapper = mount(
  //       <FilterContextProvider {...initialValues}>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain(`current ${name}: true`)
  //   })

  //   it.each(waysToBuyFields)("sets %s from children", name => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>
  //             current {name}: {(context.filters[name] || "none").toString()}
  //           </h2>
  //           <button onClick={() => context.setFilter(name, true)} />
  //         </div>
  //       )
  //     }

  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain(`current ${name}: true`)
  //   })

  //   it.each(waysToBuyFields)("unsets %s from children", name => {
  //     const Subscriber: FC = () => {
  //       const context = useFilterContext()
  //       return (
  //         <div>
  //           <h2>
  //             current {name}: {(context.filters[name] || "none").toString()}
  //           </h2>
  //           <button onClick={() => context.unsetFilter(name)} />
  //         </div>
  //       )
  //     }

  //     const initialValues = { [name]: true }
  //     const wrapper = mount(
  //       <FilterContextProvider {...initialValues}>
  //         <Subscriber />
  //       </FilterContextProvider>
  //     )

  //     const increment = wrapper.find("button")
  //     increment.simulate("click")

  //     expect(wrapper.html()).toContain(`current ${name}: none`)
  //   })

  //   it.each(waysToBuyFields)("hasFilters is false when %s is empty", _name => {
  //     const wrapper = mount(
  //       <FilterContextProvider>
  //         <HasFiltersSubscriber />
  //       </FilterContextProvider>
  //     )

  //     expect(wrapper.html()).toContain("hasFilters: false")
  //   })

  //   it.each(waysToBuyFields)(
  //     "hasFilters is true when %s is not empty",
  //     name => {
  //       const initialValues = { [name]: true }
  //       const wrapper = mount(
  //         <FilterContextProvider {...initialValues}>
  //           <HasFiltersSubscriber />
  //         </FilterContextProvider>
  //       )

  //       expect(wrapper.html()).toContain("hasFilters: true")
  //     }
  //   )
  // })

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
