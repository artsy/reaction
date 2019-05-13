declare global {
  interface Document {
    readonly fullscreenElement: Element | null
    readonly mozFullScreenElement: Element | null
    readonly mozFullScreenEnabled: boolean
    readonly msFullscreenElement: Element | null
    readonly msFullscreenEnabled: boolean
    readonly webkitFullscreenEnabled: boolean
    readonly webkitFullscreenElement: Element | null
    mozCancelFullScreen: () => void
    msExitFullscreen: () => void
    webkitExitFullscreen: () => void
  }

  interface Window {
    __RELAY_BOOTSTRAP__: string
    grecaptcha: any
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
