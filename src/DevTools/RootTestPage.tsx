import { ReactWrapper } from "enzyme"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"

export function expectOne<T>(component: ReactWrapper<T>): ReactWrapper<T> {
  if (component.length !== 1) {
    // put this behind an if statement to prevent messing up assertion numbers
    expect(component.length).toBe(1)
  }
  return component
}

export class RootTestPage {
  readonly mockPushRoute = jest.fn<string>()
  readonly mockQueryFetch = jest.fn<string>()
  readonly mockMutationFetch = jest.fn<string>()

  readonly root: ReactWrapper

  async update() {
    await flushPromiseQueue()
    this.root.update()
  }

  mockMutationNetworkFailureOnce() {
    this.mockMutationFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("failed to fetch"))
    )
  }

  // @ts-ignore
  find: ReactWrapper["find"] = (...args) => this.root.find(...args)

  get lastMutationVariables() {
    return this.mockMutationFetch.mock.calls[
      this.mockMutationFetch.mock.calls.length - 1
    ][1]
  }
}
