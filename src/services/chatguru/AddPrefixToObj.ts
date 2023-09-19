export function addPrefixToObjectKeys(obj: {
    [key: string]: any
}, prefix: string) {
    const newObj: {
        [key: string]: any
    } = {};
    for (const key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[prefix + key] = obj[key];
        }
    }
    return newObj;
}