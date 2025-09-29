import { ApiTransfer } from '@/api/account'
import { setRefreshTransfer } from '@/redux/reducer/RefreshTransferReduce'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../button/button'
import Link from 'next/link'

export const Transfercard = () => {

    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const [_currentReTrans, set_currentReTrans] = useState<number>(store.getState().refreshTransfer)

    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentReTrans(store.getState().refreshTransfer))

    }
    useEffect(() => {
        update()
    }, [])
    const [_value, set_value] = useState<number>(0)
    const [_toAccount, set_toAccount] = useState<string>("")
    const [_isTransac, set_isTransac] = useState<boolean>(false)



    const sendValue = async (position: string, value: number, address: string) => {
        set_isTransac(true)
        if (!value || !address) { return }
        const result = await ApiTransfer({ position, address, value })
        if (result.success) {
            set_isTransac(false)
            set_value(0)
            set_toAccount("")
            store.dispatch(setRefreshTransfer())
        } else {
            set_isTransac(false)
        }
    }
    return (
        <div className='w-11/12 max-w-(--sm) mx-auto rounded-md shadow-md p-4' key={_currentReTrans}>
            <p className='font-bold uppercase font-serif text-2xl text-center'>transfer</p>
            <p className='font-bold text-left text-sm leading-2'>amount</p>
            <Input onchange={(v) => set_value(Number(v))} value={_value.toString()} placeholder="ETH"></Input>
            <div className="h-4"></div>
            <p className='font-bold text-left text-sm leading-2'>to</p>
            <Input onchange={(v) => set_toAccount(v)} value={_toAccount} placeholder="address"></Input>
            <Button name="SEND" sx='w-48 h-12 !block mx-auto my-8 bg-three rounded font-bold text-white cursor-pointer' onClick={() => sendValue(_currentUser.position, _value, _toAccount)} disable={_isTransac} />
            <div className='h-1 relative overflow-hidden'>
                <div className={`bg-two absolute h-full ${_isTransac ? "loading_ani" : ""}`}></div>
            </div>
            <div className="h-4"></div>
            <div className='text-center'>
                <div className='opacity-75'>if you dont have any eth you can click the below to get 0.5 ETH</div>
                <Link href="https://cloud.google.com/application/web3/faucet" className='hover:text-blue-400' target='_blank'>faucet</Link>
            </div>
        </div>
    )
}
