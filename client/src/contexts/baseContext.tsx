/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type TBaseContext = {
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BaseContext = React.createContext<TBaseContext | null>(null)
