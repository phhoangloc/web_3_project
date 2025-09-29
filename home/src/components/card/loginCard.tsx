'use client'
import React, { useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../button/button'
import { ApiLogin } from '@/api/client'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import { setModal } from '@/redux/reducer/ModalReduce'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import Link from 'next/link'
const LoginCard = () => {

    const toPage = useRouter()


    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")
    const [_pwHidden, set_pwHidden] = useState<boolean>(true)

    const login = async (data: { username: string, password: string }) => {
        const result = await ApiLogin(data)
        console.log(result)
        if (result.success) {
            store.dispatch(setModal({ open: true, type: "notification", msg: result.data, value: "" }))
            setTimeout(() => {
                store.dispatch(setModal({ open: false, type: "", msg: "", value: "" }))
                store.dispatch(setRefresh())
                toPage.refresh()
            }, 3000)
        }
    }
    return (
        <div className='w-11/12 min-h-96 max-w-(--sm) m-auto shadow-md p-4 md:p-8 flex flex-col justify-center rounded'>
            <div className='text-xl font-bold text-center mb-6 font-itim font-serif'>LOGIN</div>
            <div className='sm:flex gap-4'>
                <div className='opacity-75 flex flex-col justify-center text-left'>username</div><Input value={_username} onchange={(v) => set_username(v)} />
            </div>
            <div className='sm:flex gap-4'>
                <div className='opacity-75 flex flex-col justify-center text-left'>password</div><Input value={_password} onchange={(v) => set_password(v)} type={_pwHidden ? 'password' : "text"}
                    icon={_pwHidden ? <VisibilityOffIcon className='cursor-pointer' onClick={() => set_pwHidden(false)} /> : <VisibilityIcon className='cursor-pointer' onClick={() => set_pwHidden(true)} />} />
            </div>
            <Button name="LOGIN" sx='w-48 h-12 mx-auto mt-8 mb-4 font-bold cursor-pointer bg-three text-white rounded' onClick={() => {
                login({ username: _username, password: _password })
            }} />
            <div className='text-three'><Link href={"/signup"}>sign up</Link></div>
        </div>
    )
}

export default LoginCard