import { createContext, useContext, useEffect, useState } from "react";
import { initialize, ZoKratesProvider } from "zokrates-js";

type Value = ZoKratesProvider | undefined;
const ZokratesContext = createContext<Value>(undefined);

export default function ZokratesProvider({ children }) {
  const [zk, setZk] = useState<ZoKratesProvider>();
  useEffect(() => {
    initialize().then((zk) => {
      setZk(zk);
    });
  }, []);

  return (
    <ZokratesContext.Provider value={zk}>{children}</ZokratesContext.Provider>
  );
}

export const useZokrates = () => {
  const zk = useContext(ZokratesContext);
  return zk;
};
