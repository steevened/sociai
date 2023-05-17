import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { IUser } from '@/lib/interfaces';
import { authReducer, AuthContext } from './';
import { useSession, signOut } from 'next-auth/react';

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const { data, status } = useSession();

  const login = (user: IUser) => {
    dispatch({
      type: '[AUTH] - LOGIN',
      payload: user,
    });
  };

  const logout = () => {
    signOut();
    dispatch({ type: '[AUTH] - LOGOUT' });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      const { user } = data;
      login({
        name: user?.name,
        email: user?.email,
        image: user?.image || '',
      } as IUser);
    }
  }, [data, status]);

  // console.log({ data, status });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
