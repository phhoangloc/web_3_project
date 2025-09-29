'use client'
// import { UserType } from '@/redux/reducer/UserReduce'
import React, { useState } from 'react'


const Page = () => {

    const [_modalDetailNFT,] = useState<boolean>(false)
    // const [_items,] = useState<{ id: number, img: string, owner: string }[]>([])
    // const [_refresh, set_refresh] = useState<number>(0)
    // const [_id, set_id] = useState<number>(0)

    // const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    // const update = () => {
    //     store.subscribe(() => set_currentAccount(store.getState().account))
    // }
    // useEffect(() => {
    //     update()
    // }, [])

    // const ContractAbi = contract_abi.abi


    return (
        <div className='relative min-h-screen'>
            <div className={`fixed w-screen h-screen top-0 left-0 backdrop-blur-sm backdrop-brightness-75 ${_modalDetailNFT ? "block" : "hidden"}`}>

            </div>
            <div className="h-24"></div>
            <div className='w-11/12 max-w-(--xxl) m-auto rounded-md shadow-md p-4 text-white'>
                <div className='text-2xl font-bold font-serif text-center uppercase'>NFT MARKET</div>
                <div className="h-4"></div>
                <div className='columns-2 md:columns-3 xl:columns-4 gap-0'>

                </div>
            </div>

        </div>
    )
}

export default Page