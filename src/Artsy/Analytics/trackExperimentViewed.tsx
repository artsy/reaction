import * as Schema from "Artsy/Analytics"
import { data as sd } from "sharify"

declare const window: any
export const trackExperimentViewed = (name: string) => {
  if (typeof window.analytics !== "undefined") {
    const variation = sd[name.toUpperCase()]
    if (!Boolean(variation))
      return console.warn(`experiment value for ${name} not found, skipping`)

    window.analytics.track(Schema.ActionType.ExperimentViewed, {
      experiment_id: name,
      experiment_name: name,
      variation_id: variation,
      variation_name: variation,
      nonInteraction: 1,
    })
  }
}
