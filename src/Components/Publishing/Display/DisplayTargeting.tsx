export const targetingData = (id: string, pageType: string) => {
  // TODO: Create a sharify field to pass true for staging and false for prod env to the isTesting bool
  const isTesting = true

  return {
    is_testing: isTesting,
    page_type: pageType,
    post_id: id,
  }
}

export const is300x50AdUnit = (unit: string): boolean => {
  return unit.slice(-3) === "x50"
}
