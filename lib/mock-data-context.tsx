"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface MockDataContextType {
  useMockData: boolean;
  toggleMockData: () => void;
  setUseMockData: (val: boolean) => void;
}

const MockDataContext = createContext<MockDataContextType>({
  useMockData: true,
  toggleMockData: () => {},
  setUseMockData: () => {},
});

const STORAGE_KEY = "projectkita_use_mock_data";

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [useMockDataState, setUseMockDataState] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "false") {
        setUseMockDataState(false);
      } else if (stored === null) {
        // Explicitly store default true
        localStorage.setItem(STORAGE_KEY, "true");
      }
    } catch {
      // Ignore
    }
  }, []);

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
