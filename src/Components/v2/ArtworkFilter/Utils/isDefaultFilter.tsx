export const isDefaultFilter: (name: string, value: any) => boolean = (
  name,
  value
) => {
  if (!value) {
    return false
  }

  switch (true) {
    case name === "attribution_class":
    case name === "major_periods":
      return value.length === 0
    case name === "sort":
      return value === "-decayed_merch"
    case name === "medium":
      return value === "*" || !value
    case name === "price_range" || name === "height" || name === "width":
      return value === "*-*"
    case name === "page":
      return value === 1
    default:
      return !value
  }
}
