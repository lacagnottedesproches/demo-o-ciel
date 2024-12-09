import { generateFakePotData, generateFakeUserData } from "@/lib/utils";
import {
  AccountAndPotCreated,
  PayloadAccountAndPot,
  useLCDP,
} from "@lacagnottedesproches/lcdp-js";
import { useState } from "react";
import BannerLCDP from "../BannerLCDP";

const OneClick = () => {
  const { lcdp } = useLCDP();

  const [processingRequest, setProcessingRequest] = useState<boolean>(false);
  const [dataManual, setDataManual] = useState({
    ...generateFakeUserData(),
    ...generateFakePotData(),
  });

  const handleGenerateNewData = () => {
    setDataManual({
      ...generateFakeUserData(),
      ...generateFakePotData(),
    });
  };

  const handleOnClickCreateWizard = async () => {
    if (!lcdp) {
      return;
    }
    try {
      setProcessingRequest(true);
      const dataAccountAndPot: PayloadAccountAndPot = {
        ...dataManual,
      };
      const token = await lcdp.createTokenAccountAndPot(dataAccountAndPot);
      // Here we do a request to the backend. Then the backend will call the LCDP API.
      const response = await fetch("/api/wizards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const data: AccountAndPotCreated = await response.json();
      if (data && data.pot && data.pot.pot_id) {
        alert("Compte Cagnotte créé avec succès !");
      }
    } catch (error) {
      alert(`Une erreur est survenue. ${error}`);
    } finally {
      setProcessingRequest(false);
    }
  };

  return (
    <div className="bg-white drop-shadow p-5 rounded flex flex-col gap-5 items-center w-full">
      <div className="flex flex-row items-center gap-5 text-sm">
        <p className="text-gray-500">
          {
            "Avec des données aléatoires, cliquer sur le singe pour générer de nouvelles données"
          }
        </p>
        <button
          onClick={handleGenerateNewData}
          type="button"
          className="rounded-full bg-white drop-shadow p-3 text-lg"
        >
          🙈
        </button>
      </div>

      <div className="flex flex-col w-full overflow-x-auto">
        <pre className="text-xs">{`${JSON.stringify(dataManual, null, 2)}`}</pre>
      </div>

      <button
        onClick={() => handleOnClickCreateWizard()}
        type="button"
        className="bg-yellow-500 text-white font-bold w-full px-3 py-2 rounded"
        disabled={processingRequest}
      >
        {processingRequest ? (
          <span>...</span>
        ) : (
          <span>{"Créer un compte + cagnotte en 1 click"}</span>
        )}
      </button>

      <BannerLCDP />
    </div>
  );
};

export default OneClick;
