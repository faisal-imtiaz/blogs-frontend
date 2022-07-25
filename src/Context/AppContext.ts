import React from "react";
import { AuthState } from "../Types/types";

const appState: AuthState = {
  userStatus: "",
  setUserStatus: (userStatus: string) => "",
};
const AppContext = React.createContext(appState);
const AppProvider = AppContext.Provider;

export { AppContext, AppProvider };
