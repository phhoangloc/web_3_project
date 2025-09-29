
import store from '@/redux/store'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { AccountType } from '@/redux/reducer/AccountReduce'
import { useRouter } from 'next/navigation'

export const AccountCardModal = () => {
    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    const toPage = useRouter()

    return (
        <div className="absolute bottom-2 right-2 max-w-[200px] p-4  shadow-md rounded-md z-1 hidden lg:block bg-two/90 text-white">
            <div className=' gap-2'>
                <div className="text-center opacity-75">address:</div>
                <div className="truncate w-full font-bold text-lg  text-left"> {_currentAccount.address}</div>
            </div>
            <div className=' gap-2'>
                <div className="text-center opacity-75">balance:</div>
                <div className="truncate w-full font-bold text-left text-lg "> {ethers.formatEther(_currentAccount.balance.toString())} ETH</div>
            </div>
            <div className="h-4"></div>
            <div className='text-center text-sm opacity-75 text-two hover:opacity-100 cursor-pointer' onClick={() => toPage.push("/")}>to home</div>
        </div>
    )
}
export const AccountCard = () => {
    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    return (
        <div className=''>
            <div className="text-2xl uppercase font-bold font-serif text-center"> Your Account</div>
            <div className="h-4"></div>
            <div className='sm:flex gap-2'>
                <div className="text-left opacity-75 flex flex-col justify-end">network:</div>
                <div className="line-clamp-1 text-left uppercase font-bold text-lg "> sepolia testnet</div>
            </div>
            <div className='sm:flex gap-2'>
                <div className="text-left opacity-75 flex flex-col justify-end">address:</div>
                <div className="truncate w-full font-bold text-lg  text-left"> {_currentAccount.address}</div>
            </div>
            <div className='sm:flex gap-2'>
                <div className="text-left opacity-75 flex flex-col justify-end">balance:</div>
                <div className="truncate w-full font-bold text-left text-lg "> {ethers.formatEther(_currentAccount.balance.toString())} ETH</div>
            </div>
        </div>
    )
}