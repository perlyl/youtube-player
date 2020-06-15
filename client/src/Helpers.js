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
    if (params) {
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

export const LocalStorageSet = (key, value) => {
    localStorage.setItem(key, value);
}

export const LocalStorageRemove = (key) => {
    localStorage.removeItem(key);
}

export const LocalStorageGet = (key) => {
    return localStorage.getItem(key)
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

export const GetDuration = (timeStart, timeEnd = new Date()) => {
    var seconds = Math.floor((timeEnd - (timeStart)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    return hours + ":" + minutes + ":" + seconds
}

