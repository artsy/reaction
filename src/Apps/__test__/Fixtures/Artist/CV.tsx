export const showsConnection = {
  pageInfo: {
    hasNextPage: true,
    endCursor: "YXJyYXljb25uZWN0aW9uOjk=",
  },
  edges: [
    {
      cursor: "YXJyYXljb25uZWN0aW9uOjA=",
      node: {
        __id:
          "U2hvdzp0d28tcGFsbXMtdHdvLXBhbG1zLWF0LWlmcGRhLWZpbmUtYXJ0LXByaW50LWZhaXItMjAxOA==",
        city: null,
        href: "/show/two-palms-two-palms-at-ifpda-fine-art-print-fair-2018",
        name: "Catty Art Show",
        partner: {
          __typename: "Partner",
          name: "Catty Partner",
          href: "/two-palms",
          __id: "UGFydG5lcjp0d28tcGFsbXM=",
        },
        start_at: "2018",
        __typename: "Show",
      },
    },
  ],
}

export const CVFixture = {
  __id: "",
  id: "cecily-brown",
  showsConnection: { showsConnection },
}
