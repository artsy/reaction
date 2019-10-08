import { Link, LockIcon } from "@artsy/palette"
import React from "react"
import { TrustSignal } from "./TrustSignal"

export const SecurePayment = () => (
  <TrustSignal
    Icon={<LockIcon />}
    label="Secure payment"
    description={
      <>
        {"Secure transactions by credit card through Stripe."}{" "}
        <Link href="">Learn more</Link>
        {"."}
      </>
    }
  />
)
