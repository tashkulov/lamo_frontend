import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserProfile {
    userId: number;
    age: number;
    gender: string;
    interests?: string;
    location?: string;
    bio?: string;
    profileImageUrl?: string;
}

interface UsersState {
    users: User[];
    profiles: UserProfile[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    profiles: [],
    loading: false,
    error: null,
};

export const createUser = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
    'users/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/users', userData);
            return response.data;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to create user');
            } else {
                return rejectWithValue('Failed to create user');
            }
        }
    }
);

export const createUserProfile = createAsyncThunk<UserProfile, FormData, { rejectValue: string }>(
    'users/createUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/userProfiles', profileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err: any) {
            // Обработка ошибки и возврат значения с отклонением
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to create user profile');
            } else {
                return rejectWithValue('Failed to create user profile');
            }
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action: PayloadAction<string | undefined, string>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create user';
            })
            .addCase(createUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.profiles.push(action.payload);
            })
            .addCase(createUserProfile.rejected, (state, action: PayloadAction<string | undefined, string>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create user profile';
            });
    },
});
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            return response.data;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Failed to fetch users');
            } else {
                return rejectWithValue('Failed to fetch users');
            }
        }
    }
);

export default usersSlice.reducer;
