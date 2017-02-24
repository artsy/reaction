import * as React from 'react'
import styled from 'styled-components'
import colors from '../assets/colors'
import * as fonts from '../assets/fonts'

interface ButtonProps extends React.HTMLProps<Button> {
    buttonStyle?: ButtonStyle
    state?: ButtonState
}

interface ButtonColor {
    default: string
    disabled?: string
    success?: string
    failure?: string
}

type ButtonColors = Map<ButtonStyle, ButtonColor>

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
    public static defaultProps: ButtonProps

    render(): JSX.Element {
        const newProps: any = {...this.props}
        delete newProps.buttonStyle
        delete newProps.state

        return this.props.href 
            ? (
                <a className={this.props.className} {...newProps}>
                    {this.props.children}
                </a> 
            ) : (
                <button className={this.props.className} {...newProps}>
                    {this.props.children}
                </button>
            )
    }
}

const colorFromProps = (colors: [[ButtonStyle, ButtonColor]]) => {
    const map = new Map<ButtonStyle, ButtonColor>(colors)

    return (props: ButtonProps) => {
        const style = props.buttonStyle
        const color = map.get(style)

        if (props.state == ButtonState.Success) return color.success
        if (props.state == ButtonState.Failure) return color.failure

        return props.disabled ? color.disabled : color.default    
    }
}

const backgroundColor = colorFromProps([
    [ButtonStyle.Default, { 
        default: colors.grayRegular, 
        success: colors.greenRegular, 
        failure: colors.redRegular 
    }],
    [ButtonStyle.Inverted, { 
        default: 'black', 
        disabled: colors.grayBold 
    }],
    [ButtonStyle.Ghost, { default: 'white' }],
])

const hoverBackgroundColor = colorFromProps([
    [ButtonStyle.Default, { 
        default: colors.grayMedium, 
        success: colors.greenBold, 
        failure: colors.redBold
    }],
    [ButtonStyle.Inverted, {
        default: colors.purpleRegular,
    }],
    [ButtonStyle.Ghost, { default: 'white' }],
])

const color = colorFromProps([
    [ButtonStyle.Default, {
        default: 'black',
        disabled: 'rgba(0,0,0,0.5)',
        success: 'white',
        failure: 'white'
    }],
    [ButtonStyle.Inverted, { default: 'white' }],
    [ButtonStyle.Ghost, { default: 'black' }]
])

export const StyledButton = styled(Button)`
    background: ${backgroundColor};
    color: ${color};
    display: inline-block;
    padding: 15px 30px;
    font-size: 13px;
    line-height: 1;
    outline: 0;
    border: ${props => props.buttonStyle == ButtonStyle.Ghost ? `1px solid ${colors.grayRegular}` : 0};
    transition: background-color .25s,color .25s;
    margin: 10px;

    &:hover {
        background: ${hoverBackgroundColor};
        color: ${props => props.buttonStyle == ButtonStyle.Ghost 
            && !props.disabled ? colors.purpleRegular : 'black'};
    }

    &:hover:disabled {
        background: ${backgroundColor};
    }

    ${fonts.primary.style}
`

StyledButton.defaultProps = {
    buttonStyle: ButtonStyle.Default,
    state: ButtonState.Default,
}

export default StyledButton