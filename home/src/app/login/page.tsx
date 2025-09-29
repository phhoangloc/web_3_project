import LoginCard from '@/components/card/loginCard'
import React from 'react'

const Page = () => {
    return (
        <div className="min-h-screen bg-linear-to-br flex flex-col justify-center text-center ">
            <div className="w-11/12 max-w-[575px] mx-auto text-white bg-two/90 backdrop-blur-sm">
                <LoginCard />
            </div>
        </div>
    )
}

export default Page