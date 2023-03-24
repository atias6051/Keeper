

//This function will keep all decimal numeric strigns to up to 2 decimal digit
export const formatNumString = numString => {
    let n = numString.split('.')
    let temp = n[0]
    if(n.length>1){
        temp+=`.${n[1].slice(0,2)}`
    }
    return temp
}
