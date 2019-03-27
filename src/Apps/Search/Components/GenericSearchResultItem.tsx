import { Box, Flex, Image, Link, Sans, Serif, Spacer } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Truncator } from "Components/Truncator"
import React from "react"

interface GenericSearchResultItemProps {
  imageUrl: string
  name: string
  description?: string
  href: string
  entityType: string
  term: string
  index: number
  id: string
}

@track()
export class GenericSearchResultItem extends React.Component<
  GenericSearchResultItemProps
> {
  @track((props: GenericSearchResultItemProps) => ({
    action_type: Schema.ActionType.SelectedItemFromSearch,
    query: props.term,
    item_number: props.index,
    item_type: props.entityType,
    item_id: props.id,
    destination_path: props.href,
  }))
  handleClick() {
    // no-op
  }

  render() {
    const { imageUrl, href, name, description, entityType } = this.props
    const translateEntityType = anEntityType => {
      switch (anEntityType) {
        case "PartnerShow":
          return "Show"
        default:
          return anEntityType
      }
    }

    return (
      <>
        <Flex flexDirection="row">
          <Link
            href={href}
            onClick={() => {
              this.handleClick()
            }}
          >
            <Box height={70} width={70} mr={2} bg="black5">
              {imageUrl && <Image width={70} height={70} src={imageUrl} />}
            </Box>
          </Link>
          <Box>
            <Sans color="black100" size="2" weight="medium">
              {translateEntityType(entityType)}
            </Sans>
            <Spacer mb={0.5} />
            <Link
              href={href}
              underlineBehavior="hover"
              onClick={() => {
                this.handleClick()
              }}
            >
              <Serif color="black100" size="3">
                {name}
              </Serif>
            </Link>
            {description && (
              <>
                <Spacer mb={0.5} />
                <Serif color="black60" size="3" maxWidth={536}>
                  <Truncator maxLineCount={3}>{description}</Truncator>
                </Serif>
              </>
            )}
          </Box>
        </Flex>
      </>
    )
  }
}
