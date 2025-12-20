import { PrivyClientConfig } from "@privy-io/react-auth"
import { liskSepolia } from "wagmi/chains"

export const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "dark",
    accentColor: "#3BA3FF",
  },
  loginMethods: ["email", "google", "wallet"],
  defaultChain: liskSepolia,
  supportedChains: [liskSepolia],
  embeddedWallets: {
    ethereum: {
      createOnLogin: "users-without-wallets",
    },
  },
}
