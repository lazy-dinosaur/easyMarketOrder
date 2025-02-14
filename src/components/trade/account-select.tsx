import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrade } from "@/contexts/trade/use";
import { useSearchParams } from "react-router";

export const AccountSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { exchangeAccounts, accountsBalance, isAccountsLoading } = useTrade();
  const id = searchParams.get("id");

  if (isAccountsLoading) {
    return (
      <div className="w-24 h-lg:w-28 h-xl:w-32 h-5 h-lg:h-6 h-xl:h-8">
        <Skeleton className="h-4 h-lg:h-6 h-xl:h-8 w-full rounded-md" />
      </div>
    );
  }

  return (
    <Select
      value={id ? id : undefined}
      onValueChange={(value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("id", value);
        setSearchParams(newParams);
      }}
    >
      <SelectTrigger
        className="w-24 h-lg:w-28 h-xl:w-32 h-5 h-lg:h-6 h-xl:h-8"
        disabled={!exchangeAccounts || exchangeAccounts.length == 0}
      >
        <SelectValue
          placeholder={
            exchangeAccounts && exchangeAccounts.length > 0
              ? "Account"
              : "No Account"
          }
        />
      </SelectTrigger>
      <SelectContent className="max-h-[30vh]">
        {exchangeAccounts && exchangeAccounts.length > 0 && (
          <SelectGroup>
            {exchangeAccounts.map((account) => {
              const { id } = account;
              const totalBalance =
                accountsBalance && accountsBalance[id]?.balance?.usd?.total;
              return (
                <div key={id}>
                  <SelectItem className="h-7" value={id}>
                    {account.name}
                  </SelectItem>
                  <div className="text-sm text-muted-foreground px-2">
                    <span>Total: ${totalBalance?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              );
            })}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};
