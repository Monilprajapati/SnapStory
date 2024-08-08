"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { DNA } from "react-loader-spinner";
import { PostFormData } from "@/utils/types";
import { initialPostFormData } from "@/utils";
import { usePathname, useRouter } from "next/navigation";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
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

  if (session === undefined)
    return (
      <div className="w-screen h-screen mt-56 flex items-center justify-center">
        <DNA
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  if (session === null && pathname === "/create") router.push("/");

  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, formData, setFormData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
