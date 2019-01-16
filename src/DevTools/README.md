# Guide to using `mockData` and `mockMutationResults`

## The basics
If your are testing a component that makes a query to metaphysics, you can use the `renderRelayTree` helper to mock out the data that would be returned by metaphysics. Previously this was done with the `mockResolvers` prop, but now we have an easier and less confusing way: `mockData` and `mockMutationResults`. The idea is that these properties should match the exact data shape that metaphysics would return.

e.g. if you have a component with a query fragment like so:

```graphql
fragment ArtistDetails_artist on Artist {
  name
  birthday
  deathday
}
```

You would do this:

```ts
await renderRelayTree({
  Component: ArtistDetailsFragmentContainer,
  query: graphql`
    query ArtistDetailsTestQuery {
      artist(id: "unused") {
        ...ArtistDetails_artist
      }
    }
  `,
  mockData: {
    artist: {
      name: "Banksy",
      birthday: "unknown",
      deathday: null,
    },
  },
})
```

It handles field aliases just like you'd expect. So if you have

```graphql
fragment ArtistDetails_artist on Artist {
  birthYear: birthday(format: "YYYY")
  birthdayFull: birthday(format: "Do MM YYYY")
}
```

Then your `mockData` can be like

```ts
mockData = {
  artist: {
    birthYear: "1987",
    birthdayFull: "12th April 1987"
  }
}
```

Similarly, if you have a component that does mutations and you want to mock the return result of that mutation, you can do it in the same way but using the `mockMutationResults` prop.

```ts
await renderRelayTree({
  Component: ArtistDetailsFragmentContainer,
  query: graphql`
    query ArtistDetailsTestQuery {
      artist(id: "unused") {
        ...ArtistDetails_artist
      }
    }
  `,
  mockData: {
    artist: {
      name: "Banksy",
      birthday: "unknown",
      deathday: null,
    },
  },
  mockMutationResults: {
    // this mutation doesn't actually exist, it's just an illustration
    setArtistBirthday: {
      // remember this represents the output that is returned from the mutation request
      artist: {
        name: "Banksy",
        birthday: "2019-01-14T12:38:42.931Z",
      },
    },
  },
})
```

## Dealing with union types

Union types should be disambiguated using the `__typename` property. e.g. for a response from an `/order` app mutation, do something like this:

```ts
mockMutationResults = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationSuccess",
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}
```

or this:

```ts
mockMutationResults = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      __typename: "OrderWithMutationFailure",
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}
```

## Using functions to return different results

Both `mockData` and `mockMutationResults` can take functions as top-level values, to return different data based on query variables.

```ts
mockMutationResults = {
  ecommerceSetOrderShipping: (_, { input }) => {
    if (input.shipping.country === "US") {
      return {
        orderOrError: {
          __typename: "OrderWithMutationSuccess",
          order: {
            ...BuyOrderWithShippingDetails,
          },
        },
      }
    } else {
      return {
        orderOrError: {
          __typename: "OrderWithMutationFailure",
          error: {
            type: "validation",
            code: "address_outside_usa",
            data: null,
          },
        },
      }
    }
  },
}
```