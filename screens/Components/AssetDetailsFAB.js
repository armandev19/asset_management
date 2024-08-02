import React, { createContext, useState, useContext } from 'react';

const FABContext = createContext();

export const useFAB = () => useContext(FABContext);

export const FABProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showFAB = () => setIsVisible(true);
  const hideFAB = () => setIsVisible(false);

  return (
    <FABContext.Provider value={{ isVisible, showFAB, hideFAB }}>
      {children}
    </FABContext.Provider>
  );
};