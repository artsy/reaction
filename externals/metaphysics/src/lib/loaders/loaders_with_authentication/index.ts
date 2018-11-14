import convectionLoaders from "./convection"
import exchangeLoaders from "./exchange"
import gravityLoaders from "./gravity"
import impulseLoaders from "./impulse"

export default (accessToken, userID, opts) => ({
  ...gravityLoaders(accessToken, userID, opts),
  ...convectionLoaders(accessToken, opts),
  ...impulseLoaders(accessToken, userID, opts),
  ...exchangeLoaders(accessToken, opts),
})
