export const mockResolver = (
  orderDetails: any = BuyOrderWithShippingDetails
) => ({
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
  Order: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
      __resolveType(obj, _context, _info) {
        return obj.mode === "BUY" ? "BuyOrder" : "OfferOrder"
      },
    }
  },
  BuyOrder: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
    }
  },
  OfferOrder: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
    }
  },
})

export const UntouchedOrder = {
  id: "2939023",
  code: "abcdefg",
  state: "PENDING",
  stateReason: null,
  itemsTotal: "$12,000",
  totalListPrice: "$12,000",
  totalListPriceCents: 1200000,
  shippingTotal: null,
  shippingTotalCents: null,
  taxTotal: null,
  taxTotalCents: null,
  creditCard: null,
  buyerTotal: "$12,000",
  requestedFulfillment: null,
  lineItems: {
    edges: [
      {
        node: {
          artwork: {
            id: "artworkId",
            pickup_available: true,
            artist_names: "Lisa Breslow",
            title: "Gramercy Park South",
            date: "2016",
            shippingOrigin: "New York, NY",
            medium: "Oil and pencil on panel",
            shipsToContinentalUSOnly: false,
            is_acquireable: true,
            dimensions: {
              in: "36 × 36 in",
              cm: "91.4 × 91.4 cm",
            },
            artists: [
              {
                id: "artistId",
              },
            ],
            attribution_class: null,
            image: {
              resized: {
                url:
                  "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=185&height=184&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FtOfWds4sIX_9WpRf3RqaQQ%2Flarge.jpg",
              },
              resized_ArtworkSummaryItem: {
                url:
                  "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=185&height=184&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FtOfWds4sIX_9WpRf3RqaQQ%2Flarge.jpg",
              },
            },
          },
          fulfillments: {
            edges: [
              {
                node: {
                  courier: "UPS",
                  trackingId: "AP234345634",
                  estimatedDelivery: "Friday, August 6",
                },
              },
            ],
          },
        },
      },
    ],
  },
  seller: {
    __typename: "Partner",
    name: "Kathryn Markel Fine Arts",
    locations: [
      {
        city: "New York",
        state: "NY",
        country: "US",
      },
    ],
  },
}

export const UntouchedBuyOrder = {
  ...UntouchedOrder,
  __typename: "BuyOrder",
  mode: "BUY",
}

export const TaxTotals = {
  taxTotal: "$120",
  taxTotalCents: 12000,
}

export const ShippingTotals = {
  shippingTotal: "$200",
  shippingTotalCents: 20000,
}

export const OfferWithTotals = {
  id: "myoffer-id",
  amount: "$14,000",
  amountCents: 1400000,
  ...ShippingTotals,
  ...TaxTotals,
  createdAt: null,
  fromParticipant: "SELLER",
  buyerTotal: "$14,320",
  buyerTotalCents: 1432000,
  note: "Another note!",
}

export const UntouchedOfferOrder = {
  ...UntouchedOrder,
  __typename: "OfferOrder",
  mode: "OFFER",
  totalListPrice: "$16,000",
  totalListPriceCents: 1600000,
  itemsTotal: "$16,000",
  itemsTotalCents: 1600000,
  lastOffer: null,
  awaitingResponseFrom: null,
  myLastOffer: null,
  offers: {
    edges: [{ node: OfferWithTotals }],
  },
}

export const OfferOrderWithOffers = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  myLastOffer: {
    ...OfferWithTotals,
    id: "my-last-offer-id",
    fromParticipant: "BUYER",
    note: null,
  },
}

export const OfferOrderWithOffersAndNote = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  myLastOffer: {
    ...OfferWithTotals,
    id: "my-last-offer-id",
    fromParticipant: "BUYER",
    note: "This is a note!",
  },
}

export const ShippingDetails = {
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "Ship",
    fulfillmentType: "SHIP",
    name: "Joelle Van Dyne",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    postalCode: "10013",
    region: "NY",
    country: "US",
    phoneNumber: "120938120983",
  },
}

export const PaymentDetails = {
  creditCard: {
    name: "Dr. Collector",
    street1: "1 Art st",
    street2: null,
    city: "New York",
    state: "NY",
    country: "USA",
    postal_code: "90210",
    brand: "Visa",
    last_digits: "4444",
    expiration_month: 3,
    expiration_year: 21,
  },
}

export const BuyOrderWithShippingDetails = {
  ...UntouchedBuyOrder,
  ...ShippingDetails,
  ...PaymentDetails,
}

export const OfferOrderWithShippingDetails = {
  ...OfferOrderWithOffers,
  ...ShippingDetails,
  ...PaymentDetails,
}

export const OfferOrderWithShippingDetailsAndNote = {
  ...OfferOrderWithOffersAndNote,
  ...ShippingDetails,
  ...PaymentDetails,
}

export const BuyOrderPickup = {
  ...UntouchedBuyOrder,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "Pickup",
    fulfillmentType: "PICKUP",
  },
}

export const OfferOrderPickup = {
  ...OfferOrderWithOffers,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "Pickup",
    fulfillmentType: "PICKUP",
  },
}

export const Buyer = {
  __typename: "User",
  id: "buyer",
}

export const Seller = {
  __typename: "Partner",
  id: "seller",
}

export const Offers = [
  {
    node: {
      id: OfferWithTotals.id,
      fromParticipant: OfferWithTotals.fromParticipant,
      amount: OfferWithTotals.amount,
      createdAt: "May 22",
    },
  },
  {
    node: {
      id: "0",
      fromParticipant: "BUYER",
      amount: "$1,200.00",
      createdAt: "May 21",
    },
  },
  {
    node: {
      id: "1",
      fromParticipant: "SELLER",
      amount: "$1,500.00",
      createdAt: "Apr 30",
    },
  },
  {
    node: {
      id: "2",
      fromParticipant: "BUYER",
      amount: "$1,100.00",
      createdAt: "Apr 5",
    },
  },
]
