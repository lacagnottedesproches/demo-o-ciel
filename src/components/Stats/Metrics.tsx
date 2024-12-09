import { formatCurrency } from "@/lib/utils";
import { StatMetric, useLCDP } from "@lacagnottedesproches/lcdp-js";
import { useCallback, useEffect, useState } from "react";
import MetricsShimmer from "./MetricsShimmer";

type Metric = {
  name: string;
  value?: number;
};

type DashboardMetric = {
  [key: string]: Metric & {
    rank?: number;
    currency?: boolean;
    decimal?: boolean;
  };
};

type MetricsProps = {
  type_metrics: "total" | "range";
  ts_start?: number;
  ts_end?: number;
};

const MODEL_METRIC: DashboardMetric = {
  nb_pots: { name: "Nombre de cagnotte(s)", rank: 1 },
  nb_donations: { name: "Nombre de participation(s)", rank: 4 },
  amount_donations: { name: "Montant total collecté", currency: true, rank: 2 },
  amount_moy_donations: {
    name: "Don moyen",
    currency: true,
    decimal: true,
    rank: 3,
  },
};

const Metrics = (props: MetricsProps) => {
  const { type_metrics, ts_start, ts_end } = props;
  const { lcdp, status } = useLCDP();
  const [totalMetrics, setTotalMetrics] = useState<StatMetric | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const loadStatsMetrics = useCallback(async () => {
    if (status !== "success" || !lcdp) {
      return;
    }

    setLoadingData(true);

    try {
      const result = await lcdp.getStatsDashboard(ts_start, ts_end);

      if (type_metrics === "total" && result.total) {
        setTotalMetrics({
          ...result.total,
        });
      } else if (type_metrics === "range" && result.date_range) {
        setTotalMetrics({
          ...result.date_range,
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoadingData(false);
  }, [lcdp, type_metrics, ts_start, ts_end, status]);

  useEffect(() => {
    loadStatsMetrics();
  }, [loadStatsMetrics]);

  return (
    <div className="flex flex-row flew-wrap gap-5">
      {status === "loading" || loadingData ? MetricsShimmer(4) : null}

      {status === "success" &&
        !loadingData &&
        totalMetrics &&
        Object.keys(totalMetrics).map((key) => {
          if (key in MODEL_METRIC) {
            const model = MODEL_METRIC[key];
            return (
              <div
                key={key}
                className="bg-white drop-shadow p-5 rounded flex flex-col gap-5"
              >
                <p className="text-sm">{model.name}</p>
                <p className="text-xl font-bold">
                  {model.currency && model.decimal
                    ? formatCurrency(
                        totalMetrics[key as keyof StatMetric] / 100,
                      )
                    : model.currency
                      ? formatCurrency(
                          totalMetrics[key as keyof StatMetric] / 100,
                          {
                            maxFD: 0,
                          },
                        )
                      : totalMetrics[key as keyof StatMetric]}
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Metrics;
