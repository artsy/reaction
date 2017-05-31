import components, { init } from "../../components/index"
import GeneQueryConfig from "../../relay/queries/gene"

init({
  component: components.Gene,
  user: null,
  domID: "app-container",
  queryConfig: new GeneQueryConfig({ geneID: "conceptual-art" }),
})
