/**
 * IDB: 
 */
export default class IDB {
    constructor(dbName, dbVersion) {
        this._instance = null;
        this._objectStore = null;
        this._dbName = dbName;
        this._dbVersion = dbVersion;
    }

    _openAtransaction() {
        return this._instance
            .transaction([this._objectStore], 'readwrite')
            .objectStore(this._objectStore);
    }

    open(store) {
        this._objectStore = store;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._dbName, this._dbVersion);
            
            request.addEventListener('upgradeneeded', event => {
                this._instance = event.target.result;
                
                if (this._instance.objectStoreNames.contains(this._objectStore))
                    this._instance.deleteObjectStore(this._objectStore);
                
                const objectStore = this._instance.createObjectStore(this._objectStore, { 
                    autoIncrement: true, 
                    keyPath: 'id' 
                });
            }, false);

            request.addEventListener('success', event => {
                this._instance = event.target.result;
                resolve(this);
            }, false);

            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    insert(object) {
        return new Promise((resolve, reject) => {
            const transaction = this._openAtransaction('products');
            const request = transaction.add(object);

            request.addEventListener('success', event => 
                resolve(event.target.result), false);
            
            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            const transaction = this._openAtransaction(this._objectStore);
            const request = transaction.get(id);

            request.addEventListener('success', event => 
                resolve(event.target.result), false);

            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    findAll() {
        return new Promise((resolve, reject) => {
            const transaction = this._openAtransaction(this._objectStore);
            const request = transaction.openCursor();
            const items = [];

            request.addEventListener('success', event => {
                const cursor = event.target.result;
                
                if (cursor && items.push(cursor.value))
                    cursor.continue();
                
                resolve(items);
            }, false);
            
            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    update(object) {
        return new Promise((resolve, reject) => {
            const transaction = this._openAtransaction(this._objectStore);
            const request = transaction.put(object);

            request.addEventListener('success', event => 
                resolve(object), false);
            
            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const transaction = this._openAtransaction(this._objectStore);
            const request = transaction.delete(id);

            request.addEventListener('success', event => 
                resolve({ message: 'Object deleted successfully!' }), false);

            request.addEventListener('success', event => 
                reject(event.target.error), false);
        });
    }
}
