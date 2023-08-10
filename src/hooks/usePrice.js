import { useState, useEffect, useCallback } from 'react'
import axios from "axios"
import { financial } from '../helper'

export const useETHPrice = () => {
    const [ ethprice, setEthPrice ] = useState()

    const getCurrentEthPrice = useCallback(async () => {
            const response = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
            
            if (response.status === 200) {
                const price = response.data.data.amount
                setEthPrice(financial(price, 2))
            } else {
                setEthPrice(0)
            }
    }, [ setEthPrice ])

    useEffect(() => {
        getCurrentEthPrice()
    })

    return { ethprice }
}

export const useCompPrice = () => {
    const [ compprice, setCompPrice ] = useState()

    const getPrice = useCallback(async () => {
            const response = await axios.get('https://api.coinbase.com/v2/prices/COMP-USD/spot');
            
            if (response.status === 200) {
                const price = response.data.data.amount
                setCompPrice(financial(price, 2))
            } else {
                setCompPrice(0)
            }
    }, [ setCompPrice ])

    useEffect(() => {
        getPrice()
    })

    return { compprice }
}
