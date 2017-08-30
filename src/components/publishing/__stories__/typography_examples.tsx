import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

function Typography() {
  return (
    <div>
      <GaramondS50>
        Garamond s50: 50px / 1.1em
      </GaramondS50>
      <GaramondS40>
        Garamond s40: 40px / 1.1em
      </GaramondS40>
      <GaramondS37>
        Garamond s37: 37px / 1.2em
      </GaramondS37>
      <GaramondS34>
        Garamond s34: 34px / 1.5em
      </GaramondS34>
      <GaramondS30>
        Garamond s30: 30px / 1.25em
      </GaramondS30>
      <GaramondS28>
        Garamond s28: 28px / 1.5em
      </GaramondS28>
      <GaramondS23>
        Garamond s23: 23px / 1.5em
      </GaramondS23>
      <GaramondS19>
        Garamond s19: 19px / 1.1em
      </GaramondS19>
      <GaramondS17>
        Garamond s17: 17px / 1.1em
      </GaramondS17>
      <GaramondS15>
        Garamond s15: 15px / 1.25em
      </GaramondS15>
      <hr />
      <br />
      <AvantGardeS13>
        Avant Garde s13: 13px / 1.65em
      </AvantGardeS13>
      <AvantGardeS11>
        Avant Garde s11: 11px / 1.65em
      </AvantGardeS11>
      <hr />
      <UnicaS130>
        Unica s130: 130px / 1.1em
      </UnicaS130>
      <UnicaS100>
        Unica s100: 100px / 1.1em
      </UnicaS100>
      <UnicaS80>
        Unica s80: 80px / 1.1em
      </UnicaS80>
      <UnicaS65>
        Unica s65: 65px / 1em
      </UnicaS65>
      <UnicaS45>
        Unica s45: 45px / 1.1em
      </UnicaS45>
      <UnicaS40>
        Unica s40: 40px / 1.1em
      </UnicaS40>
      <UnicaS34>
        Unica s34: 34px / 1.1em
      </UnicaS34>
      <UnicaS32>
        Unica s32: 32px / 1.1em
      </UnicaS32>
      <UnicaS19>
        Unica s19: 19px / 1.5em
      </UnicaS19>
      <UnicaS16>
        Unica s16: 16px / 1.1em
      </UnicaS16>
      <UnicaS14>
        Unica s14: 14px / 1.1em
      </UnicaS14>
      <UnicaS12>
        Unica s12: 12px / 1.1em
      </UnicaS12>
    </div>
  )
}
export default Typography

const GaramondS15 = styled.div`
  ${Fonts.garamond("s15")}
  margin-bottom: 20px;
`
const GaramondS17 = styled.div`
  ${Fonts.garamond("s17")}
  margin-bottom: 20px;
`
const GaramondS19 = styled.div`
  ${Fonts.garamond("s19")}
  margin-bottom: 20px;
`
const GaramondS23 = styled.div`
  ${Fonts.garamond("s23")}
  margin-bottom: 20px;
`
const GaramondS28 = styled.div`
  ${Fonts.garamond("s28")}
  margin-bottom: 20px;
`
const GaramondS30 = styled.div`
  ${Fonts.garamond("s30")}
  margin-bottom: 20px;
`
const GaramondS34 = styled.div`
  ${Fonts.garamond("s34")}
  margin-bottom: 20px;
`
const GaramondS37 = styled.div`
  ${Fonts.garamond("s37")}
  margin-bottom: 20px;
`
const GaramondS40 = styled.div`
  ${Fonts.garamond("s40")}
  margin-bottom: 20px;
`
const GaramondS50 = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 20px;
`

const AvantGardeS11 = styled.div`
  ${Fonts.avantgarde("s11")}
  margin-bottom: 20px;
`
const AvantGardeS13 = styled.div`
  ${Fonts.avantgarde("s13")}
  margin-bottom: 20px;
`

const UnicaS12 = styled.div`
  ${Fonts.unica("s12")}
  margin-bottom: 20px;
`
const UnicaS14 = styled.div`
  ${Fonts.unica("s14")}
  margin-bottom: 20px;
`
const UnicaS16 = styled.div`
  ${Fonts.unica("s16")}
  margin-bottom: 20px;
`
const UnicaS19 = styled.div`
  ${Fonts.unica("s19")}
  margin-bottom: 20px;
`
const UnicaS32 = styled.div`
  ${Fonts.unica("s32")}
  margin-bottom: 20px;
`
const UnicaS34 = styled.div`
  ${Fonts.unica("s34")}
  margin-bottom: 20px;
`
const UnicaS40 = styled.div`
  ${Fonts.unica("s40")}
  margin-bottom: 20px;
`
const UnicaS45 = styled.div`
  ${Fonts.unica("s45")}
  margin-bottom: 20px;
`
const UnicaS65 = styled.div`
  ${Fonts.unica("s65")}
  margin-bottom: 20px;
`
const UnicaS80 = styled.div`
  ${Fonts.unica("s80")}
  margin-bottom: 20px;
`
const UnicaS100 = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 20px;
`
const UnicaS130 = styled.div`
  ${Fonts.unica("s130")}
  margin-bottom: 20px;
`
