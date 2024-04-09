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
import { PostFormData } from "@/utils/types";
import { initialPostFormData } from "@/utils";
import { usePathname, useRouter } from "next/navigation";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>,
  formData: PostFormData;
  setFormData: Dispatch<SetStateAction<PostFormData>>;
};

const initialState = {
  loading: false,
  setLoading: () => {},
  formData: initialPostFormData,
  setFormData: () => {},
};

// Creating context for global state
export const GlobalContext = createContext<ContextType>(initialState);

// This is the GlobalProvider component which will wrap the whole application
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialPostFormData);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();


  if (session === undefined) return <Linewave />;
  if (session === null && pathname === "/create") router.push("/");

  return (
    <GlobalContext.Provider value={{ loading, setLoading, formData, setFormData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
