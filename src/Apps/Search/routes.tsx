import { RouteConfig } from "found"
import { graphql } from "react-relay"
import { SearchAppFragmentContainer as SearchApp } from "./SearchApp"

export const routes: RouteConfig[] = [
  {
    path: "/search",
    Component: SearchApp,
    query: graphql`
      query routes_SearchBarTopLevelQuery($term: String!) {
        viewer {
          ...SearchApp_viewer @arguments(term: $term)
        }
      }
    `,
    prepareVariables: (params, props) => {
      // FIXME: The initial render includes `location` in props, but subsequent
      // renders (such as tabbing back to this route in your browser) will not.
      const paramsFromUrl = props.location ? props.location.query : {}
      return {
        ...paramsFromUrl,
        ...params,
      }
    },
  },
]
