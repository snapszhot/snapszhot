import { useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import Prefill from './Prefill'
import styles from './InputField.module.scss'

export default function InputField({ name, options }) {
    const [showPrefill, setShowPrefill] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField({
        id: name,
        name: name,
        type: 'text',
    })
    const { setValue } = helpers

    const handleChange = event => {
        event.preventDefault()
        const { value } = event.target
        const show = value !== ''
        setValue(value)
        setShowPrefill(show)
    }

    const handlePrefillSelect = value => {
        setValue(value)
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
