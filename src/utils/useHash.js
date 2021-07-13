import { useState, useCallback, useEffect } from "react";
import { useBetween } from "use-between";

const useHashRouter = () => {
  const [hash, setHash] = useState("");

  const syncHash = useCallback(() => {
      console.log(window.location.hash)
    setHash(window.location.hash);
  }, [setHash]);

  useEffect(() => {
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, [syncHash]);

  return {
    hash
  };
};

export const useHash = () => useBetween(useHashRouter);