import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Inputs from '../Inputs/Inputs'
import { addPRODUCT } from '../../redux/Products/productActions'
import styles from './productForm.module.css'
import TextArea from '../Inputs/TextArea'
import { fetchCategories } from '../../redux'

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.categories_detail)

    useEffect(() => {
        dispatch(fetchCategories())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const validation = {
        name: /^[A-Za-z0-9\s.,]+$/,
        image: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/
    }
    const [data, setData] = useState({
        name: '',
        description: '',
        category_id: '',
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
            category_id: '',
            images: [],
            imgOnScreen: ''
        })
    }
    const onToggle = () => {
        setToggle(!toggle)
    }
    const onCategory = (e) => {
        setToggle()
        setData({ ...data, category_id: e.target.id })
        setCategoryError(false)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !descriptionError && !imageError && !categoryError) {
            setData({ ...data, images: data.images.push(data.imgOnScreen) })
            dispatch(addPRODUCT(data))
            onClear()
            navigate('/add-produc/done')
            console.log(data)
        }
    }
    return (
        <div className={styles.background}>
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
                            <label
                                className={styles.categories}
                                onClick={onToggle}
                            >
                                categories
                                <ul>
                                    {
                                        toggle &&
                                        categories.map(e => (
                                            <li
                                                key={e.category_id}
                                                id={e.category_id}
                                                onClick={onCategory}
                                            >
                                                {e.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </label>
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
        </div>
    )
}

export default ProductForm