import { useState } from 'react'
import PropTypes from 'prop-types'
import { useField, useFormikContext } from 'formik'

import Prefill from './Prefill'
import styles from './InputField.module.scss'

export default function InputField({ name, options }) {
    const [showPrefill, setShowPrefill] = useState(false)
    const { setFieldValue, setValues } = useFormikContext()
    const [field] = useField({
        id: name,
        name: name,
        type: 'text',
    })

    const handleChange = event => {
        event.preventDefault()
        const { value } = event.target
        setFieldValue('guess', value)
        setShowPrefill(value !== '')
    }

    const handlePrefillSelect = item => {
        setValues({
            guess: item.movie,
            director: item.director,
            releaseYear: item.releaseYear,
        })
        setShowPrefill(false)
    }

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder='Guess a movie...'
                type='text'
                {...field}
                onChange={handleChange}
            />
            <Prefill
                handlePrefillSelect={handlePrefillSelect}
                options={options}
                showPrefill={showPrefill}
                value={field.value}
            />
        </div>
    )
}

InputField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
}
