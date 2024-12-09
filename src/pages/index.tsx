import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import heroImg from "../../public/dan-meyers-f1WMJR8pLqo-unsplash.jpg";

export default function Home() {
  return (
    <main className={`text-gray-800 flex min-h-screen flex-col`}>
      <Header />

      <section className="relative flex flex-col items-center justify-center h-40 lg:h-80">
        <Image
          className="object-cover"
          src={heroImg}
          alt="hero"
          fill={true}
          priority
        />
        <div className="absolute h-full w-full bg-gray-500 opacity-60 top-0 bottom-0 left-0 right-0"></div>
        <h1 className="relative text-3xl lg:text-5xl font-bold font-serif text-center">
          {"Services Funéraires"}
        </h1>
        <p className="absolute z-50 bottom-1 right-1 text-xs ">
          Photo de{" "}
          <a href="https://unsplash.com/fr/@dmey503?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Dan Meyers
          </a>{" "}
          sur{" "}
          <a href="https://unsplash.com/fr/photos/nuages-blancs-f1WMJR8pLqo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </p>
      </section>

      <section className="container mx-auto">
        <div className="p-5 flex flex-col gap-5 items-center">
          <p className="p-5 max-w-screen-md text-center">
            {
              "Nous comprenons que perdre un être cher est une épreuve difficile et bouleversante. Nous nous engageons à vous soutenir dans ces moments de douleur en offrant des services funéraires complets et personnalisés, conçus pour honorer dignement la mémoire de votre proche."
            }
          </p>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="p-5 flex flex-col gap-10">
          <h2 className="text-2xl lg:text-3xl font-bold font-serif text-center">
            {"Nos services"}
          </h2>

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5 items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col gap-2">
              <div className="font-semibold font-serif text-xl">
                {"Funérailles Personnalisées"}
              </div>
              <div>
                {
                  "Chaque personne est unique, et nous croyons que chaque cérémonie doit l'être aussi. Nos conseillers expérimentés travaillent avec vous pour créer des funérailles qui reflètent la vie, les valeurs et les souhaits de votre être cher. De la sélection du cercueil ou de l'urne aux choix musicaux et floraux, nous nous occupons de tous les détails pour que vous puissiez vous concentrer sur ce qui est vraiment important."
                }
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold font-serif text-xl">
                {"Crémation et Inhumation"}
              </div>
              <div>
                {
                  "Nous offrons des options de crémation et d'inhumation respectant les souhaits du défunt et les traditions familiales. Nos services de crémation sont effectués avec le plus grand soin, et nous proposons une variété de solutions pour la disposition des cendres, y compris des urnes personnalisées et des jardins du souvenir. Pour l'inhumation, nous offrons des parcelles dans des cimetières paisibles et bien entretenus."
                }
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold font-serif text-xl">
                {"Assistance Administrative"}
              </div>
              <div>
                {
                  "Les démarches administratives peuvent être accablantes en période de deuil. Notre équipe vous guide et vous assiste dans toutes les procédures nécessaires, y compris les déclarations de décès, les demandes de prestations et les arrangements avec les autorités locales."
                }
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-serif font-semibold text-xl">
                {"Soutien Psychologique"}
              </div>
              <div>
                {
                  "Le deuil est un processus complexe et personnel. Nous proposons des services de soutien psychologique pour vous aider à traverser cette période difficile. Nos conseillers sont disponibles pour offrir écoute et réconfort, et nous pouvons vous orienter vers des groupes de soutien et des ressources adaptées à vos besoins."
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
