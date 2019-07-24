export const getViewportWidth = () => {
  let width: number
  try {
    width = window.innerWidth
  } catch (e) {
    width = 0
  }
  return width
}
