import axios from "axios"

export const ApiAccount = async ({ position }: { position: string }) => {
    try {
        const result = await axios.post(process.env.api_url + "api/" + position + "/account",
            {
                password: sessionStorage.password,
                rpc_url: process.env.rpc_url
            },
            {
                withCredentials: true
            })
        return result.data

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return ({ success: false })
    }

}
export const ApiTransfer = async ({ position, address, value }: { position: string, address: string, value: number }) => {
    try {
        const result = await axios.post(process.env.api_url + "api/" + position + "/account/transfer",
            {
                index: 1,
                password: sessionStorage.password,
                rpc_url: process.env.rpc_url,
                address,
                value
            },
            {
                withCredentials: true
            })
        return result.data

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return ({ success: false })
    }

}