import React from "react"

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 9 12" width={9} height={12} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 4H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7V2.5a2.5 2.5 0 0 0-5 0V4zm1 0h3V2.5a1.5 1.5 0 1 0-3 0V4z"
      fill="#C2C2C2"
    />
  </svg>
)

export default LockIcon
