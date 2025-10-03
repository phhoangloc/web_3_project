'use client'
// import { UserType } from '@/redux/reducer/UserReduce'
import React, { useEffect, useState } from 'react'
import nft_market from "../../abi/NFTMarket.json"
import voucher from "../../abi/Voucher.json"
import { AccountType } from '@/redux/reducer/AccountReduce'
import store from '@/redux/store'
import { ethers } from 'ethers'
import Image from 'next/image'
import { Button } from '@/components/button/button'
import NftCard from '@/components/card/NftCard'
import ConsignCard from '@/components/card/ConsignCard'

const Page = () => {

    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    const [_modalDetailNFT, set_modalDetailNFT] = useState<boolean>(false)
    const [_items, set_items] = useState<{ owner: string, tokenId: number, price: number, sell: boolean; img: string }[]>([])


    const MarketAbi = nft_market.abi
    const NFTAbi = voucher.abi

    const [_refresh, set_refresh] = useState<number>(0)
    useEffect(() => {
        const getContract = async () => {
            if (!_currentAccount.privateKey) { return }
            if (!process.env.contractMarketAddress) { return }
            if (!process.env.contractAddress) { return }
            const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
            const codeMarket = await provider.getCode(process.env.contractMarketAddress);
            const codeNft = await provider.getCode(process.env.contractAddress);
            if (codeMarket !== "0x" && codeNft !== "0x") {
                const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
                const MarketContract = new ethers.Contract(process.env.contractMarketAddress, MarketAbi, signer);
                const NFTContract = new ethers.Contract(process.env.contractAddress, NFTAbi, signer);
                const maxId = await NFTContract._tokenId()
                for (let index = Number(maxId) - 1; 0 <= index; index--) {
                    const item = await MarketContract.getItem(index)
                    if (item.owner != "0x0000000000000000000000000000000000000000") {
                        const nftUri = await NFTContract.tokenURI(Number(item.tokenId))
                        const result = await fetch(nftUri).then((data) => data.json())
                        set_items(its => [...its, { owner: item.owner, tokenId: index, price: item.price, sell: item.sell, img: result.image }]
                            .filter((obj, index, self) => index === self.findIndex(o => o.tokenId === obj.tokenId))

                        )
                    }
                }
            } else {
                console.log("this address contact is not exit")
            }

        }

        getContract()

    }, [MarketAbi, NFTAbi, _currentAccount.address, _currentAccount.privateKey, _refresh])

    const [_tokenId, set_tokenId] = useState<number>(-1)

    return (
        <div className='relative min-h-screen'>
            <div className={`fixed w-screen h-screen top-0 left-0 backdrop-blur-sm backdrop-brightness-75 ${_modalDetailNFT ? "block" : "hidden"}`}>
                <NftCard getTokenId={(id) => set_tokenId(id)} closeModal={() => set_modalDetailNFT(false)} />
            </div>
            {
                _tokenId != -1 ?
                    <div className={`fixed w-screen h-screen top-0 left-0 backdrop-blur-sm backdrop-brightness-75 "`}>
                        <ConsignCard id={_tokenId} closeModal={() => { set_tokenId(-1); set_refresh(r => r + 1) }} />
                    </div>
                    : null
            }
            <div className="h-24"></div>
            <div className='w-11/12 max-w-(--xxl) m-auto rounded-md shadow-md p-4 text-white'>
                <div className='text-2xl font-bold font-serif text-center uppercase'>NFT MARKET</div>
                <Button sx='!block text-center uppercase w-40 mx-auto my-3 h-12 bg-three rounded-md flex flex-col justify-center cursor-pointer' onClick={() => set_modalDetailNFT(true)} name="consign" />
                <div className="h-4"></div>
                <div className='flex flex-wrap'>
                    {_items
                        .map((its, index) =>
                            <div className="w-full sm:w-1/2 md:w-1/3 p-1 cursor-pointer" key={index} onClick={() => set_tokenId(its.tokenId)}>
                                <Image src={its.img} width={500} height={500} alt='item' className='w-full shadow-md rounded-md' />
                                <div className='h-8 flex flex-col justify-center'>Price: {its.price}</div>
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