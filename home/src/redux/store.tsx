import { configureStore } from "@reduxjs/toolkit";

import MenuReducer from "./reducer/MenuReduce";
import RefreshReducer from "./reducer/RefreshReduce";
import UserReducer from "./reducer/UserReduce";
import ModalReducer from "./reducer/ModalReduce";
import AccountReducer from "./reducer/AccountReduce";
import RefreshTransferReducer from "./reducer/RefreshTransferReduce";
const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        refresh: RefreshReducer.reducer,
        user: UserReducer.reducer,
        modal: ModalReducer.reducer,
        account: AccountReducer.reducer,
        refreshTransfer: RefreshTransferReducer.reducer
    }
})

export default store