
import { createSlice } from "@reduxjs/toolkit"


const RefreshTransferReducer = createSlice({
    name: "RefreshTransfer",
    initialState: 0,
    reducers: {
        setRefreshTransfer: (state) => {
            return (state = state + 1)
        },

    }
})
export const { actions, reducer } = RefreshTransferReducer
export const { setRefreshTransfer } = actions;

export default RefreshTransferReducer