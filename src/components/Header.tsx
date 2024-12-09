import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { status } = useSession();

  const renderActionButton = () => {
    if (status === "authenticated") {
      return (
        <div className="flex flex-row items-center gap-5">
          {router.pathname !== "/app" ? (
            <Link href="/app">{"Dashboard"}</Link>
          ) : null}
          <button onClick={() => signOut()}>{"Se déconnecter"}</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link href="/login">{"Se connecter"}</Link>
        </div>
      );
    }
  };

  return (
    <header>
      <div className="container mx-auto p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flew-row gap-5">
            <div className="text-xl lg:text-3xl font-semibold">
              <Link href="/">{"o-ciel"}</Link>
            </div>
          </div>
          {router.pathname != "/login" ? renderActionButton() : null}
        </div>
      </div>
      <div className="flex flex-col items-center py-1">
        <div className="rounded p-3 bg-white text-center lg:text-left drop-shadow">
          <p className="font-bold text-gray-700">
            {"Ce site est une démo pour "}
            <span className="text-yellow-500">
              <a href="https://lacagnottedesproches.fr">
                {"La Cagnotte des Proches"}
              </a>
            </span>
            {". Ce n'est pas un produit réel."}
          </p>
        </div>
      </div>
    </header>
  );
}
