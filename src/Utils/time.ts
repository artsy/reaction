import { metaphysics } from "./metaphysics"

const getLocalTimestampInMilliSeconds = () => {
  return Date.now()
}

interface SystemTimeResults {
  data: {
    system: {
      time: {
        unix: number
      }
    }
  }
}

const fetchSystemTime = () => {
  return metaphysics<SystemTimeResults>({
    query: `
      {
        system {
          time {
            unix
          }
        }
      }
    `,
  })
}

const getGravityTimestampInMilliSeconds = async () => {
  const startTime = getLocalTimestampInMilliSeconds()
  const { data } = await fetchSystemTime()

  const possibleNetworkLatencyInMilliSeconds =
    (getLocalTimestampInMilliSeconds() - startTime) / 2
  const serverTimestampInMilliSeconds =
    data.system.time.unix * 1e3 + possibleNetworkLatencyInMilliSeconds

  return serverTimestampInMilliSeconds
}

export const getOffsetBetweenGravityClock = async () => {
  try {
    const gravityClock = await getGravityTimestampInMilliSeconds()
    const localClock = getLocalTimestampInMilliSeconds()

    const offsetInMilliSeconds = localClock - gravityClock

    return offsetInMilliSeconds
  } catch (error) {
    // If something goes wrong (e.g. network error), just fall back to "no offset" since there is nothing we can do.
    return 0
  }
}
