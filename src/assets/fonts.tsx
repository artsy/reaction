import { css, injectGlobal } from "styled-components"

injectGlobal`
  @font-face {
    font-family: 'artsy-icons';
    src: url("/assets/fonts/artsy-icons.eot?uo9ko");
    src: url("/assets/fonts/artsy-icons.eot?#iefixuo9ko") format('embedded-opentype'),
         url("/assets/fonts/artsy-icons.woff2?uo9ko") format('woff2'),
         url("/assets/fonts/artsy-icons.ttf?uo9ko") format('truetype'),
         url("/assets/fonts/artsy-icons.woff?uo9ko") format('woff'),
         url("/assets/fonts/artsy-icons.svg?uo9ko#artsy-icons") format('svg');
    font-weight: normal;
    font-style: normal;
  }
`

const primaryFontFamily = `
  'ITC Avant Garde Gothic W04',
  'AvantGardeGothicITCW01D 731075',
  'AvantGardeGothicITCW01Dm',
  'Helvetica',
  'sans-serif'
`

export const primary = {
  fontFamily: primaryFontFamily,
  style: css`
    font-family: ${primaryFontFamily};
    -webkit-font-smoothing: antialiased;
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
}

const secondaryFontFamily = `
  'Adobe Garamond W08',
  'adobe-garamond-pro',
  'AGaramondPro-Regular',
  'Times New Roman',
  'Times',
  'serif'
`

export const secondary = {
  fontFamily: secondaryFontFamily,
  style: css`
    font-family: ${secondaryFontFamily};
    -webkit-font-smoothing: antialiased;
  `,
}
