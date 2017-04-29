interface CurrentUser {
  id: string,
  accessToken: string,
}

interface Data {
  CURRENT_USER?: CurrentUser,
  // These are reaction-force specific
  METAPHYSICS_ENDPOINT: string,
  RELAY_DATA?: any,
}

declare function sharify(): void
export = sharify

declare namespace sharify {
  const data: Data

  export interface ResponseLocals {
    data: Data,
    script: () => string,
  }
}
