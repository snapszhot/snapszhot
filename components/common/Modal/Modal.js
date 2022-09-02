import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import styles from './Modal.module.scss'

ReactModal.setAppElement('#__next')

export default function Modal({ children, isOpen, title, toggleModal }) {
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
    }

    return (
        <ReactModal
            className={styles.modal}
            contentLabel={title}
            isOpen={isOpen}
            onRequestClose={toggleModal}
            style={modalStyles}
        >
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>{title}</h2>
                <button className={styles.close} onClick={toggleModal}>
                    &times;
                </button>
            </div>
            {children}
        </ReactModal>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    title: PropTypes.string,
}
