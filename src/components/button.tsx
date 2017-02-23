import * as React from 'react'
import styled from 'styled-components'
import colors from '../assets/colors'
import * as fonts from '../assets/fonts'

interface ButtonProps extends React.HTMLProps<Button> {
    buttonStyle?: ButtonStyle
    state?: ButtonState
}

export class ButtonStyle extends String {
    static Default: ButtonStyle = "default"
    static Ghost: ButtonStyle = "ghost"
    static Inverted: ButtonStyle = "inverted"
}

export class ButtonState extends String {
    static Default: ButtonState = "default"
    static Loading: ButtonState = "loading"
    static Success: ButtonState = "success"
    static Failure: ButtonState = "failure"
}

class Button extends React.Component<ButtonProps, any> {
    static defaultProps: ButtonProps = {
        buttonStyle: ButtonStyle.Default,
        state: ButtonState.Default,
    }

    render(): JSX.Element {
        const newProps: any = {...this.props}
        delete newProps.buttonStyle
        delete newProps.state

        return (
            <button className={this.props.className} {...newProps}>
                {this.props.children}
            </button>
        )
    }
}

const backgroundColor = props => {
    switch(props.buttonStyle) {
        case ButtonStyle.Inverted: 
            if (props.disabled) return colors.grayBold
            return 'black'
        case ButtonStyle.Ghost: return 'white'
        case ButtonStyle.Default:
        default:
            if (props.state == ButtonState.Success) return colors.greenRegular
            if (props.state == ButtonState.Failure) return colors.redRegular
            return colors.gray
    }
}

const hoverBackgroundColor = props => {
    switch(props.buttonStyle) {
        case ButtonStyle.Inverted: return colors.purpleRegular
        case ButtonStyle.Ghost: return 'white'
        case ButtonStyle.Default: 
        default: 
            if (props.state == ButtonState.Success) return colors.greenBold
            if (props.state == ButtonState.Failure) return colors.redBold
            return colors.grayRegular
    }
}

const color = props => {
    switch(props.buttonStyle) {
        case ButtonStyle.Inverted: return 'white'
        case ButtonStyle.Ghost: return 'black'
        case ButtonStyle.Default:
        default:
            if (props.disabled) return 'rgba(0,0,0,0.5)'
            if (props.state == ButtonState.Success) return 'white'
            if (props.state == ButtonState.Failure) return 'white'
            return 'black'
    }
}

export default styled(Button)`
    background: ${backgroundColor};
    color: ${color};
    
    padding: 15px 30px;
    font-size: 13px;
    line-height: 1;
    outline: 0;
    border: ${props => props.buttonStyle == ButtonStyle.Ghost ? `1px solid ${colors.grayRegular}` : 0};
    transition: background-color .25s,color .25s;
    margin: 10px;

    &:hover {
        background: ${hoverBackgroundColor};
    }

    &:hover:disabled {
        background: ${backgroundColor};
    }

    ${fonts.primary.style}
`