import { createContext, useState } from "react";
//import { Navigate, useNavigate } from "react-router-dom";

export const LogInContext = createContext();
//const navigate = useNavigate()

const LogInContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();

  const login = async (user) => {
    console.log(user)
    try {
      const status = await fetch("users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const result = await status.json();
      setLoggedInUser(result);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
      const response = await fetch("/users/logout/", {
        method: "DELETE",
      })
      const result = await response.json();
      console.log(result)
      setLoggedInUser()
      //navigate("/offline")
    //   setLoggedInUser(result);
    //   return true;
    // } catch (err) {
    //   return false;
    // }
  };

  console.log(loggedInUser);
  return (
    <LogInContext.Provider
      value={{
        loggedInUser,
        login,
        logout
      }}
    >
      {children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;
