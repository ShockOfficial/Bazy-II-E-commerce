import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import authService from './authService';

const userJSON = localStorage.getItem('user');
const user = userJSON ? JSON.parse(userJSON) : null;

// Define a type for the slice state
interface AuthState {
    user: {
        email: string,
        token: string
    } | null,
    isLoading: boolean,
    isSuccess: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    error: null
}

// login user
export const login = createAsyncThunk(
    '/auth/login',
    async (user: { email: string, password: string }, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const signup = createAsyncThunk(
    '/auth/signup',
    async (user: { email: string, password: string }, thunkAPI) => {
        try {
            return await authService.signup(user);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk(
    '/user/logout',
    async () => {
        await authService.logout();
    }
)

export const userSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const { reset } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;