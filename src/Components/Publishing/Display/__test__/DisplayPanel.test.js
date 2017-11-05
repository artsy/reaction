import 'jest-styled-components'
import React from 'react'
import renderer from 'react-test-renderer'
import { Campaign, UnitPanel, UnitPanelVideo } from '../../Fixtures/Components'
import { DisplayPanel } from '../DisplayPanel'
import { cloneDeep } from 'lodash'
import { mount } from 'enzyme'
import { track } from '../../../../Utils/track'

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
    const { isVideo = false, ...rest } = props
    let unit = UnitPanel

    if (isVideo) {
      unit = cloneDeep(UnitPanel)
      unit.assets[0].url = 'foo.mp4'
    }

    return mount(
      <DisplayPanel
        unit={unit}
        campaign={Campaign}
        {...rest}
      />
    )
  }

  describe('#componentDidMount', () => {
    it('tracks interaction', () => {
      getWrapper()
      expect(track).toHaveBeenCalled()
    })

    it('attaches an onEnded handler to video', () => {
      const wrapper = getWrapper({ isVideo: true })
      const instance = wrapper.instance()
      expect(instance.video.onended).not.toBeUndefined()
    })
  })

  describe('#isWithinMediaArea', () => {
    it('returns true / false if an event is within a media area', () => {
      const {
        isWithinMediaArea
      } = DisplayPanel.prototype

      const valid = [
        'DisplayPanel__Image',
        'VideoContainer',
        'VideoContainer__VideoCover',
        'VideoContainer__VideoControls',
        'VideoContainer__video',
        'PlayButton',
        'PlayButton__PlayButtonCaret'
      ]
      valid.forEach(className => {
        const event = { target: { className }}
        expect(isWithinMediaArea(event)).toEqual(true)
      })

      const invalid = [
        'nope', 'sorry'
      ]

      invalid.forEach(className => {
        const event = { target: { className }}
        expect(isWithinMediaArea(event)).toEqual(false)
      })
    })
  })

  describe('#handleClick', () => {
    it('tracks interaction', () => {
      const wrapper = getWrapper()
      wrapper.simulate('click')
      expect(track).toHaveBeenCalled()
    })

    it('prevents default event from occurring', () => {
      const wrapper = getWrapper()
      const event = { preventDefault: jest.fn() }
      wrapper.instance().handleClick(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    describe('Mobile', () => {
      describe('Video', () => {
        it('toggles video if within media area', () => {
          const wrapper = getWrapper({ isMobile: true, isVideo: true })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'PlayButton'
            }
          }
          wrapper.instance().handleClick(event)
          expect(wrapper.state().isPlaying).toEqual(true)
          wrapper.instance().handleClick(event)
          expect(wrapper.state().isPlaying).toEqual(false)
        })

        it('clicks away if outside media area', () => {
          global.open = jest.fn()
          const wrapper = getWrapper({ isMobile: true, isVideo: true })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'nope'
            }
          }
          wrapper.instance().handleClick(event)
          expect(wrapper.state().isPlaying).toEqual(false)
          expect(global.open).toHaveBeenCalled()
        })
      })

      describe('Image', () => {
        it('opens a link if user has already clicked once', () => {
          global.open = jest.fn()
          const wrapper = getWrapper({ isMobile: true })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'PlayButton'
            }
          }
          wrapper.instance().handleClick(event)
          expect(global.open).not.toHaveBeenCalled()
          wrapper.instance().handleClick(event)
          expect(global.open).toHaveBeenCalled()
        })

        it('toggles cover image on click and toggles back on click away', () => {
          global.open = jest.fn()
          const wrapper = getWrapper({ isMobile: true })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'PlayButton'
            }
          }
          wrapper.instance().handleClick(event)
          expect(wrapper.state().showCoverImage).toEqual(true)
          wrapper.instance().handleClick(event)
          expect(wrapper.state().showCoverImage).toEqual(false)
        })

        it('clicks away if outside media area', () => {
          global.open = jest.fn()
          const wrapper = getWrapper({ isMobile: true })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'nope'
            }
          }
          wrapper.instance().handleClick(event)
          expect(global.open).toHaveBeenCalled()
        })
      })
    })

    describe('Desktop', () => {
      it('pauses the video if video', () => {
        global.open = jest.fn()
        const spy = jest.spyOn(DisplayPanel.prototype, 'pauseVideo')
        const wrapper = getWrapper({ isVideo: true })
        const event = {
          preventDefault: jest.fn(),
          target: {
            className: 'PlayButton'
          }
        }
        wrapper.instance().handleClick(event)
        expect(spy).toHaveBeenCalled()
      })

      it('always clicks away', () => {
        const isVideo = [true, false]
        isVideo.forEach(type => {
          global.open = jest.fn()
          const wrapper = getWrapper({ isVideo: type })
          const event = {
            preventDefault: jest.fn(),
            target: {
              className: 'PlayButton'
            }
          }
          wrapper.instance().handleClick(event)
          expect(global.open).toHaveBeenCalled()
        })
      })
    })
  })

  describe('#handleVideoClick', () => {
    it('tracks interaction', () => {
      const wrapper = getWrapper()
      wrapper.simulate('mouseEnter')
      expect(track).toHaveBeenCalled()
    })
  })

  describe('#handleMouseEnter', () => {
    it('tracks interaction', () => {
      const wrapper = getWrapper()
      wrapper.simulate('mouseEnter')
      expect(track).toHaveBeenCalled()
    })

    it('does nothing if mobile', () => {
      const wrapper = getWrapper({ isMobile: true })
      expect(wrapper.instance().handleMouseEnter()).toEqual(false)
    })

    it('plays video if video', () => {
      const spy = jest.spyOn(DisplayPanel.prototype, 'playVideo')
      const wrapper = getWrapper({ isVideo: true })
      wrapper.instance().handleMouseEnter()
      expect(spy).toHaveBeenCalled()
    })

    it('toggles cover image if image', () => {
      const spy = jest.spyOn(DisplayPanel.prototype, 'toggleCoverImage')
      const wrapper = getWrapper()
      wrapper.instance().handleMouseEnter()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('#handleMouseLeave', () => {
    it('does nothing if mobile', () => {
      const wrapper = getWrapper({ isMobile: true })
      expect(wrapper.instance().handleMouseLeave()).toEqual(false)
    })

    it('pauses video if video', () => {
      const spy = jest.spyOn(DisplayPanel.prototype, 'pauseVideo')
      const wrapper = getWrapper({ isVideo: true })
      wrapper.instance().handleMouseLeave()
      expect(spy).toHaveBeenCalled()
    })

    it('toggles cover image if image', () => {
      const spy = jest.spyOn(DisplayPanel.prototype, 'toggleCoverImage')
      const wrapper = getWrapper()
      wrapper.instance().handleMouseLeave()
      expect(spy).toHaveBeenCalled()
    })
  })

  it('#toggleVideo', () => {
    const pauseSpy = jest.spyOn(DisplayPanel.prototype, 'pauseVideo')
    const playSpy = jest.spyOn(DisplayPanel.prototype, 'playVideo')
    const wrapper = getWrapper({ isVideo: true })
    wrapper.instance().toggleVideo()
    expect(playSpy).toHaveBeenCalled()
    wrapper.instance().toggleVideo()
    expect(pauseSpy).toHaveBeenCalled()
  })

  it('#pauseVideo', () => {
    const wrapper = getWrapper({ isVideo: true })
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance.video, 'pause')
    instance.pauseVideo()
    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().isPlaying).toEqual(false)
  })

  it('#playVideo', () => {
    const wrapper = getWrapper({ isVideo: true })
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance.video, 'play')
    instance.playVideo()
    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().isPlaying).toEqual(true)
  })

  describe('#isVideo', () => {
    it('returns true if asset contains video url', () => {
      const wrapper = getWrapper({ isVideo: true })
      expect(wrapper.instance().isVideo()).toEqual(true)
    })

    it('returns false if asset does not contain video url', () => {
      const wrapper = getWrapper({ isVideo: false })
      expect(wrapper.instance().isVideo()).toEqual(false)
    })

  })

  describe('video', () => {
    it('renders a video cover if not playing', () => {
      const wrapper = getWrapper({ isVideo: true })
      expect(wrapper.find('VideoCover').length).toEqual(1)
    })

    it('hides the video cover when playing', () => {
      const wrapper = getWrapper({ isVideo: true, isMobile: true })
      const instance = wrapper.instance()
      const event = {
        preventDefault: jest.fn(),
        target: {
          className: 'PlayButton'
        }
      }
      instance.handleClick(event)
      wrapper.update()
      expect(wrapper.find('VideoCover').length).toEqual(0)
    })

    it('on mobile, renders mini video controls', () => {
      const wrapper = getWrapper({ isVideo: true, isMobile: true })
      expect(wrapper.find('VideoControls').length).toEqual(1)
    })

    it('renders a <video />', () => {
      const wrapper = getWrapper({ isVideo: true })
      expect(wrapper.find('video').length).toEqual(1)
    })
  })

  it('renders an image', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('Image').length).toEqual(1)
  })
})

