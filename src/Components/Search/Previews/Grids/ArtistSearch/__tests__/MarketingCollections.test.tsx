import { mount } from "enzyme"
import React from "react"

import { CollectionTitle, CollectionTitles } from "../MarketingCollections"

describe("CollectionTitles", () => {
  it("renders one title when given no colons", () => {
    const wrapper = mount(<CollectionTitles title="The best one" />)
    expect(wrapper.find(CollectionTitle).length).toEqual(1)
  })

  it("renders two titles when given one colon", () => {
    const wrapper = mount(<CollectionTitles title="KAWS: Purple ones" />)
    expect(wrapper.find(CollectionTitle).length).toEqual(2)
  })

  it("renders two titles when given many colons", () => {
    const wrapper = mount(
      <CollectionTitles title="KAWS: Purple ones: the most expensive ones" />
    )
    expect(wrapper.find(CollectionTitle).length).toEqual(2)
    const secondOne = wrapper.find(CollectionTitle).at(1)
    expect(secondOne.text()).toEqual("Purple ones: the most expensive ones")
  })
})
