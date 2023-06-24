import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [value, setValue] = useState({
    keyword: "",
    result: [],
  });
  return (
    <SearchContext.Provider value={[value, setValue]}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  return useContext(SearchContext);
};
