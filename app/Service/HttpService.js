/**
 * HttpService: 
 */
export default class HttpService {
    constructor(resource) {
        this._resource = resource;
    }

    async findAll() {
        try {
            const request = await fetch(this._resource);
            const data = await request.json();
            
            if (!data.length)
                return new Error('Not found!');

            return data;
        } catch (e) {
            console.warn(e.toString());
        }
    }

    async findById(id) {
        try {
            const request = await fetch(this._resource);
            const data = await request.json();
            
            if (!data.length)
                return new Error('Not found!');

            return await data.filter(item => id === item.id)[0];
        } catch (e) {
            console.warn(e.toString());
        }
    }
}
