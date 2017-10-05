import EventEmitter from "events"

const emitter = new EventEmitter()
const postEvent = data => emitter.emit("postEvent", data)
const onEvent = callback => emitter.on("postEvent", callback)

export default { postEvent, onEvent, emitter }
