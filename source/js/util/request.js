function request(url, method = 'GET', params = {}) {
    let formData = new FormData();
    for (let name in params) {
        formData.append(name, params[name]);
    }

    return fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
}

export default request;