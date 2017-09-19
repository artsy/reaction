import { default as _track, Track } from "react-tracking"

// tslint:disable-next-line:no-namespace
export namespace TrackingInfo {
  /**
   * The global tracking-info keys in Artsy’s schema.
   */
  export interface Global {
    /**
     * The name of an event.
     */
    action: string

    /**
     * The root container component should specify this as the screen context.
     */
    page: string
  }

  export interface Shareable extends Global {
    /**
     * The public slug for this entity.
     */
    slug: string
  }
}

/**
 * A typed tracking-info and props alias of the default react-tracking `track` function.
 *
 * Use this version when you’re going to use a callback function to generate the tracking info.
 *
 * @example
 *
 *      import { trackWithProps } from "src/utils/track"
 *
 *      interface Props {
 *        artist: {
 *          slug: string
 *        }
 *      }
 *
 *      const track = trackWithProps<Props>()
 *
 *      @track()
 *      class Artist extends React.Component<Props, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track(props => ({ action: "Follow Artist", slug: props.slug }))
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 *
 */
export function trackWithProps<P, T extends TrackingInfo.Global = TrackingInfo.Global>(): Track<T, P> {
  return _track
}

/**
 * A typed tracking-info alias of the default react-tracking `track` function.
 *
 * Use this version when you don’t use a callback function to generate the tracking info based on props, but you do want
 * to extend the tracking-info schema.
 *
 * @example
 *
 *      import { trackWithoutProps as track } from "src/utils/track"
 *
 *      interface TrackingInfo {
 *        slug: string
 *      }
 *
 *      const track = trackWithoutProps<TrackingInfo>()
 *
 *      @track()
 *      class Artist extends React.Component<{}, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track({ action: "Follow Artist", slug: "banksy" })
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 */
export function trackWithoutProps<T extends TrackingInfo.Global = TrackingInfo.Global>(): Track<T, any> {
  return _track
}

/**
 * A typed tracking-info alias of the default react-tracking `track` function.
 *
 * Use this version when you don’t use a callback function to generate the tracking info based on props. You can also
 * use this if you don’t want to deal with props types, but you want to be cool too, right?
 *
 * @example
 *
 *      import { track } from "src/utils/track"
 *
 *      @track()
 *      class Artist extends React.Component<{}, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track({ action: "Follow Artist" })
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 */
export const track = trackWithoutProps()

export default track
