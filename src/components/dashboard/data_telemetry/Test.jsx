import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export const Test = () => {
    const [test, setTest] = useState([]);

    useEffect(() => {
        setTest([1,2,3])
    }, [])

    return (
        <div>{test}</div>
    )
}
