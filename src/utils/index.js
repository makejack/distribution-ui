export function promiseRequest(http) {
    return new Promise((resolve, reject) => {
        http.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}