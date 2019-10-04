import createQueryMiddleware from "farce/lib/createQueryMiddleware"
import qs from "qs"
import { queryStringParsing } from "./queryStringParsing"

export const historyMiddlewares = [
  createQueryMiddleware({
    parse: queryStringParsing,
    stringify: qs.stringify,
  }),
]
