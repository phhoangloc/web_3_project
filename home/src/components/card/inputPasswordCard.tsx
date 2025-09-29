import React, { useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../button/button'

type Props = {
    refresh: () => void
}

const InputPasswordCard = ({ refresh }: Props) => {
    const [_password, set_password] = useState<string>("")

    const confirm = (pw: string) => {
        sessionStorage.password = pw;
        refresh()
    }
    return (
        <div className='w-11/12 min-h-96 max-w-(--sm) m-auto shadow-md p-4 md:p-8 flex flex-col justify-center rounded bg-two backdrop-blur-sm text-white'>
            <div className="text-center uppercase font-bold ">password wallet</div>
            <div className="h-3"></div>
            <Input type="password" onchange={(v) => { set_password(v) }} value={_password} sx="!w-11/12 max-w-[768px] text-black" />
            <Button sx='!block w-48 h-12 mx-auto bg-three rounded text-white cursor-pointer' onClick={() => confirm(_password)} name="SUBMIT"></Button>
        </div>
    )
}

export default InputPasswordCard