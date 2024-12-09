import Image from "next/image";
import { Fragment } from "react";

const PotShimmer = (nbElement: number = 5) => {
  /**
   * Shimmer loading effect that display few informations for a Pot.
   **/
  return (
    <Fragment>
      {Array.from(Array(nbElement).keys()).map((_, idx: number) => {
        return (
          <article
            key={idx}
            className="animate-pulse bg-white shadow-lg rounded-2xl flex flex-col gap-3 hover:cursor-pointer"
          >
            <figure className="relative self-center rounded-2xl drop-shadow overflow-hidden">
              <Image
                className="object-cover h-auto"
                width={300}
                height={300}
                src={"/empty-state-noimages-2.webp"}
                alt="image"
              />
            </figure>

            <div className="px-2 pb-3 flex flex-col gap-1">
              <h2 className="font-semibold text-gray-700 text-lg"></h2>
              <p className="font-bold text-xl h-3 bg-gray-100"></p>
              <p className="text-sm h-3 bg-gray-100"></p>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
};

export default PotShimmer;
