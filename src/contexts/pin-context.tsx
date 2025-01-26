import {
  usePinCreated,
  usePinMutation,
  useGetPin,
  usePinValid,
} from "@/lib/pin";
import { PinContext } from "./pin-context-type";

export function PinProvider({ children }: { children: React.ReactNode }) {
  const isPinCreatedQuery = usePinCreated();
  const pinMutation = usePinMutation();
  const getPinQuery = useGetPin();
  const pinValidation = usePinValid();

  return (
    <PinContext.Provider
      value={{
        isPinCreatedQuery,
        pinMutation,
        getPinQuery,
        pinValidation,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}
