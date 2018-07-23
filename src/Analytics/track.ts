// tslint:disable:array-type

import _track, { Decorator, Options } from "react-tracking"
import { Trackables } from "./Schema"

/**
 * Use this interface to augment the `track` function with props or state.  The
 * data recorded with this interface should match any of the entries in the
 * `Trackables` union.
 *
 * It can be used for either one-off uses:
 *
 * @example
 *
 *      ```ts
 *      import { track } from "Analytics"
 *
 *      interface Props {
 *        artist: {
 *          id: string
 *          slug: string
 *        }
 *      }
 *
 *      interface State {
 *        following: boolean
 *      }
 *
 *      @track<Props>(props => ({
 *        context_page: Schema.
 *        context_page_owner_id: props.artist._id,
 *        context_page_owner_type: Schema.OwnerType.Artist,
 *        context_page_owner_slug: props.artist.id,
 *      }))
 *      class Artist extends React.Component<Props, State> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track<Props, State>((props, state) => ({
 *          action_type: Schema.ActionType.Click,
 *          action_name: state.following ? Schema.ActionName.ArtistUnfollow : Schema.ActionName.ArtistFollow,
 *          subject: state.following ? "Unfollow Artist" : "Follow Artist"
 *        }))
 *        handleFollow(event) {
 *          // ...
 *        }
 *      }
 *
 *      ```
 *
 * … or stored for usage throughout a module:
 *
 * @example
 *
 *      ```ts
 *      import { track as _track, Track } from "Analytics"
 *
 *      interface Props {
 *        artist: {
 *          id: string
 *          slug: string
 *        }
 *      }
 *
 *      interface State {
 *        following: boolean
 *      }
 *
 *      const track: Track<Props, State> = _track
 *
 *      @track(props => ({
 *        context_page: Schema.
 *        context_page_owner_id: props.artist._id,
 *        context_page_owner_type: Schema.OwnerType.Artist,
 *        context_page_owner_slug: props.artist.id,
 *      }))
 *      class Artist extends React.Component<Props, State> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track((props, state) => ({
 *          action_type: Schema.ActionType.Click,
 *          action_name: state.following ? Schema.ActionName.ArtistUnfollow : Schema.ActionName.ArtistFollow,
 *          subject: state.following ? "Unfollow Artist" : "Follow Artist"
 *        }))
 *        handleFollow(event) {
 *          // ...
 *        }
 *      }
 *
 *      ```
 */
export interface Track<PP = {}, SS = null, AA extends Array<any> = Array<any>> {
  <P = PP, S = SS, A extends any[] = AA>(
    trackingInfo?: Trackables | ((props: P, state: S, args: A) => Trackables),
    options?: Options<Trackables>
  ): Decorator
}

export const track: Track = _track
