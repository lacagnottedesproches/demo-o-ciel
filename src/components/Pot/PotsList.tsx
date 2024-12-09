import { Pot, useLCDP } from "@lacagnottedesproches/lcdp-js";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import PotItem from "./PotItem";
import PotShimmer from "./PotShimmer";

const PotsList = (props: { onClickPot?: (podId: string) => void }) => {
  const { onClickPot } = props;
  const { lcdp, status } = useLCDP();
  const [pots, setPots] = useState<Pot[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const loadPots = useCallback(async () => {
    if (status !== "success" || !lcdp) {
      return;
    }

    setLoadingData(true);

    try {
      // We use the async function getPots to retrieve Pots bounds to the API keys.
      // We can't get pots from others accounts.
      const result = await lcdp.getPots({ page: 1, per_page: 50 });
      setPots(result.items);
    } catch (error) {
      console.error(error);
    }
    setLoadingData(false);
  }, [lcdp, status]);

  const handleOnClickPot = (e: MouseEvent, potId: string) => {
    e.preventDefault();
    onClickPot?.(potId);
  };

  useEffect(() => {
    loadPots();
  }, [loadPots]);

  return (
    <div className="flex flew-row flex-wrap gap-5">
      {status === "loading" || loadingData ? PotShimmer(20) : null}

      {status === "success" &&
        !loadingData &&
        pots.map((pot) => {
          return (
            <PotItem key={pot.id} pot={pot} onClickPot={handleOnClickPot} />
          );
        })}
    </div>
  );
};

export default PotsList;
