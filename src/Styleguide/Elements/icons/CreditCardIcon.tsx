import React from "react"

// https://stripe.com/docs/api#card_object-brand
export type CreditCardType =
  | "MasterCard"
  | "Visa"
  | "Discover"
  | "American Express"
  | "Unknown"

export const CreditCardIcon = ({
  type,
  ...others
}: React.SVGProps<SVGSVGElement> & {
  type?: CreditCardType | string
}) => {
  switch (type) {
    case "MasterCard":
      return <MastercardIcon {...others} />
    case "Visa":
      return <VisaIcon {...others} />
    case "Discover":
      return <DiscoverIcon {...others} />
    case "American Express":
      return <AmexIcon {...others} />
    case "Unknown":
    default:
      return <FallbackIcon {...others} />
  }
}

const AmexIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    {...props}
  >
    <defs>
      <rect id="a" width={30} height={20} rx={2} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#EFEFEF" xlinkHref="#a" />
      <rect width={29} height={19} x={0.5} y={0.5} stroke="#E5E5E5" rx={2} />
      <g fill="#4DB3FF">
        <path d="M9.999 11A.999.999 0 0 0 9 12.01v1.98A1 1 0 0 0 9.999 15H30v-4H9.999zM0 6v4h20.001A.999.999 0 0 0 21 8.99V7.01A.999.999 0 0 0 20.001 6H0z" />
      </g>
    </g>
  </svg>
)

const DiscoverIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    {...props}
  >
    <defs>
      <rect id="a" width={30} height={20} rx={2} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#EFEFEF" xlinkHref="#a" />
      <rect width={29} height={19} x={0.5} y={0.5} stroke="#E5E5E5" rx={2} />
      <path
        fill="#FFB44F"
        d="M12 20h16.005A1.992 1.992 0 0 0 30 18.002V12l-18 8z"
      />
      <rect width={20} height={3} x={5} y={5} fill="#D4D4D4" rx={1.5} />
    </g>
  </svg>
)

const FallbackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    {...props}
  >
    <defs>
      <rect id="a" width={30} height={20} rx={2} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#EFEFEF" xlinkHref="#a" />
      <rect width={29} height={19} x={0.5} y={0.5} stroke="#E5E5E5" rx={2} />
      <rect width={20} height={3} x={5} y={5} fill="#D4D4D4" rx={1.5} />
      <rect width={7} height={3} x={5} y={10} fill="#D4D4D4" rx={1.5} />
    </g>
  </svg>
)

const MastercardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <rect
        width={29}
        height={19}
        x={0.5}
        y={0.5}
        fill="#EFEFEF"
        stroke="#E5E5E5"
        rx={2}
      />
      <g transform="translate(6 5)">
        <circle cx={13} cy={5} r={5} fill="#FFB44F" />
        <circle cx={5} cy={5} r={5} fill="#CE4747" />
        <path
          fill="#D6765F"
          d="M9 8a4.977 4.977 0 0 1-1-3c0-1.126.372-2.164 1-3 .628.836 1 1.874 1 3a4.977 4.977 0 0 1-1 3z"
        />
      </g>
    </g>
  </svg>
)
const VisaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    {...props}
  >
    <defs>
      <rect id="a" width={30} height={20} rx={2} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#EFEFEF" xlinkHref="#a" />
      <rect width={29} height={19} x={0.5} y={0.5} stroke="#E5E5E5" rx={2} />
      <path
        fill="#FFB44F"
        d="M0 14v4.002C0 19.106.898 20 1.992 20h26.016c1.1 0 1.992-.898 1.992-1.998V14H0z"
      />
      <path
        fill="#4287CB"
        d="M1.992 0C.892 0 0 .898 0 1.998V6h30V1.998A1.999 1.999 0 0 0 28.008 0H1.992z"
      />
    </g>
  </svg>
)
