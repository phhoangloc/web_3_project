import { AccountType } from '@/redux/reducer/AccountReduce'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import voucher from "../../abi/Voucher.json"
import { ethers } from 'ethers'
import { Button } from '../button/button'
import { useRouter } from 'next/navigation'

type Prop = {
    getTokenId: (id: number) => void
    closeModal: () => void
}
const NftCard = ({ getTokenId, closeModal }: Prop) => {

    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    const [_myNFT, set_myNft] = useState<{ owner: string, tokenId: number, img: string }[]>([])


    // const MarketAbi = nft_market.abi
    const NFTAbi = voucher.abi
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
                const NFTContract = new ethers.Contract(process.env.contractAddress, NFTAbi, signer);
                const maxId = await NFTContract._tokenId()
                for (let index = Number(maxId) - 1; 0 <= index; index--) {
                    const item = await NFTContract.tokenURI(index)
                    const owner = await NFTContract.ownerOf(index)
                    const result = await fetch(item).then((data) => data.json())
                    set_myNft(its =>
                        [...its, { owner, tokenId: index, img: result.image, }]
                            .filter((obj, index, self) => index === self.findIndex(o => o.tokenId === obj.tokenId))
                            .filter((obj => obj.owner === _currentAccount.address))
                    )
                }
            } else {
                console.log("this address contact is not exit")
            }

        }

        getContract()

    }, [NFTAbi, _currentAccount.address, _currentAccount.privateKey])

    const toPage = useRouter()
    return (
        <div className='fixed w-screen h-screen overflow-auto'>
            <div className="h-16"></div>
            <div className="absolute w-full h-full z-[-1] top-0 left-0" onClick={() => closeModal()}></div>
            <div className='w-11/12 max-w-(--lg) min-h-96 text-white bg-two/90 backdrop-blur-xs m-auto rounded-md p-2'>
                <div className="flex border-b justify-between">
                    <div className="text-2xl uppercase font-serif h-12 flex flex-col justify-center font-bold">your NFT</div>
                    <Button name="MINT" sx='bg-three rounded text-white font-bold !block w-20 h-8 my-auto cursor-pointer' onClick={() => toPage.push("/mint")}></Button>

                </div>
                <div className="h-3"></div>
                <div className='columns-1 sm:columns-2 md:columns-3 gap-0 '>
                    {_myNFT
                        .map((its, index) =>
                            <div className="w-full p-1" key={index} onClick={() => { getTokenId(its.tokenId); closeModal() }}>
                                <Image src={its.img} width={500} height={500} alt='item' className='w-full shadow-md rounded-md' />
                            </div>)

                    }
                </div>
                {
                    _myNFT.length ? null :
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

export default NftCard