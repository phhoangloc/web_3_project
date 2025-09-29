import { AccountType } from '@/redux/reducer/AccountReduce'
import store from '@/redux/store'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import contract_abi from "../../abi/Voucher.json"
import { Input } from '../input/input'
import { Button } from '../button/button'

type Props = {
    closeModal: () => void
}

const MintCard = ({ closeModal }: Props) => {
    const [_contract, set_contract] = useState<ethers.Contract>()

    const [_ipfs, set_ipfs] = useState<string>("")

    const [_currentAccount, set_currentAccount] = useState<AccountType>(store.getState().account)
    const update = () => {
        // store.subscribe(() => set_currentUser(store.getState().user))
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
                set_contract(contract)
            } else {
                console.log("this address contact is not exit")
            }

        }

        getContract()

    }, [ContractAbi, _currentAccount.privateKey])
    const mint = async (add: string, ipfs: string) => {
        if (!_contract) { return }
        const result = await _contract.safeMint(add, ipfs)
        console.log(result)
        closeModal()
    }
    return (
        <div className='w-11/12 max-w-(--sm) m-auto bg-white rounded-md shadow-md p-4'>
            <div className="h-3"></div>
            <div className='sm:flex gap-4'>
                <div className='opacity-75 flex flex-col justify-center text-left'>ipfs</div><Input value={_ipfs} onchange={(v) => set_ipfs(v)} />
            </div>
            <div className="flex w-max gap-2 m-auto">
                <Button sx='!block w-48 h-12 mx-auto bg-two text-white cursor-pointer' onClick={() => mint(_currentAccount.address, _ipfs)} name="Mint a NFT"></Button>
                <Button sx='!block w-48 h-12 mx-auto bg-two text-white cursor-pointer' onClick={() => closeModal()} name="Cancel"></Button>
            </div>
        </div>
    )
}

export default MintCard