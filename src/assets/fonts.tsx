import { injectGlobal } from 'styled-components'

injectGlobal`
    @font-face {
        font-family: 'artsy-icons';
        src: url("/assets/fonts/artsy-icons.eot?uo9ko");
        src: url("/assets/fonts/artsy-icons.eot?#iefixuo9ko") format('embedded-opentype'), url("/assets/fonts/artsy-icons.woff2?uo9ko") format('woff2'), url("/assets/fonts/artsy-icons.ttf?uo9ko") format('truetype'), url("/assets/fonts/artsy-icons.woff?uo9ko") format('woff'), url("/assets/fonts/artsy-icons.svg?uo9ko#artsy-icons") format('svg');
        font-weight: normal;
        font-style: normal;
    }
`