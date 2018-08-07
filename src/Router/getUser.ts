export function getUser(user) {
  let currentUser = user
  if (process.env.USER_ID && process.env.USER_ACCESS_TOKEN) {
    currentUser = currentUser || {
      id: process.env.USER_ID,
      accessToken: process.env.USER_ACCESS_TOKEN,
    }
  }
  return currentUser
}
