import Button from './default'
import styled from 'styled-components'
import colors from '../../assets/colors'

const GhostButton = styled(Button)`
    background: white;
    color: ${props => props.disabled ? 'rgba(0,0,0,0.5)' : 'black'};
    border: 1px solid ${colors.grayRegular};

    &:hover:not(:disabled) {
        background: white;
        color: ${colors.purpleRegular};
    }
`

export default GhostButton