import { formatCurrency } from "@/lib/utils";
import { Pot } from "@lacagnottedesproches/lcdp-js";
import Image from "next/image";
import { MouseEvent } from "react";

const PotItem = (props: {
  pot: Pot;
  onClickPot?: (e: MouseEvent, potId: string) => void;
}) => {
  /**
   * PotItem is the component that render informations for a Pot.
   **/
  const { pot, onClickPot } = props;

  return (
    <article
      key={pot.id}
      className="max-w-64 bg-white shadow-lg rounded-2xl flex flex-col gap-3 hover:cursor-pointer"
      onClick={(e) => onClickPot?.(e, pot.id)}
    >
      <figure className="relative self-center rounded-2xl drop-shadow overflow-hidden">
        {pot.visual_main_url ? (
          <Image
            className="object-cover"
            width={300}
            height={300}
            src={pot.visual_main_url}
            alt="image"
          />
        ) : (
          <Image
            className="object-cover"
            width={300}
            height={300}
            src={"/empty-state-noimages-2.webp"}
            alt="image"
          />
        )}
      </figure>

      <div className="px-2 pb-3 flex flex-col gap-1">
        <h2 className="font-semibold text-gray-700 text-lg">{pot.name}</h2>

        {pot.stat_amount_donation ? (
          <p className="font-bold text-xl">
            {formatCurrency(pot.stat_amount_donation / 100.0, {
              maxFD: 0,
            })}
          </p>
        ) : null}

        {pot.stat_nb_donation > 0 ? (
          <p className="text-sm">{`${pot.stat_nb_donation} don${pot.stat_nb_donation > 1 ? "s" : ""}`}</p>
        ) : null}
      </div>
    </article>
  );
};

export default PotItem;
