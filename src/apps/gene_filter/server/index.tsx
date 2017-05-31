import * as express from "express"
import * as path from "path"

import { Index } from "./route_handlers"

const app = express.Router()

app.use(express.static(path.resolve(__dirname)))
app.get("/", Index)

export default app
