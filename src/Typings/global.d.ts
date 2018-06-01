declare global {
  interface Document {
    readonly mozFullScreenElement: Element | null
    readonly mozFullScreenEnabled: boolean
    readonly msFullscreenElement: Element | null
    readonly msFullscreenEnabled: boolean
    mozCancelFullScreen: () => void
    msExitFullscreen: () => void
  }

  interface Window {
    __RELAY_BOOTSTRAP__: string
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
