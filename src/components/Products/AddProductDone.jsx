import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../../redux'


const AddProductDone = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div>
            <p>El producto se agrego correctamente.</p>
            <p>!Qué esperas para ir a verlo¡</p>
        </div>
    )
}

export default AddProductDone