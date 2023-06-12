import { IUser, User } from '@/lib/interfaces';
import { createContext } from 'react';

interface AuthContextProps {
  isLogged: boolean;
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
