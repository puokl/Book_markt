// import React, { createContext, useState } from "react";

// type NewContextType = {
//   newState: number;
//   setNewState: React.Dispatch<React.SetStateAction<number>>;
// };

// export const NewContext = createContext<null | NewContextType>(null);

// const App = () => {
//   const [newState, setNewState] = useState(0);

//   return (
//     <NewContext.Provider value={{ newState, setNewState }}>
//       <h2>React Context</h2>
//     </NewContext.Provider>
//   );
// };

// export default App;

import React, { createContext, useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};
type NewContextType = {
  newState: User;
  setNewState: React.Dispatch<React.SetStateAction<User>>;
};

// const getFromLocalStorage = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }
//   return localStorage.getItem(key);
// };
// // because if you are on the Browser ( you can use the localStorage)
// // if you are on the Server (you cannot use localStorage)

// const INITIAL_STATE: State = {
//   user: JSON.parse(getFromLocalStorage("user") || "{}"),

//   loading: false,
//   error: null,
// };

export const NewContext = createContext<null | NewContextType>(null);

export const NewContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newState, setNewState] = useState<User>({ username: "", email: "" });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(newState));
  }, [newState.username]);

  console.log("state", newState);
  return (
    <NewContext.Provider value={{ newState, setNewState }}>
      {children}
    </NewContext.Provider>
  );
};
