import { IUser } from '@/lib/interfaces';
import { createContext } from 'react';

interface AuthContextProps {
  isLogged: boolean;
  user?: IUser;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
