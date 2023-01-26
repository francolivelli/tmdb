import { createContext, useState } from "react";

const initialState = {
  search: null, // información de la búsqueda
  toggleSearch: () => null, // función para actualizar el contexto
};

export const SearchContext = createContext(initialState);

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState({
    search: localStorage.getItem("search") || null,
  });

  const toggleSearch = (search) => {
    setSearch({
        search: [],
    })
    localStorage.setItem("search", search)
    console.log("SEARCH en provider",search)
  }
  
  return (
    <SearchContext.Provider value={{ search, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
