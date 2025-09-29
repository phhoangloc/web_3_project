'use client'
import { AccountType } from '@/redux/reducer/AccountReduce'
// import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import contract_abi from "../../abi/Voucher.json"
import { Button } from '@/components/button/button'
import MintCard from '@/components/card/MintCard'
import Image from 'next/image'

const Page = () => {

    const [_modalMint, set_modalMint] = useState<boolean>(false)
    const [_items, set_items] = useState<{ id: number, img: string, owner: string }[]>([])
    const [_refresh, set_refresh] = useState<number>(0)

    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    const ContractAbi = contract_abi.abi

    useEffect(() => {
        const getContract = async () => {
            if (!_currentAccount.privateKey) { return }
            if (!process.env.contractAddress) { return }
            const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
            const code = await provider.getCode(process.env.contractAddress);
            if (code !== "0x") {
                const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
                const contract = new ethers.Contract(process.env.contractAddress, ContractAbi, signer);
                const maxId = await contract._tokenId()
                for (let index = Number(maxId) - 1; 0 <= index; index--) {
                    const item = await contract.tokenURI(index)
                    const owner = await contract.ownerOf(index)
                    const result = await fetch(item).then((data) => data.json())
                    set_items(its =>
                        [...its, { id: index, img: result.image, owner }]
                            .filter((obj, index, self) => index === self.findIndex(o => o.id === obj.id && o.id === obj.id))
                            .filter((obj => obj.owner === _currentAccount.address))
                    )
                }
            } else {
                console.log("this address contact is not exit")
            }

        }

        getContract()

    }, [ContractAbi, _currentAccount.address, _currentAccount.privateKey, _refresh])

    return (
        <div className='relative min-h-screen'>
            <div className={`${_modalMint ? "flex" : "hidden"} absolute top-0 left-0 w-full h-full backdrop-brightness-50 z-1  flex-col justify-center`}>
                <MintCard closeModal={() => { set_modalMint(false); set_refresh(n => n + 1) }} />
            </div>
            <div className="h-24"></div>
            <div className='w-11/12 max-w-(--lg) m-auto rounded-md shadow-md p-4 text-white'>
                <div className='text-2xl font-bold font-serif text-center uppercase'>Your NFT</div>
                <div className="h-2"></div>
                <Button name="MINT" sx='bg-three rounded text-white font-bold !block m-auto w-40 h-12 cursor-pointer' onClick={() => set_modalMint(true)}></Button>
                <div className="h-4"></div>
                <div className='columns-1 sm:columns-2 md:columns-3 gap-0'>
                    {_items
                        .map((its, index) =>
                            <div className="w-full p-1" key={index}>
                                <Image src={its.img} width={500} height={500} alt='item' className='w-full shadow-md rounded-md' />
                            </div>)

                    }
                </div>
                {
                    _items.length ? null :
                        <div className="">
                            <div className='uppercase text-center'>no NFT</div>
                            <div className='uppercase text-center'>the way of mint guidebook</div>
                            <div className="h-2"></div>
                            <div className='uppercase text-center text-xl text-three font-bold'>guidebook</div>
                        </div>
                }
            </div>

        </div>
    )
}

export default Page