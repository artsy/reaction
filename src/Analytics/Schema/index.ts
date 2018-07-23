/**
 * TODO:
 * - See if we can get rid of all the namespacing and transform before sending.
 *   E.g. inside the `ContextPage` interface have just a `page` field that
 *   transforms to `context_page`.
 * - If the above gets done, we could also dry up the ‘owner’ in both
 *   `ContextPage` and `Result`.
 */

export * from "./ContextPage"
export * from "./ContextModule"
export * from "./Interaction"
export * from "./Result"
export * from "./Values"

import { ContextModule } from "./ContextModule"
import { ContextPage } from "./ContextPage"
import { Interaction } from "./Interaction"
import { Failure, Success } from "./Result"

export type Trackables =
  | ContextModule
  | ContextPage
  | Interaction
  | Success
  | Failure
