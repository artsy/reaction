import { stitch } from "@artsy/stitch"
import { Block } from "@artsy/stitch/dist/render"
import { buildServerApp, isRedirect } from "Artsy/Router/server"
import { ContextProps } from "Components/Artsy"
import express, { Request, RequestHandler, Response } from "express"
import React from "react"
import styled from "styled-components"
import { routes } from "./routes"

// TODO: This will probably be needed for the client, but setting up an env
// should happen in a root dev-server.ts file that can do these things before
// any other files get loaded, because some modules will depend on these vars
// being available at the module scope.
//
// sd.GEMINI_CLOUDFRONT_URL = process.env.GEMINI_CLOUDFRONT_URL

/**
 * TODO:
 * The `any` return type may be scoped a bit more, but `Response.prototype.send`
 * accepts it and it’s not entirely clear to me what to do in the case of Stitch
 * returning an array, as I can’t find deviating examples in Force. For now this
 * is fine.
 */
type RenderLayoutHandler = (
  req: Request,
  res: Response,
  layoutBlocks: LayoutBlocks
) => Promise<any>

type ReactionApp = (
  contextBuilder: (req: Request, res: Response) => ContextProps,
  renderLayout?: RenderLayoutHandler
) => RequestHandler

interface LayoutBlocks {
  head?: Block
  body: Block
  footer?: Block
}

const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`

const defaultRenderLayoutHandler: RenderLayoutHandler = async (
  req,
  res,
  layoutBlocks
) => {
  return await stitch({
    layout: "data/dev-server.handlebars",
    config: {
      styledComponents: true,
    },
    blocks: layoutBlocks as any,
  })
}

export const requestHandler: ReactionApp = (
  contextBuilder,
  handler = defaultRenderLayoutHandler
) => async (req, res, next) => {
  try {
    const build = await buildServerApp({
      routes,
      url: req.url,
      context: contextBuilder(req, res),
    })
    console.log(build)

    if (isRedirect(build)) {
      res.redirect(302, build.redirect.url)
      return
    }

    const { ServerApp, status } = build

    const layout = await handler(req, res, {
      body: () => (
        <Container>
          <ServerApp />
        </Container>
      ),
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log(error) // TODO Improve reporting, eg to sentry?
    next(error)
  }
}

const app = express()
app.get(
  "/artist/:artistID*",
  requestHandler((req, res) => ({
    // initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    // user: req.user && req.user.toJSON(),
    // isEigen: res.locals.sd.EIGEN,
    // mediator,
  }))
)
app.listen(3000, () => console.log(`Example app listening on port 300!`))
