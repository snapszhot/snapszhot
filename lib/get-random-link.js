import getRandomInt from '@lib/get-random-int'
import { getPlayedGames } from '@lib/storage'

function checkIfAllPlayed(min, max, played) {
    let numMissing = 0

    for (let i = min; i <= max; i++) {
        if (!played.includes(i)) {
            numMissing++
        }
    }

    return numMissing === 0
}

export default function getRandomLink({ day, mostRecentDay }) {
    const EARLIEST_GAME = 41

    const playedGames = getPlayedGames()
    const exclude = day ? [...playedGames, day] : playedGames
    const allPlayed = checkIfAllPlayed(EARLIEST_GAME, mostRecentDay, exclude)

    if (allPlayed) {
        return '/archive'
    }

    const random = getRandomInt(EARLIEST_GAME, mostRecentDay, exclude)

    return `/day/${random}`
}
