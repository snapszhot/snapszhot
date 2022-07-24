import PropTypes from 'prop-types'
import { useField } from 'formik'
import ReactSelect from 'react-select'

export default function Select({ options }) {
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField({
        id: 'guess',
        name: 'guess',
        type: 'select',
    })
    const { setValue } = helpers

    return (
        <ReactSelect
            components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
            }}
            instanceId='guess'
            name={field.name}
            onBlur={field.onBlur}
            onChange={option => setValue(option.value)}
            openMenuOnClick={false}
            openMenuOnFocus={false}
            options={options}
            placeholder='Guess a film'
            value={options?.find(option => option.value === field.value) || ''}
        />
    )
}

Select.propTypes = {
    options: PropTypes.array,
}
