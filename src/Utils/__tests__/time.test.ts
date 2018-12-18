import { getOffsetBetweenGravityClock } from "../time"

jest.mock("../metaphysics", () => ({ metaphysics: jest.fn() }))
import { metaphysics } from "../metaphysics"
const mockphysics = metaphysics as jest.Mock<any>

const SECONDS = 1000
const MINUTES = 60 * SECONDS

const dateNow = 1525983752000 // Thursday, May 10, 2018 8:22:32.000 PM UTC in milliseconds

it("returns an offset between current time and system time", async () => {
  jest.useFakeTimers()
  Date.now = () => dateNow

  // Set up a situation where the client's clock is ahead of Gravity's clock by 10 minutes.
  mockphysics.mockReturnValueOnce(
    Promise.resolve({
      data: {
        system: {
          time: {
            unix: (dateNow - 10 * MINUTES) * 1e-3,
          },
        },
      },
    })
  )

  jest.runAllTicks()

  expect(await getOffsetBetweenGravityClock()).toEqual(10 * MINUTES)
})
