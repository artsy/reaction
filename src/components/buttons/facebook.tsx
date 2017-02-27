import * as React from 'react'
import Button, { ButtonProps } from './default'
import Icon, { IconProps } from '../icon'
import styled from 'styled-components'

const FacebookButton = (props: ButtonProps) => {
    const icon = <Icon name="facebook" color="white" />
    return (
        <Button {...props} icon={icon}>Log in with Facebook</Button>
    )
}

export default styled(FacebookButton)`
    background: #39439C;
    color: white;

    &:hover:not(:disabled) {
        background: #252C68;
    }
`

