import React from "react"

export type CreditCardType = "mastercard" | "visa" | "other"

export const CreditCardIcon = ({
  type,
  ...others
}: React.SVGProps<SVGSVGElement> & {
  type?: CreditCardType
}) => {
  switch (type) {
    case "mastercard":
      return <MastercardIcon {...others} />
    case "visa":
      return <VisaIcon {...others} />
    default:
      return <GenericIcon {...others} />
  }
}

const VisaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 29 19" width="29" height="19" {...props}>
    <path
      fill="#EFEFEF"
      stroke="#E5E5E5"
      d="M2 .5h25A1.5 1.5 0 0 1 28.5 2v15a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 17V2A1.5 1.5 0 0 1 2 .5z"
    />
    <path
      fill="#F7B600"
      fillRule="evenodd"
      d="M0 14v3a2 2 0 0 0 2 2h25a2 2 0 0 0 2-2v-3H0z"
      clipRule="evenodd"
    />
    <path
      fill="#1A1F70"
      fillOpacity=".68"
      fillRule="evenodd"
      d="M0 5h29V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v3z"
      clipRule="evenodd"
    />
    <path fill="#5E6299" fillOpacity=".6" d="M8 8h15l-1 3H7l1-3z" />
  </svg>
)

const MastercardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 29 19" width="29" height="19" {...props}>
    <path
      fill="#EFEFEF"
      stroke="#E5E5E5"
      d="M2 .5h25A1.5 1.5 0 0 1 28.5 2v15a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 17V2A1.5 1.5 0 0 1 2 .5z"
    />
    <path fill="#FFB44F" d="M18.5 14.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
    <path fill="#CE4747" d="M10.5 14.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
    <path
      fill="#D6765F"
      fillRule="evenodd"
      d="M14.5 12.5a4.977 4.977 0 0 1-1-3c0-1.126.372-2.164 1-3 .628.836 1 1.874 1 3a4.977 4.977 0 0 1-1 3z"
      clipRule="evenodd"
    />
  </svg>
)

const GenericIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 29 19" width="29" height="19" {...props}>
    <path
      fill="#EFEFEF"
      stroke="#E5E5E5"
      d="M2 .5h25A1.5 1.5 0 0 1 28.5 2v15a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 17V2A1.5 1.5 0 0 1 2 .5z"
    />
    <path fill="#848DA5" fillOpacity=".76" d="M0 4h29v3H0z" />
    <path fill="#B3B9CA" fillOpacity=".73" d="M4 10h13v3H4z" />
  </svg>
)
