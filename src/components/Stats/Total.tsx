import Metrics from "./Metrics";

const Total = () => {
  return (
    <div className="flex flex-col gap-2 border rounded p-5">
      <p className="font-bold text-lg">{"Total"}</p>

      <Metrics type_metrics="total" />
    </div>
  );
};

export default Total;
