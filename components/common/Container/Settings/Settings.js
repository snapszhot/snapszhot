import PropTypes from 'prop-types'
import { useGuessContext } from '@lib/use-guess-context'

import { Modal } from '@components/common'
import styles from './Settings.module.scss'

function SettingToggle({ checked, disabled, id, label, onChange }) {
    return (
        <div className={styles.settingToggle}>
            <input
                checked={checked}
                disabled={disabled}
                className={styles.settingToggleInput}
                id={id}
                onChange={onChange}
                type='checkbox'
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

SettingToggle.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
}

export default function Settings({ isOpen, toggleModal }) {
    const { enabledHints, setEnabledHints } = useGuessContext()

    return (
        <Modal isOpen={isOpen} title='Settings' toggleModal={toggleModal}>
            <SettingToggle
                checked={enabledHints.director}
                id='director'
                label='Show Director Hints'
                onChange={() =>
                    setEnabledHints({
                        ...enabledHints,
                        director: !enabledHints.director,
                    })
                }
            />
            <SettingToggle
                checked={enabledHints.year}
                id='year'
                label='Show Year Hints'
                onChange={() =>
                    setEnabledHints({
                        ...enabledHints,
                        year: !enabledHints.year,
                    })
                }
            />
            <SettingToggle
                checked={enabledHints.subtitles}
                id='subtitles'
                label='Show Subtitles'
                onChange={() =>
                    setEnabledHints({
                        ...enabledHints,
                        subtitles: !enabledHints.subtitles,
                    })
                }
            />
        </Modal>
    )
}

Settings.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
}
