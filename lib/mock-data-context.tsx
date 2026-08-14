"use client";

import React, { createContext, useContext, useState } from "react";

interface MockDataContextType {
  useMockData: boolean;
  toggleMockData: () => void;
  setUseMockData: (val: boolean) => void;
}

const MockDataContext = createContext<MockDataContextType>({
  useMockData: false,
  toggleMockData: () => {},
  setUseMockData: () => {},
});

const STORAGE_KEY = "projectkita_use_mock_data";

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [useMockDataState, setUseMockDataState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  function setUseMockData(val: boolean) {
    setUseMockDataState(val);
    try {
      localStorage.setItem(STORAGE_KEY, val ? "true" : "false");
    } catch {
      // Ignore
    }
  }

  function toggleMockData() {
    setUseMockData(!useMockDataState);
  }

  return (
    <MockDataContext.Provider
      value={{
        useMockData: useMockDataState,
        toggleMockData,
        setUseMockData,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  return useContext(MockDataContext);
}
