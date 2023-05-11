import { IUser } from '@/lib/interfaces';
import { AuthState } from './';

type AuthActionType =
  | { type: '[AUTH] - LOGIN'; payload: IUser }
  | { type: '[AUTH] - LOGOUT' };

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case '[AUTH] - LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case '[AUTH] - LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};
