import { createContext, useEffect, useReducer } from "react";

interface Test {
  username: string;
  email: string;
}

interface State {
  user: Test | null; //FIXME - adjust object type
  loading: boolean;
  error: object | null;
}

interface Action {
  type: string;
  payload?: any;
}

interface AuthContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
// because if you are on the Browser ( you can use the localStorage)
// if you are on the Server (you cannot use localStorage)

const INITIAL_STATE: State = {
  user: JSON.parse(getFromLocalStorage("user") || "{}"),

  loading: false,
  error: null,
};

// export const AuthContext = createContext(INITIAL_STATE);
export const AuthContext = createContext<AuthContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const AuthReducer = (state: State, action: Action) => {
  console.log("dispatched action", action);
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  console.log("state", state);
  return (
    // <AuthContext.Provider
    //   value={{
    //     user: state.user,
    //     loading: state.loading,
    //     error: state.error,
    //     dispatch,
    //   }}
    // >
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
