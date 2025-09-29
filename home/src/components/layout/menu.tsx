import React, { useEffect, useState } from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { useRouter } from 'next/navigation';
export const menulist = [
    {
        link: "/wallet",
        name: "wallet"
    },
    {
        link: "/mint",
        name: "mint"
    },
    {
        link: "/market",
        name: "market"
    }
]
const Menu = () => {
    const [_currentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => set_currentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    })



    const toPage = useRouter()
    return (
        <div className={`${_currentMenu ? "translate-x-[0%] opacity-100 z-2" : "translate-x-[-100%] opacity-0 z-0"} transition-all duration-500 fixed top-0 left-0 z-1 bg-two/90 w-screen max-w-60 h-screen shadow-md px-4 backdrop-blur-sm`}>
            <MenuOpenIcon onClick={() => store.dispatch(setMenu(false))} className='absolute right-0 top-0 !w-12 !h-12 p-2' />
            <div className="h-12"></div>
            {menulist.map((item, index) =>
                <div key={index} className='h-12 flex flex-col justify-center uppercase text-lg' onClick={() => { toPage.push(item.link); store.dispatch(setMenu(false)) }}>{item.name}</div>)}
        </div>
    )
}

export default Menu