/**
 * TODO:
 * - See if we can get rid of all the namespacing and transform before sending.
 *   E.g. inside the `ContextPage` interface have just a `page` field that
 *   transforms to `context_page`.
 * - If the above gets done, we could also dry up the ‘owner’ in both
 *   `ContextPage` and `Result`.
 */

// TODO: Do we need to export these?
// export * from "./ContextPage"
// export * from "./ContextModule"
// export * from "./Interaction"
// export * from "./Result"

export * from "./Values"

import { ContextModule } from "./ContextModule"
import { ContextPage } from "./ContextPage"
import { Flow } from "./Flow"
import { AuthenticationInteraction, Interaction } from "./Interaction"
import { Label } from "./Label"
import { Failure, Success } from "./Result"
import { Type } from "./Type"

export type Trackables =
  | AuthenticationInteraction
  | ContextModule
  | ContextPage
  | Flow
  | Interaction
  | Label
  | Success
  | Failure
  | Type

/**
 * A sentinel type used to signal that anything goes in order to be able to
 * support old Force schema.
 *
 * @example
 *
 *     ```ts
 *     import * as Schema from "Artsy/Analytics/Schema"
 *
 *     @track({ … } as Schema.Old)
 */
export type Old = any
