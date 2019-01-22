import axios from 'axios';

export function httpPost(url, formObj, callFun) {
    axios.post('/api' + url, formObj)
    .then(res => {
        callFun(res.data)
    })
    .catch(err => {
        alert(err)
    })
}

export function httpGet(url, callFun, formObj = {}) {
    axios.get('/api' + url, formObj)
    .then(res => {
        callFun(res.data)
    })
    .catch(err => {
        alert(err)
    })
}

export function httpBinaryPost(url, formObj, callFun) {
    axios.post('/api' + url, formObj, {
        'Content-Type': 'multiple/form-data'
    })
    .then(res => {
        callFun(res.data)
    })
    .catch(err => {
        alert(err)
    })
}

