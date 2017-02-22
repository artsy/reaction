import * as React from 'react'
import * as Bootstrap from 'react-bootstrap'
import styled from 'styled-components'
import colors from '../assets/colors'

debugger
const buttonsStyles = require('../../externals/elan/components/buttons/index.styl')
console.log(buttonsStyles)

// buttonsStyles.


interface ButtonProps extends Bootstrap.ButtonProps {
    primary?: boolean
}

class Button extends React.Component<ButtonProps, any> {
    render(): JSX.Element {
        let bsStyle = (this.props.bsStyle || 'default')

        if (this.props.primary) {
            bsStyle = 'primary'
        }
        const newProps = {...this.props, bsStyle, className: 'circle-button'}
        delete newProps.primary

        return (
            <div className={this.props.className}>
            <Bootstrap.Button {...newProps}>
                {this.props.children}
            </Bootstrap.Button>
            </div>
        )
    }
}


export default styled(Button)`
    background: ${props => {
        if (props.primary) {
            return colors.purpleRegular
        }

        return 'black'
    }};
    color: white;
    ${buttonsStyles}
`