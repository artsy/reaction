export const sizeMeRefreshRate = 500

export const zIndex = (size: string) => {
  const sizes = {
    modal: 1070,
  }
  return sizes[size]
}
