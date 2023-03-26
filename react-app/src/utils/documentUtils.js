
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

export const sortObjectsByName = arr => {
    return arr.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
}

export const formatDate = date => {
    let newDate = date.split('-')
    const formattedDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`;

    return formattedDate
}

export const dateForInput = date => {
    let dateParts = date.split("/");
    let dateObject = new Date(dateParts[2], dateParts[0]-1, dateParts[1]);
    return dateObject.toISOString().slice(0,10)
}

export const clearEmptyServices = (services,empyService) =>{
    return services
    //need work
}
