export const generateKey = () => {
    const array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let key = ''
    for( let i=0;i<5;i++){
        key += array[Math.floor(Math.random() * array.length)]
    }
    return key
}
