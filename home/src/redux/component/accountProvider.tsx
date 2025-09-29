'use client'
import React, { useEffect, useState } from 'react'
import { UserType } from '../reducer/UserReduce'
import store from '../store'
import LoginCard from '@/components/card/loginCard'
import { ApiAccount } from '@/api/account'
import { AccountType, setAccount } from '../reducer/AccountReduce'
import InputPasswordCard from '@/components/card/inputPasswordCard'
import CreatePasswordCard from '@/components/card/createPasswordCard'
import { setRefresh } from '../reducer/RefreshReduce'
import { AccountCardModal } from '@/components/card/accountCard'
type Props = {
    children: React.ReactNode
}
const AccountProvider = ({ children }: Props) => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const [_currentReTrans, set_currentReTrans] = useState<number>(store.getState().refreshTransfer)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentAccount(store.getState().account))
        store.subscribe(() => set_currentReTrans(store.getState().refreshTransfer))
    }
    useEffect(() => {
        update()
    }, [])

    const [_refresh, set_refresh] = useState<number>(0)
    const [_loading, set_loading] = useState<boolean>(true)
    useEffect(() => {
        const getAccount = async (position: string) => {
            const result = await ApiAccount({ position })
            if (result.success) {
                store.dispatch(setAccount({ ...result.data }))
            } else {
                store.dispatch(setAccount({} as AccountType))
            }
            set_loading(false)
        }
        getAccount(_currentUser.position)
    }, [_currentUser, _refresh, _currentReTrans])

    return (

        _currentUser.id ?
            _currentUser.mnemonic ?
                _loading ?
                    <div className='h-screen flex flex-col justify-center'> loading ...</div> :
                    _currentAccount.address ?
                        <div className='relative max-w-(--xxl) m-auto'>
                            <AccountCardModal />
                            {children}
                        </div> :
                        <div className="min-h-screen flex flex-col justify-center text-center">
                            <div className="w-11/12 max-w-[575px] m-auto">
                                <InputPasswordCard refresh={() => set_refresh(n => n + 1)} />
                            </div>
                        </div>
                :
                <CreatePasswordCard refresh={() => { store.dispatch(setRefresh()) }} />
            :
            <div className="min-h-screen flex flex-col justify-center text-center">
                <div className="w-11/12 max-w-[575px] m-auto bg-two/90 text-white backdrop-blur-xs">
                    <LoginCard />
                </div>
            </div>
    )
}

export default AccountProvider