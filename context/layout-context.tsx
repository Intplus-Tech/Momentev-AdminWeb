"use client";

import React, { createContext, useContext, useReducer } from "react";

type LayoutState = {
  sidebarOpen: boolean;
};

type LayoutAction = { type: "TOGGLE" | "CLOSE" };

type LayoutContextType = {
  state: LayoutState;
  dispatch: React.Dispatch<LayoutAction>;
};

const initialState: LayoutState = {
  sidebarOpen: false,
};

function reducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "TOGGLE":
      return { sidebarOpen: !state.sidebarOpen };
    case "CLOSE":
      return { sidebarOpen: false };
    default:
      return state;
  }
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
