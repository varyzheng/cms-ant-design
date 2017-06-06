export function dataToEditableData(data){
    for(let obj of data) {
        for(let key in obj) {
            if (typeof (obj[key]) !== "function" && typeof (obj[key]) !== "object") {
                obj[key] = {editable:false, value:obj[key]};
            }
        }
    }
    return data;
}

export function editableDataToData(data){
    if (typeof (data) === 'object' && data.length > 0) {
        for (let obj of data) {
            for(let key in obj) {
                if (typeof (obj[key]) !== "function" && typeof (obj[key]) !== "object") {
                    obj[key] = obj[key]['value']
                }
            }
        }

    }else{
        for(let key in data) {
            if (typeof(data[key]) === "object") {
                data[key] = data[key]['value'];
            }
        }
    }
    
    return data;
}