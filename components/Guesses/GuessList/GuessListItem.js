import PropTypes from 'prop-types'

export default function GuessListItem({ guess }) {
    return <li>{guess}</li>
}

GuessListItem.propTypes = {
    guess: PropTypes.string,
}
