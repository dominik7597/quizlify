import React, { createContext, useState, useContext, useEffect } from "react";

export const stateContext = createContext();

const getFreshContext = () => {
  if (localStorage.getItem("context") === null)
    localStorage.setItem(
      "context",
      JSON.stringify({
        // dane które będą dostępne globalnie w aplikacji
        userId: 0,
        timeTaken: 0,
        selectedOptions: [],
      })
    );
  return JSON.parse(localStorage.getItem("context"));
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    resetContext: () => {
      localStorage.removeItem("context");
      setContext(getFreshContext());
    },
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  // funkcja jest wywoływana przy zmianie w [] - context
  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context]);

  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}
