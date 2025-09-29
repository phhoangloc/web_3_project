'use client'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import axios from 'axios';
import { UserType } from '@/redux/reducer/UserReduce';
import store from '@/redux/store';
type Props = {
    refresh: () => void
}
const CreatePasswordCard = ({ refresh }: Props) => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    const [_password, set_password] = useState<string>("")
    const [_pwHidden, set_pwHidden] = useState<boolean>(true)

    const createWallet = async ({ password }: { password: string }) => {
        const result = await axios.post(process.env.api_url + "api/" + _currentUser.position + "/createWallet", {
            password
        }, {
            withCredentials: true
        })
        if (result.data.success) {
            refresh()
        }
    }
    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className="w-11/12 mx-auto max-w-[575px] shadow-md rounded-md bg-white p-8">
                <div className='uppercase text-2xl font-bold text-center '>Create a Wallet</div>
                <div className="h-4"></div>
                <div className='uppercase font-bold text-center opacity-75'>create your wallet password</div>
                <div className=' italic text-center opacity-75'>
                    your wallet password can not be reset. so protect them carefully
                </div>
                <div className="h-1"></div>
                <div className='sm:flex gap-4'>
                    <div className='opacity-75 flex flex-col justify-center text-left'>password</div><Input value={_password} onchange={(v) => set_password(v)} type={_pwHidden ? 'password' : "text"}
                        icon={_pwHidden ? <VisibilityOffIcon className='cursor-pointer' onClick={() => set_pwHidden(false)} /> : <VisibilityIcon className='cursor-pointer' onClick={() => set_pwHidden(true)} />} />
                </div>
                <Button name="SUBMIT" sx='w-48 h-12 !block mx-auto mt-8 font-bold cursor-pointer bg-two text-white' onClick={() => {
                    createWallet({ password: _password })
                }} />
            </div>
        </div>
    )
}

export default CreatePasswordCard