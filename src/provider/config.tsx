"use client";

import React, { Suspense } from "react";
import { Toaster } from "sonner";
import ReactQueryProvider from "./react-query-provider";

const Config = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <ReactQueryProvider>
        {children}
        <Toaster
          className='toaster pointer-events-auto [&[data-close-button="true"]]:right-0'
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />
      </ReactQueryProvider>
    </Suspense>
  );
};

export default Config;
