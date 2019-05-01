import { mount, shallow } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Article } from "../Article"
import {
  FeatureArticle,
  NewsArticle,
  SeriesArticle,
  SeriesArticleSponsored,
  SponsoredArticle,
  StandardArticle,
  UnsponsoredFeatureArticle,
  VideoArticle,
  VideoArticleSponsored,
} from "../Fixtures/Articles"

import { AdScript } from "../Ads/AdScript"
import { BannerWrapper } from "../Banner/Banner"
import { PixelTracker } from "../Display/ExternalTrackers"
import { ArticleWithFullScreen } from "../Layouts/ArticleWithFullScreen"
import { NewsLayout } from "../Layouts/NewsLayout"
import { SeriesLayout } from "../Layouts/SeriesLayout"
import { VideoLayout } from "../Layouts/VideoLayout"

jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

jest.mock("../ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

it("renders standard articles in fullscreen layout", () => {
  const article = mount(<Article article={StandardArticle} />)
  expect(article.find(ArticleWithFullScreen).length).toBe(1)
})

it("renders feature articles in fullscreen layout", () => {
  const article = mount(<Article article={FeatureArticle} />)
  expect(article.find(ArticleWithFullScreen).length).toBe(1)
})

it("renders custom articles in fullscreen layout", () => {
  const article = mount(
    <Article article={FeatureArticle} customEditorial="MY_CUSTOM_ARTICLE" />
  )
  expect(article.find(ArticleWithFullScreen).length).toBe(1)
})

it("renders series articles in series layout", () => {
  const article = mount(<Article article={SeriesArticle} />)
  expect(article.find(SeriesLayout).length).toBe(1)
})

it("renders video articles in video layout", () => {
  const article = mount(<Article article={VideoArticle} />)
  expect(article.find(VideoLayout).length).toBe(1)
})

it("renders news articles in news layout", () => {
  const article = mount(<Article article={NewsArticle} />)
  expect(article.find(NewsLayout).length).toBe(1)
})

it("does not renders mobile BannerWrapper for standard article layouts for desktop", () => {
  const article = shallow(
    <Article article={StandardArticle} isMobile={false} isLoggedIn={false} />
  )
  expect(article.find(BannerWrapper).length).toBe(0)
})

it("does not renders mobile BannerWrapper for standard article layouts for logged in users", () => {
  const article = shallow(
    <Article article={StandardArticle} isMobile isLoggedIn />
  )
  expect(article.find(BannerWrapper).length).toBe(0)
})

it("does not renders mobile BannerWrapper for series article layouts for logged in users", () => {
  const article = shallow(
    <Article article={SeriesArticle} isMobile isLoggedIn={false} />
  )
  expect(article.find(BannerWrapper).length).toBe(0)
})

it("does not render separate BannerWrapper for articles after the initial article in infinite scroll", () => {
  const article = shallow(
    <Article
      article={StandardArticle}
      isMobile
      isLoggedIn={false}
      isTruncated
    />
  )
  expect(article.find(BannerWrapper).length).toBe(0)
})

it("renders PixelTracker when there is a sponsor pixel tracking code", () => {
  const article = mount(<Article article={SponsoredArticle} />)

  expect(article.find(PixelTracker).length).toBe(1)
})

it("does not render PixelTracker when there is no sponsor pixel tracking code", () => {
  const article = mount(<Article article={SeriesArticle} />)

  expect(article.find(PixelTracker).length).toBe(0)
})

it("renders the correct script in the AdScript component of a Standard Article", () => {
  const adScript = shallow(<AdScript article={StandardArticle} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'article'); 
      htlbid.setTargeting('post_id', '594a7e2254c37f00177c0ea9'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of a News Article", () => {
  const adScript = shallow(<AdScript article={NewsArticle} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'newslanding'); 
      htlbid.setTargeting('post_id', '594a7e2254c37f00177c0ea9'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of an unsponsored Feature Article", () => {
  const adScript = shallow(<AdScript article={UnsponsoredFeatureArticle} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'feature'); 
      htlbid.setTargeting('post_id', '594a7e2254c37f00177c0ea9'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of a sponsored Feature Article", () => {
  const adScript = shallow(<AdScript article={FeatureArticle} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'sponsorfeature'); 
      htlbid.setTargeting('post_id', '594a7e2254c37f00177c0ea9'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of a sponsored Series Article", () => {
  const adScript = shallow(<AdScript article={SeriesArticleSponsored} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'sponsorlanding'); 
      htlbid.setTargeting('post_id', '594a7e2254c37f00177c0ea9'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of a sponsored Video Article", () => {
  const adScript = shallow(<AdScript article={VideoArticleSponsored} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'sponsorlanding'); 
      htlbid.setTargeting('post_id', '597b9f652d35b80017a2a6a7'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})

it("renders the correct script in the AdScript component of an unsponsored Video Article", () => {
  const adScript = shallow(<AdScript article={VideoArticle} />)
  const output = `
    "<div id="htlbid-ad-script">
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
      htlbid.setTargeting('is_testing', 'yes'); 
      htlbid.setTargeting('page_type', 'article'); 
      htlbid.setTargeting('post_id', '597b9f652d35b80017a2a6a7'); 
      });
      </script>
    </div>"
  `
    .replace(/\s/g, "")
    .slice(1, -1)
  expect(adScript.html().replace(/\s/g, "")).toEqual(output)
})
