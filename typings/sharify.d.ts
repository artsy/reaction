declare module "sharify" {
  function sharify(): void
  export = sharify

  namespace sharify {
    /**
     * Do **not** use this on the server-side to store/access data that’s related to a single request. Instead use
     * `Response.locals.sharify.data`, which is data associated to individual requests.
     *
     * @see {ResponseLocals}
     */
    export const data: GlobalData

    /**
     * These properties are set by Force and configured through environment variables.
     */
    export interface GlobalData {
      readonly GEMINI_CLOUDFRONT_URL: string
      readonly METAPHYSICS_ENDPOINT: string
      readonly XAPP_TOKEN: string
    }

    export interface ResponseLocalData extends GlobalData {
      readonly CURRENT_USER?: User
      RELAY_DATA?: any
      SUBMIT_URL?: string
      APP_TOKEN?: string
      SESSION_ID?: string
    }

    export interface ResponseLocal {
      /**
       * Request specific data. Use this to store data that’s to be used by other parts of the stack during the
       * processing of the remainder of the request and to store data that’s to be made available to the client.
       */
      data: ResponseLocalData
      script: () => string
    }
  }
}
