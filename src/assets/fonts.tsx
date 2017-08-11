import { css } from "styled-components"

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
