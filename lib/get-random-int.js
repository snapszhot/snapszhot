export default function getRandomInt(min, max, exclude) {
    min = Math.ceil(min)
    max = Math.floor(max)
    const number = Math.floor(Math.random() * (max - min + 1)) + min

    return exclude.includes(number) ? getRandomInt(min, max, exclude) : number
}
