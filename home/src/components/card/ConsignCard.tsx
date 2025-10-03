import { AccountType } from '@/redux/reducer/AccountReduce'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import voucher from "../../abi/Voucher.json"
import nft_market from "../../abi/NFTMarket.json"
import { Contract, ethers } from 'ethers'
import { Button } from '../button/button'
import { Input } from '../input/input'
// import { Button } from '../button/button'
// import { useRouter } from 'next/navigation'

type Prop = {
    id: number
    closeModal: () => void
}
const ConsignCard = ({ id, closeModal }: Prop) => {

    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        store.subscribe(() => set_currentAccount(store.getState().account))
    }
    useEffect(() => {
        update()
    }, [])

    const [_myNFT, set_myNft] = useState<{ owner: string, tokenId: number, img: string, price: number, sell: boolean }>()
    const [_price, set_price] = useState<number>(0)

    const [_isConsign, set_isConsign] = useState<boolean>(false)

    const MarketAbi = nft_market.abi
    const NFTAbi = voucher.abi

    const [_refresh, set_refresh] = useState<number>(0)

    const [_marketContract, set_marketContract] = useState<Contract>()
    const [_nftContract, set_nftContract] = useState<Contract>()
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
                set_marketContract(MarketContract)
                const NFTContract = new ethers.Contract(process.env.contractAddress, NFTAbi, signer);
                set_nftContract(NFTContract)
                const itemConsign = await MarketContract.getItem(id)
                if (itemConsign.owner != "0x0000000000000000000000000000000000000000") {
                    set_isConsign(true)
                }
                const item = await NFTContract.tokenURI(id)
                const owner = await NFTContract.ownerOf(id)
                const result = await fetch(item).then((data) => data.json())
                set_myNft({ owner, tokenId: id, img: result.image, price: Number(itemConsign.price), sell: itemConsign.sell })
                set_price(Number(itemConsign.price))
            } else {
                console.log("this address contact is not exit")
            }

        }

        getContract()

    }, [MarketAbi, NFTAbi, _currentAccount.address, _currentAccount.privateKey, id, _refresh])

    // const toPage = useRouter()


    const consign = async (id: number, price: number,) => {
        console.log(_marketContract)
        console.log(_nftContract)
        if (!_marketContract) { return }
        if (!_nftContract) { return }
        if (!process.env.contractAddress) { return }
        // const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
        // const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
        // const MarketContract = new ethers.Contract(process.env.contractMarketAddress, MarketAbi, signer);
        const tx = await _marketContract.consign(id, price, process.env.contractAddress)
        await tx.wait()
        // const pretx = await _nftContract.setApprovalForAll(process.env.address, true)
        // await pretx.wait()
        // const owner = await _nftContract.ownerOf(id)
        // // console.log(owner)
        // const tx = await _nftContract.transferFrom(owner, process.env.address, id)
        // await tx.wait()
        set_refresh(r => r + 1)
    }
    const sell = async (id: number, price: number,) => {
        if (!_nftContract) { return }
        // if (!_currentAccount.privateKey) { return }
        // if (!process.env.contractMarketAddress) { return }
        // if (!process.env.contractAddress) { return }
        // const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
        // const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
        // const MarketContract = new ethers.Contract(process.env.contractMarketAddress, MarketAbi, signer);
        // const tx = await MarketContract.updateConsign(id, price, process.env.contractAddress, true)
        // await tx.wait()
        // const pretx = await _nftContract.setApprovalForAll(process.env.address, true)
        // await pretx.wait()
        const owner = await _nftContract.ownerOf(id)
        // console.log(owner)
        const tx = await _nftContract.transferFrom(owner, process.env.address, id)
        await tx.wait()
        set_refresh(r => r + 1)

    }
    // const approval = async () => {
    //     if (!_currentAccount.privateKey) { return }
    //     if (!process.env.contractAddress) { return }
    //     if (!process.env.address) { return }
    //     const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
    //     const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
    //     const NFTContract = new ethers.Contract(process.env.contractAddress, NFTAbi, signer);
    //     const pretx = await NFTContract.setApprovalForAll(process.env.address, true)
    //     await pretx.wait()
    //     const owner = await NFTContract.ownerOf(id)
    //     const tx = await NFTContract.transferFrom(owner, process.env.address, id)
    //     await tx.wait()
    // }
    const cancel = async (id: number, price: number,) => {
        if (!_currentAccount.privateKey) { return }
        if (!process.env.contractMarketAddress) { return }
        if (!process.env.contractAddress) { return }
        const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
        const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
        const MarketContract = new ethers.Contract(process.env.contractMarketAddress, MarketAbi, signer);
        await MarketContract.updateConsign(id, price, process.env.contractAddress, false)
        set_refresh(r => r + 1)

    }
    const buy = async (id: number, price: number) => {
        if (!_currentAccount.privateKey) { return }
        if (!process.env.privateKey) { return }
        if (!process.env.contractMarketAddress) { return }
        if (!process.env.contractAddress) { return }
        const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
        const signer = new ethers.Wallet(_currentAccount.privateKey, provider);
        const MarketContract = new ethers.Contract(process.env.contractMarketAddress, MarketAbi, signer);
        const tx1 = await MarketContract.buyNFT(id, { value: ethers.parseEther(price.toString()) });
        await tx1.wait()
    }
    const transfer = async (id: number) => {
        if (!process.env.private_key) { return }
        if (!_currentAccount.privateKey) { return }
        if (!process.env.contractAddress) { return }
        if (!process.env.address) { return }
        const provider = new ethers.JsonRpcProvider(process.env.rpc_url);
        const signer = new ethers.Wallet(process.env.private_key, provider);
        const _contract = new ethers.Contract(process.env.contractAddress, NFTAbi, signer);
        const owner = await _contract.ownerOf(id)
        console.log(owner)
        // await _contract.setApprovalForAll(_currentAccount.address, true)
        // console.log(_currentAccount.address)
        const tx = await _contract.transferFrom(owner, _currentAccount.address, id)
        await tx.wait()
        set_refresh(r => r + 1)
    }
    // console.log(_myNFT)
    if (!_myNFT) {
        return
    }
    return (
        <div className='fixed w-screen h-screen overflow-auto'>
            <div className="h-16"></div>
            <div className="absolute w-full h-full z-[-1] top-0 left-0" onClick={() => closeModal()}></div>
            <div className='w-11/12 max-w-(--md) min-h-96 text-white bg-two/90 backdrop-blur-xs m-auto rounded-md px-2 py-12'>

                <div className="w-full h-full flex flex-col justify-center max-w-[375px] rounded-md overflow-hidden m-auto">
                    <Image src={_myNFT.img} width={500} height={500} alt='item' className='  shadow-md rounded-md`' />
                </div>
                <div className="max-w-[375px] m-auto">
                    <div className="text-2xl uppercase font-serif h-12 flex flex-col justify-center font-bold">your NFT</div>
                    <div className="flex gap-2">
                        <div className="opacity-75">
                            owner
                        </div>
                        <div className="truncate">
                            {_myNFT.owner}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="opacity-75">
                            tokenId
                        </div>
                        <div className=" ">
                            {_myNFT.tokenId}
                        </div>
                    </div>
                    <div className="flex gap-2 ">
                        <div className="opacity-75 h-16 flex flex-col justify-center">
                            price
                        </div>
                        <div className="">
                            {_currentAccount.address === _myNFT.owner ? <Input sx="text-two" onchange={(v) => set_price(Number(v))} value={_price.toString()} /> : <div className="flex flex-col justify-center h-full">{Number(_myNFT.price)} ETH</div>}
                        </div>
                    </div>
                    <div className="h-6"></div>
                    <div className="flex gap-2">
                        {_currentAccount.address === _myNFT.owner ?
                            _isConsign ?
                                _myNFT.sell ?
                                    <div className="sm:flex gap-2 w-max m-auto">
                                        <Button name="UPDATE" sx='bg-three my-2 rounded text-white font-bold !block w-40 h-12 cursor-pointer' onClick={() => sell(id, _price)}></Button>
                                        <Button name="STOP TO SELL" sx='bg-two border border-one/25 my-2 rounded text-white font-bold !block w-40 h-12 cursor-pointer' onClick={() => cancel(id, _price)}></Button>
                                    </div>
                                    :
                                    <Button name="SELL" sx='bg-three rounded text-white font-bold !block w-40 h-12 cursor-pointer' onClick={async () => { await sell(id, _price) }}></Button>
                                :
                                <Button name="Consign" sx='bg-three rounded text-white font-bold !block w-40 h-12 cursor-pointer' onClick={async () => { await consign(id, _price) }}></Button>
                            :
                            _isConsign ?
                                <Button name="BUY" sx='bg-three rounded text-white font-bold !block w-40 h-12 cursor-pointer' onClick={async () => { await transfer(_myNFT.tokenId) }}></Button>
                                : <div className="text-center">your are not the owner</div>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ConsignCard