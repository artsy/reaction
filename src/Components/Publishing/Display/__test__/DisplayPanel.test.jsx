import { mount } from 'enzyme'
import 'jest-styled-components'
import { clone } from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'
import { track } from '../../../../Utils/track'
import { Campaign, UnitPanel, UnitPanelVideo } from '../../Fixtures/Components'
import { DisplayPanel } from '../DisplayPanel'

jest.mock('../../../../Utils/track.ts', () => ({
  track: jest.fn()
}))

describe('snapshots', () => {
  it('renders the display panel with an image', () => {
    const displayPanel = renderer.create(
      <DisplayPanel unit={UnitPanel} campaign={Campaign} />
    ).toJSON()

    expect(displayPanel).toMatchSnapshot()
  })

  it('renders the display panel with video', () => {
    const displayPanel = renderer.create(
      <DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />
    ).toJSON()

    expect(displayPanel).toMatchSnapshot()
  })
})

describe('units', () => {
  const getWrapper = (props = {}) => {
    return mount(
      <DisplayPanel
        unit={UnitPanel}
        campaign={Campaign}
        {...props}
      />
    )
  }

  describe('tracking', () => {
    it('calls on mount', () => {
      getWrapper()
      expect(track).toHaveBeenCalled()
    })

    it('calls on click', () => {
      const wrapper = getWrapper()
      wrapper.simulate('click')
      expect(track).toHaveBeenCalled()
    })

    it('calls on mouse enter', () => {
      const wrapper = getWrapper()
      wrapper.simulate('mouseEnter')
      expect(track).toHaveBeenCalled()
    })

    it('calls on video click', () => {
      const wrapper = getWrapper()
      wrapper.simulate('mouseEnter')
      const instance = wrapper.instance()
      instance.isVideoClickArea = () => true
      wrapper.find('DisplayPanelContainer').simulate('click')
      expect(track).toHaveBeenCalled()
    })
  })

  it('opens link on click', () => {
    const wrapper = getWrapper()
    const spy = jest.spyOn(wrapper.instance(), 'openLink')
    wrapper.update()
    wrapper.simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  describe('video', () => {
    it('renders a video cover if not playing', () => {
      const unit = clone(UnitPanel)
      unit.assets[0].url = 'foo.mp4'
      const wrapper = getWrapper({ unit })
      expect(wrapper.find('VideoCover').length).toEqual(1)
    })

    it('hides the video cover when playing', () => {
      const unit = clone(UnitPanel)
      unit.assets[0].url = 'foo.mp4'
      const wrapper = getWrapper({ unit, isMobile: true })
      const instance = wrapper.instance()
      instance.isVideoClickArea = () => true
      wrapper.find('DisplayPanelContainer').simulate('click')
      expect(wrapper.find('VideoCover').length).toEqual(0)
    })

    it('on mobile, renders mini video controls', () => {
      const wrapper = getWrapper({ isMobile: true })
      expect(wrapper.find('VideoControls').length).toEqual(1)
    })

    it('renders a <video />', () => {
      const wrapper = getWrapper()
      expect(wrapper.find('video').length).toEqual(1)
    })

    it('on mobile, plays video on click', () => {
      const wrapper = getWrapper({ isMobile: true })
      const instance = wrapper.instance()
      instance.isVideoClickArea = () => true
      const spy = jest.spyOn(instance, 'onClickVideo')
      const toggleSpy = jest.spyOn(instance, 'toggleVideo')
      wrapper.update()
      wrapper.find('DisplayPanelContainer').simulate('click')
      expect(spy).toHaveBeenCalled()
      expect(toggleSpy).toHaveBeenCalled()
      expect(wrapper.state().isPlaying).toEqual(true)
      wrapper.find('DisplayPanelContainer').simulate('click')
      expect(wrapper.state().isPlaying).toEqual(false)
    })

    it('plays / pauses video on onMouseEnter / onMouseLeave', () => {
      const unit = clone(UnitPanel)
      unit.assets[0].url = 'foo.mp4'
      const wrapper = getWrapper({ unit, isMobile: false })
      const instance = wrapper.instance()
      instance.isVideoClickArea = () => true
      instance.video = { play: jest.fn(), pause: jest.fn() }
      wrapper.find('DisplayPanelContainer').simulate('mouseEnter')
      expect(wrapper.state().isPlaying).toEqual(true)
      wrapper.find('DisplayPanelContainer').simulate('mouseLeave')
      expect(wrapper.state().isPlaying).toEqual(false)
    })
  })
})

