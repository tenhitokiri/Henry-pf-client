import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Inputs from '../../Inputs/Inputs'
import styles from './add-category.module.css'

const AddCategogory = () => {
  const dispatch = useDispatch()

  const validation = {
    name: /^[A-Za-z\s.,]+$/,
  }

  const [data, setData] = useState({
    name: '',
    parent_id: null
  })

  const [nameError, setNameError] = useState('')
  const [parentIdError, setParentIdError] = useState(null)


  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      dispatch()
    }
  }
  return (
    <div className={styles.background}>
      <div className={styles.maxWidth}>
        <div>Home / Admin / Add Category</div>
        <form onSubmit={onSubmit}>
          <div>
            <p>Add a category</p>
            <Inputs
              error={nameError}
              setError={setNameError}
              data={data}
              setData={setData}
              type='text'
              placeholder='title'
              name='name'
              textError='category name only letters'
              validation={validation.name}
              value={data.name}
            />
          </div>
          <p>Add a SubCategory</p>
          <button type='submit'>add</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategogory