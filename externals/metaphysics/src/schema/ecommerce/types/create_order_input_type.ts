import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql"

export const CreateOrderInputType = new GraphQLInputObjectType({
  name: "CreateOrderInput",
  fields: {
    artworkId: {
      type: new GraphQLNonNull(GraphQLString),
      description: "BSON ID of artwork",
    },
    editionSetId: {
      type: GraphQLString,
      description: "ID of artwork's edition set",
    },
    quantity: {
      type: GraphQLInt,
      description: "quantity of artwork",
    },
  },
})
