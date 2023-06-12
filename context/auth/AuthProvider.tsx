import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { User } from '@/lib/interfaces';
import { authReducer, AuthContext } from './';
import { useSession, signOut } from 'next-auth/react';
import { useUserByEmail } from '@/lib/hooks';
import axios from '../../lib/helpers/axios.helper';

export interface AuthState {
  isLogged: boolean;
  user?: User;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const [user, setUser] = useState<User | null>(null);

  const { data, status } = useSession();

  // const { user, error, isLoading } = useUserByEmail(
  //   (data?.user?.email as string) || undefined
  // );

  const login = (user: User) => {
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
    if (data?.user?.email) {
      axios
        .get(`/api/users/email/${data?.user?.email}`)
        .then((res) => setUser(res.data.user));
    }
  }, [data]);

  useEffect(() => {
    if (status === 'authenticated' && user) {
      login(user);
    }
  }, [user, status]);

  // console.log(user);

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
