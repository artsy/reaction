declare module "sharify" {
  function sharify(): void
  export = sharify

  namespace sharify {
    /**
     * Do **not** use this on the server-side to store/access data that’s related
     * to a single request. Instead use `Response.locals.sharify.data`, which is
     * data associated to individual requests.
     *
     * @see {ResponseLocals}
     */
    export const data: GlobalData

    /**
     * These properties are set by Force and configured through environment variables.
     */
    export interface GlobalData {
      readonly ADMIN_URL: string
      readonly APP_URL: string
      readonly ARTIST_COLLECTIONS_RAIL?: string // TODO: remove after CollectionsRail a/b test
      readonly ARTIST_COLLECTIONS_RAIL_IDS: string[]
      readonly CLIENT_NAVIGATION_V2: string // TODO: Remove after AB test.
      readonly CMS_URL: string
      readonly ENABLE_PRICE_TRANSPARENCY: string
      readonly FACEBOOK_APP_NAMESPACE: string
      readonly FACEBOOK_ID: string
      readonly FORCE_CLOUDFRONT_URL: string
      readonly GEMINI_CLOUDFRONT_URL: string
      readonly GENOME_URL: string
      readonly GOOGLE_ADWORDS_ID: string
      readonly IMAGE_LAZY_LOADING: boolean
      readonly IS_MOBILE: boolean
      readonly DEPLOY_ENV: string
      readonly METAPHYSICS_ENDPOINT: string
      readonly NODE_ENV: string
      readonly NOTIFICATION_COUNT: string
      readonly PREDICTION_URL: string
      readonly RECAPTCHA_KEY: string
      readonly SENTRY_PUBLIC_DSN: string
      readonly STRIPE_PUBLISHABLE_KEY: string
      readonly VOLLEY_ENDPOINT: string
      readonly XAPP_TOKEN: string
    }

    export interface ResponseLocalData extends GlobalData {
      RELAY_DATA?: any
      SUBMIT_URL?: string
      APP_TOKEN?: string
      SESSION_ID?: string
    }

    export interface ResponseLocal {
      /**
       * Request specific data. Use this to store data that’s to be used by other
       * parts of the stack during the processing of the remainder of the request
       * and to store data that’s to be made available to the client.
       */
      data: ResponseLocalData
      script: () => string
    }
  }
}
