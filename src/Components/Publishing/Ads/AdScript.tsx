import React, { Component } from "react"
import { data as sd } from "sharify"
import { ArticleAdType, ArticleData } from "../Typings"

interface Props {
  article: ArticleData
}

export class AdScript extends Component<Props> {
  getArticleType(article: ArticleData) {
    switch (true) {
      case article.layout === "news":
        return ArticleAdType.NewsLanding

      case article.layout === "feature" && !this.isSponsored(article):
        return ArticleAdType.Feature

      case article.layout === "feature" && this.isSponsored(article):
        return ArticleAdType.SponsorFeature

      case (article.layout === "series" || article.layout === "video") &&
        this.isSponsored(article):
        return ArticleAdType.SponsorLanding

      default:
        return ArticleAdType.Article
    }
  }
  isSponsored(article: ArticleData) {
    const { tracking_tags, sponsor } = article

    if ((tracking_tags || []).includes("sponsored")) {
      return true
    }

    const sponsorPropsPresent = [
      "partner_condensed_logo",
      "partner_dark_logo",
      "partner_light_logo",
      "partner_logo_link",
      "pixel_tracking_code",
    ].some(prop => sponsor[prop] != null)

    return sponsorPropsPresent ? true : false
  }
  render() {
    const { article } = this.props
    const env =
      sd.NODE_ENV || (process.env && process.env.NODE_ENV) === "production"
        ? "no"
        : "yes"
    const pageType = this.getArticleType(article)

    const script = `
      <script>
      htlbid.cmd = htlbid.cmd || [];
      htlbid.cmd.push(function() {
        htlbid.setTargeting('is_testing', '${env}'); // output 'yes' on stage, 'no' on prod
        htlbid.setTargeting('page_type', '${pageType}'); // output 'feature', 'article', 'newslanding', 'sponsorlanding', 'sponsorfeature'
        htlbid.setTargeting('post_id', '${
          article.id
        }'); // output the ID of the post, article pages only
      });
      </script>
    `

    // @FIXME: React Head was not injecting this script into the DOM correctly so this is a hack for now.
    return (
      <div id="htlbid-ad-script" dangerouslySetInnerHTML={{ __html: script }} />
    )
  }
}
