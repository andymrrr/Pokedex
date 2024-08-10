import React, { useEffect, useState } from 'react'

export const useAntiRebote = (input: string ='', tiempo: number=500) => {
    const [antiRebote, setAntiRebote] = useState(input)
    useEffect(() => {
        const tiempoEspera = setTimeout(() => {
            setAntiRebote(input)
        }, tiempo);

        return ()=> {
            clearTimeout(tiempoEspera)
        }
    }, [input])
    
  return antiRebote;
}
