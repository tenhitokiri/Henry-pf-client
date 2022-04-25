import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Inputs from '../Inputs/Inputs'
import { addPRODUCT } from '../../redux/'
import styles from './productForm.module.css'
import TextArea from '../Inputs/TextArea'
import jwt from 'jwt-decode'
import { addStock, fetchProducts } from '../../redux'

// import { fetchCategories } from '../../redux'

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.categories_detail)

    // useEffect(() => {
    //     dispatch(fetchCategories())
    // }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const validation = {
        name: /^[A-Za-z0-9\s.,]+$/,
        image: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/
    }
    const [data, setData] = useState({
        name: '',
        description: '',
        category_name: '',
        images: [],
        imgOnScreen: ''
    })

    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [imageError, setImagetError] = useState('')
    const [categoryError, setCategoryError] = useState(true)
    const [toggle, setToggle] = useState(false)

    const onClear = () => {
        setData({
            name: '',
            description: '',
            category_name: '',
            images: [],
            imgOnScreen: ''
        })
    }

    const onCategory = (e) => {
        // setToggle()
        if (e.target.value !== 'category') {
            setData({ ...data, category_name: e.target.value })
            setCategoryError(false)
        } else {
            setCategoryError(true)
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !descriptionError && !imageError && !categoryError) {
            setData({ ...data, images: data.images.push(data.imgOnScreen) })
            dispatch(addPRODUCT(data))
            setToggle(true)
            onClear()

        }
    }

    //-----------------------submitTwo

    const dataEncode = localStorage.getItem('token')
    const userId = jwt(dataEncode).user_id

    const productId = useSelector(state => state.products.product_id)

    const [stock, setStock] = useState({
        user_id: userId,
        product_id: '',
        quantity: 0,
        unit_price: ''
    });

    useEffect(() => {
        setStock({
            ...stock,
            product_id: productId
        })
    }, [stock.quantity])


    const onSubmitTwo = (e) => {
        e.preventDefault();
        dispatch(addStock(stock))
        dispatch(fetchProducts())
        navigate('/add-produc/done')
    }
    const onPrice = ({ target }) => {
        const { value } = target
        setStock({
            ...stock,
            unit_price: value
        })
    }

    const decrement = () => {
        if (stock.quantity > 0) {
            setStock({
                ...stock,
                quantity: stock.quantity - 1
            })
        }
    }
    const increment = () => {
        setStock({
            ...stock,
            quantity: stock.quantity + 1
        })
    }


    return (
        <div className={styles.background} >
            <form className={styles.form} autoComplete="off" onSubmit={onSubmit}>
                <div className={styles.path}>Home / Sell / Add-Product</div>
                <div className={styles.formContent}>
                    <div className={styles.content}>
                        <div className={styles.catName}>
                            <Inputs
                                error={nameError}
                                setError={setNameError}
                                data={data}
                                setData={setData}
                                type='text'
                                placeholder='title'
                                name='name'
                                textError='product name needs to be at least 50 characters long.letters and numbers'
                                validation={validation.name}
                                value={data.name}
                            />
                            <select onChange={onCategory}>
                                <option> category </option>
                                {
                                    categories.map(e => (
                                        <option key={e.name} value={e.name}>{e.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <TextArea
                            className={styles.description}
                            error={descriptionError}
                            setError={setDescriptionError}
                            data={data}
                            setData={setData}
                            type='text'
                            placeholder='description'
                            name='description'
                            textError='only letters and numbers'
                            validation={validation.name}
                            value={data.description}
                        />
                    </div>
                    <div className={styles.imgInContent}>
                        {
                            !imageError && <img alt='' className={styles.img} src={data.imgOnScreen} />
                        }
                        <Inputs
                            className={styles.imgInput}
                            error={imageError}
                            setError={setImagetError}
                            data={data}
                            setData={setData}
                            type='url'
                            placeholder='url image'
                            name='imgOnScreen'
                            textError='product image needs to be a Valid URL'
                            validation={validation.image}
                            value={data.imgOnScreen}
                        />
                    </div>
                </div>
                <div className={styles.butContent}>
                    {
                        (
                            !nameError
                            && !descriptionError
                            && !imageError
                            && data.name !== ''
                            && data.description !== ''
                            && data.imgOnScreen !== ''
                            && !categoryError
                        ) ?
                            <button className={styles.butSave} type='submit'>save</button>
                            :
                            <button className={styles.butDisabled} type='submit' disabled>save</button>
                    }
                    <button className={styles.butClear} onClick={onClear}>clear</button>
                </div>
            </form>
            {
                toggle &&
                <form className={styles.contentStock} onSubmit={onSubmitTwo}>
                    <div className={styles.contentQuantity}>
                        <span className={styles.span}>Quantity</span>
                        <input type='button' className={styles.butStock} onClick={decrement} value='-' />
                        <span className={styles.quantity}>{stock.quantity}</span>
                        <input type='button' className={styles.butStock} onClick={increment} value='' />
                    </div>
                    <input className={styles.unitPrice} type='number' onChange={onPrice} placeholder='unit_price' value={stock.unit_price}></input>
                    <button type='submit' className={styles.submitStock}>save</button>
                </form>
            }
        </div >
    )
}

export default ProductForm