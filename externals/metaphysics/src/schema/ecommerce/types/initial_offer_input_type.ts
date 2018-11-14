import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql"
export const InitialOfferInputType = new GraphQLInputObjectType({
  name: "InitialOfferOrderInput",
  fields: {
    orderId: {
      type: new GraphQLNonNull(GraphQLID),
      description: "ID of order",
    },
    amountCents: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Offer amount in cents",
    },
  },
})
