export interface FlickitySettings {
  draggable?: boolean
  freeScroll?: boolean
  wrapAround?: boolean
  groupCells?: boolean | number | string
  autoPlay?: boolean | number
  fullscreen?: boolean
  fade?: boolean
  adaptiveHeight?: boolean
  watchCSS?: boolean
  hash?: boolean
  dragThreshold?: number
  friction?: number
  selectedAttraction?: number
  freeScrollFriction?: number
  imagesLoaded?: boolean
  lazyLoad?: boolean | number
  bgLazyLoad?: boolean | number
  initialIndex?: number
  accessibility?: boolean
  setGallerySize?: boolean
  resize?: boolean
  cellAlign?: "left" | "center" | "right"
  contain?: boolean
  percentPosition?: boolean
  rightToLeft?: boolean
  prevNextButtons?: boolean
  pageDots?: boolean
}
