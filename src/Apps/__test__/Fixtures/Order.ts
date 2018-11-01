export const mockResolver = (orderDetails: any = OrderWithShippingDetails) => ({
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
    }
  },
})

export const UntouchedBuyOrder = {
  id: "2939023",
  mode: "BUY",
  code: "abcdefg",
  state: "PENDING",
  itemsTotal: "$12,000",
  shippingTotal: null,
  taxTotal: null,
  buyerTotal: "$12,000",
  requestedFulfillment: {
    __typename: "%other",
  },
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
              resized_transactionSummary: {
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

export const UntouchedOfferOrder = {
  id: "2939023",
  mode: "OFFER",
  code: "abcdefg",
  state: "PENDING",
  itemsTotal: "$12,000",
  offerTotal: null,
  shippingTotal: null,
  taxTotal: null,
  buyerTotal: "$12,000",
  requestedFulfillment: {
    __typename: "%other",
  },
  lastOffer: null,
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
              resized_transactionSummary: {
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

export const OrderWithShippingDetails = {
  ...UntouchedBuyOrder,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "Ship",
    name: "Joelle Van Dyne",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    postalCode: "10013",
    region: "NY",
    country: "US",
    phoneNumber: "120938120983",
  },
  creditCard: {
    brand: "Visa",
    last_digits: "4444",
    expiration_month: 3,
    expiration_year: 21,
  },
}

export const PickupOrder = {
  ...UntouchedBuyOrder,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "Pickup",
  },
}
