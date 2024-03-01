import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserEntity from "../entities/user.entity";


interface CurrentUserState {
    currentUser: UserEntity;
}

const initialState: CurrentUserState = {
    currentUser: new UserEntity(),
};

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        assignCurrentUser: (state, action: PayloadAction<UserEntity>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { assignCurrentUser } = userSlice.actions;
export default userSlice.reducer;