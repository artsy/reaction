declare global {
  interface Document {
    readonly mozFullScreenElement: Element | null
    readonly mozFullScreenEnabled: boolean
    readonly msFullscreenElement: Element | null
    readonly msFullscreenEnabled: boolean
    mozCancelFullScreen: () => void
    msExitFullscreen: () => void
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
