import { useState, useCallback } from "react";
import { ChartContainer } from "./chart-container";
import { DeepPartial, ChartOptions } from "lightweight-charts";

interface ChartProps {
  layout?: DeepPartial<ChartOptions["layout"]>;
  grid?: DeepPartial<ChartOptions["grid"]>;
  timeScale?: DeepPartial<ChartOptions["timeScale"]>;
  rightPriceScale?: DeepPartial<ChartOptions["rightPriceScale"]>;
  children?: React.ReactNode;
}

export const Chart = (props: ChartProps) => {
  const [container, setContainer] = useState<HTMLDivElement | false>(false);
  const handleRef = useCallback(
    (ref: HTMLDivElement | null) => setContainer(ref || false),
    [],
  );
  return (
    <div ref={handleRef} className="w-full h-64 rounded-md overflow-hidden">
      {container && <ChartContainer {...props} container={container} />}
    </div>
  );
};
