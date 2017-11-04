import 'jest-styled-components'
import React from 'react'
import renderer from 'react-test-renderer'
import { Sections } from '../Sections'
import { StandardArticle } from '../../Fixtures/Articles'
import { clone } from 'lodash'
import { mount } from 'enzyme'


jest.mock('react-sizeme', () => jest.fn(c => d => d))
jest.mock('react-lines-ellipsis/lib/html', () => {
  const React = require('react')
  return () => <div />
})

jest.mock('react-dom/server', () => ({
  renderToStaticMarkup: (x) => x
}))

describe('snapshots', () => {
  it('renders properly', () => {
    const sections = renderer.create(<Sections article={StandardArticle} />).toJSON()
    expect(sections).toMatchSnapshot()
  })
})

describe('units', () => {
  it('doesnt throw an error on invalid markup', () => {
    global.console = { error: jest.fn() }

    expect(() => {
      const article = clone(StandardArticle)
      article.sections = [{
        type: 'text',
        body: '<p>busted'
      }]

      mount(
        <Sections isMobile
          DisplayPanel={() => <div>hi!</div>}
          article={article}
        />
      )
      expect(global.console.error).toHaveBeenCalled()
    }).not.toThrowError()
  })

  it('if mobile, sets flag to inject display', () => {
    const element = document.createElement('div')
    element.id = '__mobile_display_inject__'
    document.getElementById = () => element
    const spy = jest.spyOn(Sections.prototype, 'mountDisplayToMarker')
    const wrapper = mount(
      <Sections isMobile
        DisplayPanel={() => <div>hi!</div>}
        article={StandardArticle}
      />
    )
    expect(wrapper.state().shouldInjectMobileDisplay).toEqual(true)
    expect(spy).toHaveBeenCalled()
  })

  it('injects a display panel marker after the second paragraph', () => {
    const { injectDisplayPanelMarker } = Sections.prototype
    const body = injectDisplayPanelMarker([
      '<p>hello</p>',
      '<p>how are you</p>',
      '<p>how are you</p>'
    ].join(''))

    expect(body).toContain([
      '<p>hello</p>',
      '<p>how are you</p>',
      '<div id="__mobile_display_inject__"></div>',
      '<p>how are you</p>'
    ].join(''))
  })
})

