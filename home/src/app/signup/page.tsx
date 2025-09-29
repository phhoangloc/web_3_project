import SignupCard from '@/components/card/signupCard'
import React from 'react'

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center text-center">
            <div className="w-11/12 max-w-[575px] m-auto text-white bg-two/90 backdrop-blur-sm">
                <SignupCard />
            </div>
        </div>
    )
}

export default Page