"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const NextThemerProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default NextThemerProvider;