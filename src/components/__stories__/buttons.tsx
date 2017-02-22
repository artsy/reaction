import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import Button from '../button'

storiesOf("Buttons", Button)
    .add("Default Button", () => {
        return <Button>Default Button</Button>
    })
    .add("Primary Button", () => {
        return <Button primary>Primary Button</Button>
    })