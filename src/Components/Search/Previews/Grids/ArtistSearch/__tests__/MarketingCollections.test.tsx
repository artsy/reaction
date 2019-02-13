import { Serif } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"

import { CollectionTitles } from "../MarketingCollections"

describe(CollectionTitles, () => {
  it("with no colons", () => {
    const wrapper = mount(<CollectionTitles title="The best one" />)
    expect(wrapper.find(Serif).length).toEqual(1)
  })

  it("with one colon", () => {
    const wrapper = mount(<CollectionTitles title="KAWS: Purple ones" />)
    expect(wrapper.find(Serif).length).toEqual(2)
  })

  it("with two colons", () => {
    const wrapper = mount(<CollectionTitles title="KAWS: Purple ones: the most expensive ones" />)
    expect(wrapper.find(Serif).length).toEqual(2)
    const secondOne = wrapper.find(Serif).at(1)
    expect(secondOne.text()).toEqual("Purple ones: the most expensive ones")
  })
})
