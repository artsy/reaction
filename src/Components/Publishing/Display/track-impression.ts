const alreadyFired = {}

/**
 * An impression tracking utility for display ads that tries to not double 
 * track the same impression by checking a cache of previous impressions.
 * 
 * @example
 *
 *      import { track } from "src/utils/track"
 *
 *      @track()
 *      class DisplayAd extends React.Component<{}, null> {
 * 
 *        @trackImpression(() => "panel")
 *        componentDidMount() {
 *          // ...
 *        }
 *      }
 */
export function trackImpression(unitLayout) {
  return (target, name, descriptor) => {
    const decoratedFn = descriptor.value
    // tslint:disable-next-line:only-arrow-functions
    descriptor.value = function() {
      const key = [
        this.props.campaign.name,
        unitLayout(this.props),
        (this.props.article && this.props.article.id) || this._reactInternalInstance._debugID,
      ].join(":")
      if (alreadyFired[key]) return decoratedFn.apply(this, arguments)
      this.props.tracking &&
        this.props.tracking.trackEvent({
          action: "Impression",
          entity_type: "display_ad",
          campaign_name: this.props.campaign.name,
          unit_layout: unitLayout(this.props),
        })
      alreadyFired[key] = true
      decoratedFn.apply(this, arguments)
    }
  }
}
