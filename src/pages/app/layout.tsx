import { LCDPProvider, loadLCDP } from "@lacagnottedesproches/lcdp-js";
import { ReactNode } from "react";

const LCDP_PUBKEY = process.env.NEXT_PUBLIC_LCDP_PUBKEY;
const LCDP_API_URL = process.env.NEXT_PUBLIC_LCDP_API_URL;

// Use loadLCDP to initialize LCDP and get a Promise that will result to an instance of LCDP object.
// LCDP object is your entrypoint to the rest of the LCDP SDK.
// Your publishable API key is required.
// By default, the SDK will use the production API base URL.
// In this context, we pass the developmenet API base URL (https://dev-api.lacagnottedesproches.fr)
const lcdpPromise = loadLCDP(LCDP_PUBKEY || "", {
  api_url: LCDP_API_URL,
});

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return <LCDPProvider lcdp={lcdpPromise}>{children}</LCDPProvider>;
};

export default Layout;
