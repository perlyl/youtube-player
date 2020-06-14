import * as constants from './Constants';
export const MakeGetRequest = (url, params, next) => {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (xhr.status != 200) {
            return next(xhr)
        }
        
        next(null, xhr.response);
    };
    xhr.onerror = function () {
        next(xhr);
    };
    let urlWithParam = url
    if(params){
        let searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => searchParams.set(key, params[key]));
        urlWithParam = url + "?" + searchParams;
    }
    xhr.open('GET', urlWithParam)
    xhr.send()
}

export const MakePostRequest = (url, payload, next) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            return next(xhr.response)
        }
        next(null, xhr.response);
    };
    xhr.onerror = function () {
        next(xhr.response);
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(payload));
}

export const localStorageSet = (key, value) => {
    localStorage.setItem(key, value);
}

export const localStorageRemove = (key) => {
    localStorage.removeItem(key);
}

export const localStorageGet = (key) => {
    return localStorage.getItem(key)
    // if (localStorage.getItem(key)) {
    //     return true
    //     //JSON.parse(localStorage.getItem(key))
    // }

    // return false;
}
export const HandleServerError = () => {
    alert("The server encountered an internal error or misconfiguration and was enable to complete your request.")
}

export const ValidateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}


export const addActionLog = (action,value) => {
    const currentUser = JSON.parse(localStorageGet(constants.LOCAL_STORAGE_KEY.USER_DETAILS))
    MakePostRequest(constants.SERVER_URL + 'addActionLog', {userId:currentUser, fullName:currentUser.fullName, action:action, value:value}, (err, res) => {
        if (err) {
            HandleServerError()
        }
    })
}

