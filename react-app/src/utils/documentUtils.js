
export const sumTotal = servicesObj => {
    return Object.values(servicesObj).reduce((acc, el) => {
        return acc + el.price * el.quantity;
    }, 0)
}

export const removeDocService = (serviceList,numServices,removeIndex) =>{
    let returnObj = {}
    for(let i=1;i<numServices;i++){
        if(serviceList[1]){

        }
    }
}


export const removeKey = (obj, removeKey) => {
    let newObj = {}
    let len = Object.keys(obj).length
    let sub = 0;
    for(let i=1;i<len;i++){
        if(i==removeKey){
            sub = 1
        }
        newObj[i] = obj[i+sub]

    }
    return newObj
};
