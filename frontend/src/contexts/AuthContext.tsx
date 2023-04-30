import {
	ReactNode,
	Reducer,
	createContext,
	useEffect,
	useReducer,
} from 'react';

interface User {
	email: string;
	token: string;
}

interface AuthState {
	user?: User | null;
}

interface AuthContextProps extends AuthState {
	dispatch?: ({ type }: { type: string; payload?: User }) => void;
}

type AuthContextProviderProps = {
	children: ReactNode;
};

type AuthAction = {
	type: string;
	payload?: User;
};

export const AuthContext = createContext<AuthContextProps>({
	user: null,
});

const authReducer: Reducer<AuthState, AuthAction> = (
	state: AuthState,
	action: AuthAction,
) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload };
		case 'LOGOUT':
			return { user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	useEffect(() => {
		const userJSON = localStorage.getItem('user');
		const user = userJSON ? JSON.parse(userJSON) : null;

		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	console.log('Auth context state: ', state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
