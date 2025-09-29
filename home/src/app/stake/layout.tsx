import React from 'react'
import AccountProvider from '@/redux/component/accountProvider'

type Props = {
    children: React.ReactNode
}

const Latyout = ({ children }: Props) => {
    return (
        <AccountProvider>
            {children}
        </AccountProvider>

    )
}

export default Latyout