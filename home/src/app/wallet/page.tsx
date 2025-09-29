'use client'

import { AccountCard } from "@/components/card/accountCard"
import { Transfercard } from "@/components/card/transfercard"

const Page = () => {


  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className="w-11/12 max-w-(--sm) p-4 rounded-md bg-two/90 text-white backdrop-blur-sm mx-auto">
        <AccountCard />
      </div>
      <div className="h-4"></div>
      <div className="w-11/12 max-w-(--sm) p-4 rounded-md bg-two/90 text-white backdrop-blur-sm mx-auto">
        <Transfercard />
      </div>
    </div>
  )
}
export default Page