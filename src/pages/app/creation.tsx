import FormAccountPot from "@/components/Creation/FormAccountPot";
import OneClick from "@/components/Creation/OneClick";
import Workflow from "@/components/Creation/Workflow";
import DashNav from "@/components/DashNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "./layout";

const DOC_URL = process.env.NEXT_PUBLIC_LCDP_DOC_URL;

export default function App() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

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
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl">
                    {"Créer un compte/cagnotte"}
                  </h1>

                  <p className="text-gray-800">
                    {
                      "Cet espace permet de créer des comptes/cagnottes. Ci-dessous plusieurs méthodes possibles."
                    }
                  </p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="border-t pt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-10">
                    <FormAccountPot />

                    <div className="flex flex-col gap-5">
                      <h2 className="font-bold text-lg">
                        {"Création d'un compte et sa cagnotte avec formulaire."}
                      </h2>
                      <p>
                        {
                          "Utilisation des champs requis uniquement pour la création d'un compte et sa cagnotte."
                        }
                        <br />
                        <br />
                        {"Utilisation de l'API Token Wizard "}
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/tokens/#créer-un-token-wizard`}
                          target="_blank"
                        >{`(/dev/resources/tokens/#créer-un-token-wizard)`}</a>
                        <br />
                        {
                          "Utilisation de l'API Countries pour la liste des pays disponibles. "
                        }
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/countries/`}
                          target="_blank"
                        >{`(/dev/resources/countries)`}</a>
                        <br />
                        {
                          "Utilisation de l'API Categories pour la liste des catégories disponibles. "
                        }
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/categories/`}
                          target="_blank"
                        >{`(/dev/resources/categories)`}</a>
                        <br />
                        <br />
                        {
                          "Note : toutes les implémentations des appels API sont encapsulées par le SDK js."
                        }
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-10">
                    <OneClick />

                    <div className="flex flex-col gap-5">
                      <h2 className="font-bold text-lg">
                        {"Création d'un compte et sa cagnotte en un seul clic."}
                      </h2>
                      <p>
                        {
                          "En utilisant des données générées dynamiquement, la création se réalise au clic d'un seul bouton par l'utilisateur."
                        }
                        <br />
                        <br />
                        {"Utilisation de l'API Token Wizard "}
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/tokens/#créer-un-token-wizard`}
                          target="_blank"
                        >{`(/dev/resources/tokens/#créer-un-token-wizard)`}</a>
                        <br />
                        <br />
                        {
                          "Note : toutes les implémentations des appels API sont encapsulées par le SDK js."
                        }
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-10 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 items-start gap-10">
                    <div className="col-span-2">
                      <Workflow />
                    </div>

                    <div className="flex flex-col gap-5">
                      <h2 className="font-bold text-lg">
                        {
                          "Création d'un compte, puis de sa cagnotte et affichage page donation."
                        }
                      </h2>
                      <p>
                        {"En 3 étapes comme un workflow."}
                        <br />
                        <br />
                        {"Utilisation de l'API Token Account "}
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/tokens/#créer-un-token-account`}
                          target="_blank"
                        >{`(/dev/resources/tokens/#créer-un-token-account)`}</a>
                        <br />
                        {"Utilisation de l'API Token Pot "}
                        <a
                          className="underline text-blue-500"
                          href={`${DOC_URL}/dev/resources/tokens/#créer-un-token-pot`}
                          target="_blank"
                        >{`(/dev/resources/tokens/#créer-un-token-pot)`}</a>
                        <br />
                        <br />
                        {
                          "Note : toutes les implémentations des appels API sont encapsulées par le SDK js."
                        }
                      </p>
                    </div>
                  </div>
                </div>
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
