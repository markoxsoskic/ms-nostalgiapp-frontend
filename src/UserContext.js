import { createContext } from "react";

const UserContext = createContext(null);
const AuthContext = createContext();
const ThemeContext = createContext(null);
const DeleteAccount = createContext(false);
const ErrorContext = createContext(null);

export { AuthContext, UserContext, ThemeContext, DeleteAccount, ErrorContext };