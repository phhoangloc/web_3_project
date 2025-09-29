
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

export type AccountType = {

    address: string,
    balance: number,
    privateKey: string,
}
const AccountReducer = createSlice({
    name: "Account",
    initialState: {} as AccountType,
    reducers: {
        setAccount: {
            reducer: (state, action: PayloadAction<AccountType>) => {
                return (state = action.payload)
            },
            prepare: (msg: AccountType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = AccountReducer
export const { setAccount } = actions;

export default AccountReducer