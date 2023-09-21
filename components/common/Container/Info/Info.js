import PropTypes from 'prop-types'

import { Modal } from '@components/common'

export default function Settings({ isOpen, toggleModal }) {
    return (
        <Modal
            isOpen={isOpen}
            scrollable={true}
            title='Info'
            toggleModal={toggleModal}
        >
            <p>
                You have six chances to guess each day’s film based on a series
                of image clues. In theory, the clues become more obvious toward
                the end.
            </p>
            <p>
                To make a guess, enter the name of a film or director into the
                search bar, click on your choice, and then hit the submit
                button. If you have no guess, simply hit the submit button to
                move on to the next image.
            </p>
            <p>
                If you guess a film that is within five years of the correct
                release date or another film by the correct director, the game
                will give you a hint to let you know. However, the director
                field must match exactly, including any co-directors. Each of
                these hints can be disabled in the settings. In addition, the
                subtitle for each day may be a clue or may be a distraction.
            </p>
            <p>
                Films can come from any country or genre and from any time since
                1890 or so. As much as possible, all images honor the films’
                intended presentation including aspect ratio. Prefill titles of
                films available to guess are a work in progress.
            </p>
            <p>
                All films and images chosen by swo17 at criterionforum.org. Site
                designed by skilar at criterionforum.org.
            </p>
        </Modal>
    )
}

Settings.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
}
