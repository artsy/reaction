export enum SortTypes {
  default = "default",
  collection = "collection",
}

const sorts = {
  default: [
    { value: "-decayed_merch", text: "Default" },
    { value: "-partner_updated_at", text: "Recently updated" },
    { value: "-published_at", text: "Recently added" },
    { value: "-year", text: "Artwork year (desc.)" },
    { value: "year", text: "Artwork year (asc.)" },
  ],
  collection: [
    { value: "-decayed_merch", text: "Default" },
    { value: "sold,-has_price,-prices", text: "Price (desc.)" },
    { value: "sold,-has_price,prices", text: "Price (asc.)" },
    { value: "-partner_updated_at", text: "Recently updated" },
    { value: "-published_at", text: "Recently added" },
    { value: "-year", text: "Artwork year (desc.)" },
    { value: "year", text: "Artwork year (asc.)" },
  ],
}

export const getSortOptions = (key: SortTypes) => {
  return sorts[key]
}
