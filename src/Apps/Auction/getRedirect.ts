import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"

export interface Redirect {
  path: string
  reason: string
}

export function registerRedirect({
  me,
  sale,
}: routes_RegisterQueryResponse): Redirect | null {
  if (me.has_qualified_credit_cards) {
    return {
      path: registrationFlowPath(sale),
      reason: "user already has a qualified credit card",
    }
  } else if (!sale.is_auction) {
    return {
      path: `/sale/${sale.id}`,
      reason: "sale must be an auction",
    }
  } else if (!isRegisterable(sale)) {
    return {
      path: auctionPath(sale),
      reason: "auction must be registerable",
    }
  } else if (userRegisteredToBid(sale)) {
    return {
      path: confirmRegistrationPath(sale),
      reason: "user is already registered to bid",
    }
  }

  return null
}

export function confirmBidRedirect(
  data: routes_ConfirmBidQueryResponse,
  location: Location
): Redirect | null {
  const { artwork, me } = data
  const { saleArtwork } = artwork

  const { sale } = saleArtwork
  const { registrationStatus } = sale

  if (!me) {
    return {
      path: "/log_in?redirect_uri=" + encodeURIComponent(location.pathname),
      reason: "user is not signed in",
    }
  }

  if (!registrationStatus && sale.is_registration_closed) {
    return {
      path: artworkPath(sale, artwork),
      reason: "user is not registered, registration closed",
    }
  }
  if (registrationStatus && !registrationStatus.qualified_for_bidding) {
    return {
      path: confirmRegistrationPath(sale),
      reason: "user is not qualified for bidding",
    }
  }
  if (sale.is_closed) {
    return {
      path: artworkPath(sale, artwork),
      reason: "sale is closed",
    }
  }
  return null
}

const auctionPath = (sale: { id: string }): string => `/auction/${sale.id}`
const registrationFlowPath = (sale: { id: string }): string =>
  auctionPath(sale) + "/registration-flow"
const confirmRegistrationPath = (sale: { id: string }): string =>
  auctionPath(sale) + "/confirm-registration"
const artworkPath = (sale: { id: string }, artwork: { id: string }): string =>
  auctionPath(sale) + `/artwork/${artwork.id}`

function isRegisterable(sale: {
  is_preview: boolean
  is_open: boolean
  is_registration_closed: boolean
}): boolean {
  return (sale.is_preview || sale.is_open) && !sale.is_registration_closed
}

function userRegisteredToBid(sale: {
  registrationStatus: { qualified_for_bidding: boolean }
}): boolean {
  return !!sale.registrationStatus
}
