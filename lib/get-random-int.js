// The maximum is exclusive and the minimum is inclusive
export default function getRandomInt(min, max, exclude) {
    min = Math.ceil(min)
    max = Math.floor(max)
    const number = Math.floor(Math.random() * (max - min) + min)

    return exclude.includes(number) ? getRandomInt(min, max, exclude) : number
}
