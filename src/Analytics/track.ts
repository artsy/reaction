import { track as _track, Track as _Track } from "react-tracking"
import { Trackables } from "./Schema"

// TODO: Add dispatching to Artsy component?
//
// export function trackPage<P>(
//   trackingInfo: TrackingInfo<Schema.PageView, P, null>
// ) {
//   return _track(trackingInfo as any, {
//     dispatch: postEvent,
//     dispatchOnMount: true,
//   })
// }

// TODO Test type instead of interface
export interface Track<P = any, S = null, T = Trackables>
  extends _Track<T, P, S> {} // tslint:disable-line:no-empty-interface

export const track: Track = _track
