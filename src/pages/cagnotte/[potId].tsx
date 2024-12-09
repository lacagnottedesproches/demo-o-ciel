import DashNav from "@/components/DashNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LCDPCheckoutDonation, loadLCDP } from "@lacagnottedesproches/lcdp-js";
import { UUID } from "crypto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const lcdpPromise = loadLCDP(process.env.NEXT_PUBLIC_LCDP_PUBKEY || "", {
  api_url: process.env.NEXT_PUBLIC_LCDP_API_URL,
});

export default function CagnotteDonation() {
  const router = useRouter();
  const query = router.query;
  const { status } = useSession();

  return (
    <main className="text-gray-800 flex min-h-screen flex-col">
      <Header />

      <hr />

      <div className="grow container mx-auto">
        <div className="p-5 flex flex-col gap-5">
          {status === "authenticated" ? <DashNav /> : null}

          {query.potId ? (
            <LCDPCheckoutDonation
              potId={query.potId as UUID}
              lcdpPromise={lcdpPromise}
              returnUrl={window.location.href}
              lcdpAppUrl={process.env.NEXT_PUBLIC_LCDP_APP_URL}
            />
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
