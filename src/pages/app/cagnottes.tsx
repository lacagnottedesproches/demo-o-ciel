import DashNav from "@/components/DashNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PotsList from "@/components/Pot/PotsList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "./layout";

export default function App() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  const handleOnClickPot = (podId: string) => {
    router.push(`/cagnotte/${podId}`);
  };

  return (
    <Layout>
      {status === "authenticated" ? (
        <main className={`text-gray-800 flex min-h-screen flex-col`}>
          <Header />

          <hr />

          <div className="grow container mx-auto">
            <div className="p-5 flex flex-col gap-5">
              <DashNav />

              <div className="flex flex-col gap-5">
                <PotsList onClickPot={handleOnClickPot} />
              </div>
            </div>
          </div>

          <Footer />
        </main>
      ) : (
        <div></div>
      )}
    </Layout>
  );
}
