import { Fragment } from "react";

const randomWidthSize = [32, 40, 52, 60];

const MetricsShimmer = (nbElement: number = 5) => {
  /**
   * Shimmer loading effect that display few metrics.
   **/
  return (
    <Fragment>
      {Array.from(Array(nbElement).keys()).map((_, idx: number) => {
        return (
          <div
            key={idx}
            className={`animate-pulse bg-gray-50 drop-shadow p-5 rounded flex flex-col gap-5 w-${randomWidthSize[Math.floor(Math.random() * 4) + 0]}`}
          >
            <p className="text-sm h-3 bg-gray-100 w-full"></p>
            <p
              className={`w-${Math.floor(Math.random() * 5) + 1}/5 text-xl font-bold h-10 bg-gray-300`}
            ></p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default MetricsShimmer;
