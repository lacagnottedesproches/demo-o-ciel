import { generateFakePotData, generateFakeUserData } from "@/lib/utils";
import {
  AccountCreated,
  LCDP,
  LCDPCheckoutDonation,
  PayloadAccount,
  PotCreated,
  useLCDP,
} from "@lacagnottedesproches/lcdp-js";
import { UUID } from "crypto";
import { useState } from "react";

const APP_URL = process.env.NEXT_PUBLIC_LCDP_APP_URL;

const Workflow = () => {
  const { lcdp } = useLCDP();

  const [userAccountId, setUserAccountId] = useState<string | null>(null);
  const [potId, setPotId] = useState<string | null>(null);
  const [dataAccountAlone, setDataAccountAlone] = useState({
    ...generateFakeUserData(),
  });

  const [processingRequest, setProcessingRequest] = useState<boolean>(false);

  const handleGenerateNewData = () => {
    setDataAccountAlone({
      ...generateFakeUserData(),
    });
  };

  const handleOnClickCreateAccount = async () => {
    if (!lcdp) {
      return;
    }
    try {
      setProcessingRequest(true);
      const dataAccount: PayloadAccount = {
        ...dataAccountAlone,
      };
      const token = await lcdp.createTokenAccount(dataAccount);
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const data_acct: AccountCreated = await response.json();
      if (data_acct && data_acct.acct_id) {
        setUserAccountId(data_acct.acct_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingRequest(false);
    }
  };

  const handleOnClickCreatePot = async () => {
    if (!lcdp || !userAccountId) {
      return;
    }
    try {
      setProcessingRequest(true);
      const exampleData = {
        acct_id: userAccountId,
        ...generateFakePotData(),
      };
      const token = await lcdp.createTokenPot(exampleData);
      // Here we do a request to the backend. Then the backend will call the LCDP API.
      const response = await fetch("/api/pots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const data: PotCreated = await response.json();
      if (data && data.pot_id) {
        setPotId(data.pot_id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingRequest(false);
    }
  };

  const createLCDPPromise = (): Promise<LCDP | null> => {
    return new Promise((resolve, reject) => {
      if (lcdp) {
        resolve(lcdp);
      } else {
        reject(null);
      }
    });
  };

  return (
    <div className="bg-white drop-shadow p-5 rounded flex flex-col gap-5 items-center w-full">
      <div
        className={`${userAccountId ? "opacity-15" : ""} flex flex-row items-center gap-5 text-sm`}
      >
        <p className="text-gray-500">
          {
            "Avec des données aléatoires, cliquer sur le singe pour générer de nouvelles données"
          }
        </p>
        <button
          disabled={userAccountId ? true : false}
          onClick={handleGenerateNewData}
          type="button"
          className="rounded-full bg-white drop-shadow p-3 text-lg"
        >
          🙈
        </button>
      </div>

      <div
        className={`${userAccountId ? "opacity-15" : ""} flex flex-col w-full overflow-x-auto`}
      >
        <pre className="text-xs">{`${JSON.stringify(dataAccountAlone, null, 2)}`}</pre>
      </div>

      <div className={`flex flex-row gap-2 `}>
        {!userAccountId ? (
          <button
            onClick={() => handleOnClickCreateAccount()}
            disabled={processingRequest || (userAccountId ? true : false)}
            type="button"
            className="bg-yellow-500 p-2 rounded text-white font-medium"
          >
            {processingRequest ? (
              <span>...</span>
            ) : (
              <span>{"Créer un compte uniquement"}</span>
            )}
          </button>
        ) : null}

        {userAccountId && !potId ? (
          <div className="flex flex-col gap-5 items-center">
            <p>{"Compte créé !"}</p>
            <button
              onClick={() => handleOnClickCreatePot()}
              type="button"
              className="bg-yellow-500 p-2 rounded text-white font-medium"
              disabled={processingRequest}
            >
              {processingRequest ? (
                <span>...</span>
              ) : (
                <span>{"Créer une cagnotte"}</span>
              )}
            </button>
          </div>
        ) : null}
      </div>

      {potId ? (
        <div className="flex flex-col gap-5 items-center">
          <p>{"Cagnotte créée, effectuez votre premier don ci-dessous !"}</p>
          <LCDPCheckoutDonation
            potId={potId as UUID}
            lcdpPromise={createLCDPPromise()}
            returnUrl={window.location.href}
            lcdpAppUrl={APP_URL}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Workflow;
