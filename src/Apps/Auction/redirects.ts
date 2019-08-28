import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"

interface Redirect {
  path: string
  reason: string
}

type Sale = routes_RegisterQueryResponse["sale"]
type Me = routes_RegisterQueryResponse["me"]

function isRegisterable(sale: Sale): boolean {
  return (sale.is_preview || sale.is_open) && !sale.is_registration_closed
}

function userRegisteredToBid(sale: Sale): boolean {
  return !!sale.registrationStatus
}

export function findRedirect(sale: Sale, me: Me): Redirect | null {
  let redirect = null
  if (me.has_qualified_credit_cards) {
    redirect = {
      path: `/auction/${sale.id}/registration-flow`,
      reason: "user already has a qualified credit card",
    }
  } else if (!sale.is_auction) {
    redirect = {
      path: `/sale/${sale.id}`,
      reason: "sale must be an auction",
    }
  } else if (!isRegisterable(sale)) {
    redirect = {
      path: `/auction/${sale.id}`,
      reason: "auction must be registerable",
    }
  } else if (userRegisteredToBid(sale)) {
    redirect = {
      path: `/auction/${sale.id}/confirm-registration`,
      reason: "user is already registered to bid",
    }
  }

  return redirect
}
