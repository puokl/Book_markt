import { createContext, useEffect, useReducer } from "react";

type UserState = {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
};

type AuthContextType = {
  state: UserState;
  dispatch: React.Dispatch<Action>;
};

type Action = {
  type: string;
  payload?: { isLoggedIn: boolean; username?: string; email?: string };
};

// to fix getFromLocalStorage type issue
const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
// because on the Browser can use the localStorage
// on the Server cannot use localStorage

const userStorage = JSON.parse(getFromLocalStorage("user") || "{}");
const INITIAL_STATE: UserState = {
  isLoggedIn: userStorage.isLoggedIn || false,
  username: userStorage.username || null,
  email: userStorage.email || null,
};

export const AuthContext = createContext<AuthContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

function AuthReducer(state: UserState, action: Action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action?.payload?.username ?? state.username,
        email: action?.payload?.email ?? state.email,
      };
    case "LOGOUT":
    case "FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        email: null,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user.username]);
  return (
    <AuthContext.Provider value={{ state: user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
