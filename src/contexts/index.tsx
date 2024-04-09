"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Linewave from "@/components/Spinner/Linewave";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  loading: false,
  setLoading: () => {},
};

// Creating context for global state
export const GlobalContext = createContext<ContextType>(initialState);

// This is the GlobalProvider component which will wrap the whole application
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  if (session === undefined) return <Linewave />;

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
