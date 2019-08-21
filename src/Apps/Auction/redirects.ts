import { redirects_me } from "__generated__/redirects_me.graphql"
import { redirects_sale } from "__generated__/redirects_sale.graphql"
import { graphql } from "react-relay"

interface Redirect {
  path: string
  reason: string
}

function isRegisterable(sale: redirects_sale): boolean {
  return (sale.is_preview || sale.is_open) && !sale.is_registration_closed
}

function userRegisteredToBid(sale: redirects_sale) {
  return !!sale.registrationStatus
}

export function findRedirect(
  sale: redirects_sale,
  me: redirects_me
): Redirect | null {
  let redirect
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

graphql`
  fragment redirects_sale on Sale {
    id
    is_auction
    is_registration_closed
    is_preview
    is_open
    is_auction
    registrationStatus {
      qualified_for_bidding
    }
  }

  fragment redirects_me on Me {
    has_qualified_credit_cards
  }
`
