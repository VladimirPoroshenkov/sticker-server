class StickerApi {
    static URL = 'https://62054479161670001741b708.mockapi.io/stickers';

    static request(url = ' ', method = 'GET', data) {
        return fetch(`${this.URL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json, charset=UTF-8',
            },
                body: data ? JSON.stringify(datd) : undefined,
            })
            .then((res) => {
                if(res.ok) {
                return res.json()
                }

                throw new Error(`Can not execute request to server`);
            });
    }

    static getList(){
        return this
        .request()
        .catch(() => {
            throw new Error (`Can not retrieve Stickers List from server`)
        });
    }

    static create(data) {
        return this
        .request('', 'POST', data)
        .catch(() => {
            throw new Error (`Can not create Stickers on server`)
        });
    }

    static update (id, data) {
        return this
        .request(`${id}`, 'PUT', data)
        .catch(() => {
            throw new Error (`Can not update Stickers on server`)
        });
    }

    static delete(id) {
        return this
        .request( '/${id', 'DELETE')
        .catch(() => {
            throw new Error (`Can not delete Stickers on server`)
        });
    }
}