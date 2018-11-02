import { TransactionSummary_order } from "__generated__/TransactionSummary_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

import {
  Box,
  Flex,
  FlexProps,
  Image,
  Sans,
  Serif,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"

export interface TransactionSummaryProps extends FlexProps {
  order: TransactionSummary_order
  offerOverride?: string | null
}

export class TransactionSummary extends React.Component<
  TransactionSummaryProps
> {
  render() {
    const {
      offerOverride,
      order: {
        itemsTotal,
        mode,
        offerTotal,
        shippingTotal,
        shippingTotalCents,
        taxTotal,
        taxTotalCents,
        buyerTotal,
        lineItems,
        seller: { name },
      },
      ...others
    } = this.props

    const artwork = get(this.props, props => lineItems.edges[0].node.artwork)

    const {
      artist_names,
      title,
      date,
      shippingOrigin,
      image: {
        resized_transactionSummary: { url: imageURL },
      },
    } = artwork

    const truncateTextStyle = {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    } as any

    const isOfferFlow = mode === "OFFER"

    return (
      <Flex flexDirection="column" {...others}>
        <StackableBorderBox flexDirection="row">
          <Box height="auto">
            <Image src={imageURL} width="55px" mr={1} />
          </Box>
          <Flex flexDirection="column" style={{ overflow: "hidden" }}>
            <Serif
              size="2"
              weight="semibold"
              color="black60"
              style={truncateTextStyle}
            >
              {artist_names}
            </Serif>
            <div style={{ lineHeight: "1", ...truncateTextStyle }}>
              <Serif italic size="2" color="black60" display="inline">
                {title}
              </Serif>
              <Serif size="2" color="black60" display="inline">
                {date && `, ${date}`}
              </Serif>
            </div>
            <Serif size="2" color="black60" style={truncateTextStyle}>
              {name}
            </Serif>
            <Serif size="2" color="black60">
              {shippingOrigin}
            </Serif>
          </Flex>
        </StackableBorderBox>
        <StackableBorderBox flexDirection="column">
          {isOfferFlow ? (
            <>
              <Entry label="Your offer" value={offerOverride} />
              {Boolean(itemsTotal) && (
                <Entry
                  label="List price"
                  secondary
                  value={itemsTotal || offerTotal}
                />
              )}

              <Spacer mb={2} />
            </>
          ) : (
            <Entry label="Price" value={itemsTotal} />
          )}
          <Entry
            label="Shipping"
            value={
              this.formattedAmount(shippingTotal, shippingTotalCents) || "—"
            }
          />
          <Entry
            label="Tax"
            value={this.formattedAmount(taxTotal, taxTotalCents) || "—"}
          />
          <Spacer mb={2} />
          <Entry label="Total" value={buyerTotal} final />
        </StackableBorderBox>
      </Flex>
    )
  }

  private formattedAmount = (amount, amountCents) => {
    // FIXME: Use actual currency code
    if (amount) {
      return amount
    } else {
      return amountCents === 0 ? "$0.00" : null
    }
  }
}

const Entry = ({
  label,
  value,
  final,
  secondary,
}: {
  label: React.ReactNode
  value: React.ReactNode
  final?: boolean
  secondary?: boolean
}) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      {secondary ? (
        <Sans size="2" color="black30">
          {label}
        </Sans>
      ) : (
        <Serif size="2" color="black60">
          {label}
        </Serif>
      )}
    </div>
    <div>
      {secondary ? (
        <Sans size="2" color="black30">
          {value}
        </Sans>
      ) : (
        <Serif
          size="2"
          color={final ? "black100" : "black60"}
          weight={final ? "semibold" : "regular"}
        >
          {value}
        </Serif>
      )}
    </div>
  </Flex>
)

export const TransactionSummaryFragmentContainer = createFragmentContainer(
  TransactionSummary,
  graphql`
    fragment TransactionSummary_order on Order {
      mode
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      itemsTotal(precision: 2)
      offerTotal(precision: 2)
      buyerTotal(precision: 2)
      seller {
        ... on Partner {
          name
        }
      }
      lastOffer {
        id
        amountCents
      }
      lineItems {
        edges {
          node {
            artwork {
              artist_names
              title
              date
              shippingOrigin
              image {
                resized_transactionSummary: resized(width: 55) {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
)
