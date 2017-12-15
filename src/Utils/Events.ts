import EventEmitter from "events"

/* tslint:disable:no-namespace */
declare global {
  interface Window { __reactionEventsEventEmitter: any; }
}
/* tslint:disable:no-namespace */

const emitter = typeof window !== 'undefined'
  ? window.__reactionEventsEventEmitter || (window.__reactionEventsEventEmitter = new EventEmitter())
  : new EventEmitter()
const postEvent = data => emitter.emit("postEvent", data)
const onEvent = callback => emitter.on("postEvent", callback)

export default { postEvent, onEvent, emitter }
