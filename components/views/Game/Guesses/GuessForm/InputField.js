import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { captureException } from '@sentry/nextjs'

import { useField, useFormikContext } from 'formik'
import axios from 'axios'
import debouce from 'lodash.debounce'

import { CircleLoader } from '@components/common'
import Prefill from './Prefill'
import styles from './InputField.module.scss'

export default function InputField({ name, setError }) {
    const [showPrefill, setShowPrefill] = useState(false)
    const [options, setOptions] = useState(null)
    const [loading, setLoading] = useState(false)

    const { setValues } = useFormikContext()
    const [field] = useField({
        id: name,
        name: name,
        type: 'text',
    })

    const searchAPI = async query => {
        try {
            const { data } = await axios({
                url: '/api/search',
                method: 'GET',
                params: { query },
            })

            setOptions(data)
            setError(false)
            setLoading(false)
        } catch (error) {
            captureException(error)
            setError(true)
            setLoading(false)
        }
    }

    const handleChange = async event => {
        event.preventDefault()
        const { value } = event.target
        const hasValue = value !== ''

        setLoading(true)
        setValues({
            altEngTitle: '',
            altLangTitle: '',
            altLangTitlePhonetic: '',
            director: '',
            engTransTitle: '',
            guess: value,
            originalTitlePhonetic: '',
            releaseYear: '',
        })
        setShowPrefill(hasValue)

        if (hasValue) {
            debouncedSearch(value)
        } else {
            setLoading(false)
        }
    }

    const debouncedSearch = useMemo(() => {
        return debouce(searchAPI, 200)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handlePrefillSelect = item => {
        setValues({
            altEngTitle: item.altEngTitle,
            altLangTitle: item.altLangTitle,
            altLangTitlePhonetic: item.altLangTitlePhonetic,
            director: item.director,
            engTransTitle: item.engTransTitle,
            guess: item.originalTitle,
            originalTitlePhonetic: item.originalTitlePhonetic,
            releaseYear: item.releaseYear,
        })
        setShowPrefill(false)
    }

    return (
        <div className={styles.container}>
            <div>
                <input
                    className={styles.input}
                    placeholder='Search for a movie or director...'
                    type='text'
                    {...field}
                    onChange={handleChange}
                />
                {loading && (
                    <div className={styles.loader}>
                        <CircleLoader />
                    </div>
                )}
            </div>
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
    setError: PropTypes.func,
}
