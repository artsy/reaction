export function getUser(user: User): User {
  let currentUser = user

  if (currentUser === undefined) {
    const id = process.env.USER_ID
    const accessToken = process.env.USER_ACCESS_TOKEN
    const labFeatures = process.env.USER_LAB_FEATURES

    if (id && accessToken) {
      currentUser = {
        id,
        accessToken,
      }

      if (labFeatures) {
        currentUser.lab_features = labFeatures.split(",")
      }
    }
  }

  return currentUser
}
