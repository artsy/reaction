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
import { AuthenticationInteraction, Interaction } from "./Interaction"
import { Failure, Success } from "./Result"

export type Trackables =
  | AuthenticationInteraction
  | ContextModule
  | ContextPage
  | Interaction
  | Success
  | Failure

/**
 * A sentinel type used to signal that anything goes in order to be able to
 * support old Force schema.
 *
 * @example
 *
 *     ```ts
 *     import { Schema } from "Artsy"
 *
 *     @track({ … } as Schema.Old)
 */
export type Old = any
