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
                if (typeof (obj[key]) === "object") {
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

export function dataToValueLabelData(list, key, text){
    let array = [];
    for (let obj of list) {
        array.push({label:obj[text], value:obj[key]});
    }
    return array;
}

export function clone(object) {
    let type = typeof(object);
    if (type === "undefined") {
        return undefined;
    }
    if (type === "number" || type === "string" || type === "boolean") {
        return object;
    }
    if (typeof(object[0])) {
        return cloneArray(object);
    }else{
        return cloneObject(object);
    }
}

export function cloneArray(object) {
    let array = [];
    for (let obj of object) {
        array.push(cloneObject(obj));
    }
    return array;
}

export function cloneObject(object) {
    let obj = {};
    for (let key in object) {
        obj[key] = object[key];
    }
    return obj;
}