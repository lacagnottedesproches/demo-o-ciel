import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      <div className="container mx-auto p-5">
        <div className="py-10 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center">
            {router.pathname === "/" ? (
              <p className="text-gray-400 text-sm">
                {"Contenu généré par ChatGPT"}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
