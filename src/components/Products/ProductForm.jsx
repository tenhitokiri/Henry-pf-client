import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Inputs from '../Inputs/Inputs'
import { addPRODUCT } from '../../redux/Products/productActions'
import styles from './productForm.module.css'
import TextArea from '../Inputs/TextArea'

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const validation = {
        name: /^[A-Za-z0-9\s.,]+$/,
        image: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/
    }
    const [data, setData] = useState({
        name: '',
        description: '',
        images: [],
        imgOnScreen: ''
    })

    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [imageError, setImagetError] = useState('')

    const onClear = () => {
        setData({
            name: '',
            description: '',
            images: [],
            imgOnScreen: ''
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !descriptionError && !imageError) {

            setData({ ...data, images: data.images.push(data.imgOnScreen) })
            dispatch(addPRODUCT(data))
            onClear()
            navigate('/add-produc/done')
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
                            <div className={styles.categories}>categories</div>
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