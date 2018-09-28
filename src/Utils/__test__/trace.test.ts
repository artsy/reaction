import tracer from "dd-trace"
import { trace } from "../trace"

jest.mock("dd-trace")

describe("trace", () => {
  let span
  let parentSpan

  beforeEach(() => {
    parentSpan = {}
    tracer.scopeManager = jest.fn(() => ({
      active: jest.fn(() => ({
        span: jest.fn(() => parentSpan),
      })),
    }))
    span = {
      finish: jest.fn(),
      addTags: jest.fn(),
    }
    tracer.startSpan = jest.fn(() => span)
  })

  it("creates a child span in the current context", () => {
    expect.hasAssertions()
    return trace("test", new Promise(resolve => setImmediate(resolve))).then(
      () => {
        expect(tracer.startSpan).toBeCalledWith("reaction.test", {
          childOf: parentSpan,
        })
      }
    )
  })

  it("finishes the span when the promise resolves", () => {
    expect.hasAssertions()
    return trace("test", new Promise(resolve => resolve("ohai"))).then(
      result => {
        expect(result).toEqual("ohai")
        expect(span.finish).toBeCalled()
      }
    )
  })

  it("stores the error and finishes the span when the promise rejects", () => {
    expect.hasAssertions()
    return trace(
      "test",
      new Promise((_resolve, reject) => reject(new Error("test")))
    ).catch(error => {
      expect(span.addTags).toBeCalledWith({
        "error.type": error.name,
        "error.msg": error.message,
        "error.stack": error.stack,
      })
      expect(span.finish).toBeCalled()
    })
  })
})
