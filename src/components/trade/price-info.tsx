import { cn } from "@/lib/utils";
import { Num } from "ccxt";
import { useEffect, useState } from "react";
import { TickerWithExchange } from "../search/columns";

export const PriceInfo = ({ data }: { data: TickerWithExchange }) => {
  const { exchange, high, low, last, vwap, quoteVolume } = data;
  const [curPrice, setCur] = useState<{
    price: Num;
    color: "default" | "up" | "down";
  }>({ price: last, color: "default" });

  useEffect(() => {
    if (last) {
      setCur((cur) => {
        if (!cur.price) {
          return { price: last, color: "default" };
        }
        if (cur.price > last) {
          return { price: last, color: "up" };
        }
        if (cur.price < last) {
          return { price: last, color: "down" };
        }
        return cur;
      });
    }
  }, [last]);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="">
        <h1
          className={cn(
            "text-2xl",
            curPrice.color == "up" ? "text-green-600" : "text-red-600",
          )}
        >
          {curPrice.price}
        </h1>
        <span className="flex gap-1">
          <span className="capitalize text-zinc-400">volume</span>
          <span>{quoteVolume}</span>
        </span>
      </div>
      <div className="">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="capitalize text-zinc-400">24High</span>
          <span>{high}</span>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <span className="capitalize text-zinc-400">24Low</span>
          <span>{low}</span>
        </div>
        {exchange == "bybit" ? (
          <div className="flex w-full items-center justify-between gap-2">
            <span className="capitalize text-zinc-400">24Turnover</span>
            <span>{data.info.turnover24h}</span>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-2">
            <span className="capitalize text-zinc-400">vwap</span>
            <span>{vwap}</span>
          </div>
        )}
      </div>
    </div>
  );
};
