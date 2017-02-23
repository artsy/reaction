import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import Button, { ButtonStyle, ButtonState } from '../button'

storiesOf("Buttons", Button)
    .add("Default Button", () => {
        return (
            <div>
                <div>
                    <Button>Button</Button>
                    <Button disabled>Button</Button>
                </div>
                <div>
                    <Button state={ButtonState.Success}>Button</Button>
                    <Button state={ButtonState.Success} disabled>Button</Button>
                </div>
                <div>
                    <Button state={ButtonState.Failure}>Button</Button>
                    <Button state={ButtonState.Failure} disabled>Button</Button>
                </div>
            </div>
        )
    })
    .add("Inverted Button", () => {
        return (
            <div>
                <div>
                    <Button buttonStyle={ButtonStyle.Inverted}>Inverted Button</Button>
                    <Button buttonStyle={ButtonStyle.Inverted} disabled>Button</Button>
                </div>
            </div>
        )
    })
    .add("Ghost Button", () => {
        return (
            <div>
                <div>
                    <Button buttonStyle={ButtonStyle.Ghost}>Ghost Button</Button>
                    <Button buttonStyle={ButtonStyle.Ghost} disabled>Button</Button>
                </div>
            </div>
        )
    })