import { createContext, useContext, useState, ReactNode } from "react";
import api from "../../Services/api";

interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegisterContextProps {
  signUp: (data: IRegister) => void;
}

const RegisterContext = createContext<RegisterContextProps>(
  {} as RegisterContextProps
);

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const signUp = (data: IRegister) => {
    api
<<<<<<< HEAD
      .post("/register/", data)
=======
      .post("register/", data)
>>>>>>> 6e6104d0346d58b64491eee011f7f5c682d4890b
      .then((_) => "Cadastro realizado com sucesso!")
      .catch((_) => "Falha no cadastro!");
  };
  return (
    <RegisterContext.Provider value={{ signUp }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
