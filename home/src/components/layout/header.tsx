'use client'
import { useRouter } from "next/navigation"
import MenuIcon from '@mui/icons-material/Menu';
import Menu, { menulist } from "./menu";
import store from "@/redux/store";
import { setMenu } from "@/redux/reducer/MenuReduce";
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import { UserType } from "@/redux/reducer/UserReduce";
import { ApiLogout } from "@/api/user";
import { setRefresh } from "@/redux/reducer/RefreshReduce";
export const Header = () => {
  const toPage = useRouter()
  const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
  const update = () => {
    store.subscribe(() => set_currentUser(store.getState().user))
  }
  useEffect(() => {
    update()
  }, [])

  const [_profileModal, set_profileModal] = useState<boolean>(false)

  const logout = async (position: string) => {
    const result = await ApiLogout({ position })
    if (result.success) {
      store.dispatch(setRefresh())
      sessionStorage.clear()
    }
  }
  return (
    <div className="fixed w-full border-b-2 border-b-white/50 z-1 text-white">
      <Menu />
      <div className="text-2xl font-bold uppercase h-12 flex flex-col justify-center text-center px-2 cursor-pointer absolute w-full">
        walleto
      </div>
      <div className="w-full relative m-auto max-w-(--xxl) border-slate-200 h-12 flex justify-between">
        {
          _currentUser.id ?
            <div className={`absolute w-40 right-2 top-11 bg-two/90 backdrop-blur-sm rounded-md shadow-md px-2 py-1 ${_profileModal ? "block" : "hidden"}`}>
              <div className="h-8 opacity-75 hover:opacity-100 cursor-pointer flex flex-col justify-center" onClick={() => { toPage.push("/profile"); set_profileModal(false) }}>profile</div>
              <div className="h-8 opacity-75 hover:opacity-100 cursor-pointer flex flex-col justify-center" onClick={() => { logout(_currentUser.position); set_profileModal(false) }}>logout</div>
            </div> : null
        }
        <div className="w-max">
          <MenuIcon onClick={() => store.dispatch(setMenu(true))} className="!w-12 !h-12 p-2 cursor-pointer lg:!hidden" />
          <div className="hidden lg:flex gap-2">
            {menulist.map((item, index) =>
              <div key={index} className='w-20 text-center h-12 flex flex-col justify-center uppercase text-lg opacity-75 hover:opacity-100 cursor-pointer' onClick={() => { toPage.push(item.link); store.dispatch(setMenu(false)) }}>{item.name}</div>)}
          </div>
        </div>
        <div className="w-60 cursor-pointer" onClick={() => toPage.push("/")}></div>

        <div className="flex">
          {_currentUser.id ?
            <div className="h-12 flex flex-col justify-center text-sm opacity-75">{_currentUser.username}</div> :
            <div className="h-12 flex flex-col justify-center text-sm opacity-75 hover:opacity-100 cursor-pointer" onClick={() => toPage.push("/login")}>login</div>}
          <PersonIcon className="!w-12 !h-12 p-2 cursor-pointer" onClick={() => { set_profileModal(!_profileModal) }} />
        </div>
      </div>

    </div >
  )
}
