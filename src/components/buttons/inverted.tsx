import Button from './default'
import styled from 'styled-components'
import colors from '../../assets/colors'

const InvertedButton = styled(Button)`
    background: ${props => props.disabled ? colors.grayBold : 'black'};
    color: white;

    &:hover:not(:disabled) {
        background: ${colors.purpleRegular};
    }
`

export default InvertedButton