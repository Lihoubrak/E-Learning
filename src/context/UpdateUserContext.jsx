import { createContext, useState } from "react";

const UpdateUserContext = createContext();

export function UpdateUserContextProvider({ children }) {
  const [isChange, setChange] = useState(false);
  return (
    <UpdateUserContext.Provider value={{ isChange, setChange }}>
      {children}
    </UpdateUserContext.Provider>
  );
}

export default UpdateUserContext;
