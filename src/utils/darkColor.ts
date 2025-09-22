export const darkColor = () => {
    const hue = Math.floor(Math.random() * 360)

    const saturation = Math.floor(Math.random() * 70)

    const lightness = Math.floor(Math.random() * 20) + 40

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}