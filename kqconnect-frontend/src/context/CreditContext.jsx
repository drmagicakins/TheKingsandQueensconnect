import { createContext, useState } from "react";

export const CreditContext = createContext();

export function CreditProvider({ children }) {
  const [credits, setCredits] = useState(0);

  const addCredits = (amount) => {
    setCredits((prev) => prev + amount);
  };

  return (
    <CreditContext.Provider value={{ credits, addCredits }}>
      {children}
    </CreditContext.Provider>
  );
}
