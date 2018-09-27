import tracer from "dd-trace"

/**
 * Adds a DataDog trace around a unit of work wrapped by a Promise.
 *
 * @param name The name/resource for the trace span.
 * @param work The `Promise` that is performing the work to be traced.
 */
export function trace<T extends Promise<any>>(name: string, work: T): T {
  const activeScope = tracer.scopeManager().active()
  const span = tracer.startSpan(`reaction.${name}`, {
    childOf: activeScope && activeScope.span(),
  })
  return work
    .then(result => {
      span.finish()
      return result
    })
    .catch(error => {
      span.addTags({
        "error.type": error.name,
        "error.msg": error.message,
        "error.stack": error.stack,
      })
      span.finish()
      throw error
    }) as T
}
