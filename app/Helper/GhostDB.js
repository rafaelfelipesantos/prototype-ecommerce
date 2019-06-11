/**
 * GhostDB: Abstraction layer for offline first application
 */
export default class GhostDB {
    constructor(dbName, dbVersion) {
        this._dbName = dbName;
        this._dbVersion = dbVersion;
    }

    async _openATransaction(store, mode) {
        try {
            const request = await this.open(store);
            const transaction = request.transaction([store], mode);
            return transaction.objectStore(store);
        } catch (e) {
            console.warn(e.toString());
        }
    }

    open(store) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._dbName, this._dbVersion);
            
            request.addEventListener('upgradeneeded', event => {
                const db = event.target.result;

                if (db.objectStoreNames.contains(store))
                    db.deleteObjectStore(store);
                
                db.createObjectStore(store, {
                    autoIncrement: true, 
                    keyPath: '_id'
                });
            }, false);

            request.addEventListener('success', event => 
                resolve(event.target.result), false);

            request.addEventListener('error', event => 
                reject(event.target.error), false);
        });
    }

    insert(store, object) {
        return new Promise((resolve, reject) => {
            this._openATransaction(store, 'readwrite')
                .then(objectStore => {
                    const request = objectStore.add(object);
                    
                    request.addEventListener('success', event => 
                        resolve(object), false);
                    
                    request.addEventListener('error', event => 
                        reject(event.target.result), false);
                });
        });
    }

    findAll(store) {
        return new Promise((resolve, reject) => {
            this._openATransaction(store, 'readonly')
                .then(objectStore => {
                    const request = objectStore.openCursor();
                    const items = [];

                    request.addEventListener('success', event => {
                        const cursor = event.target.result;

                        if (!(cursor && items.push(cursor.value)))
                            return resolve(items);
                        
                        cursor.continue();
                    }, false);

                    request.addEventListener('error', event => 
                        reject(event.target.error), false);
                });
        });
    }

    findById(store, id) {
        return new Promise((resolve, reject) => {
            this._openATransaction(store, 'readonly')
                .then(objectStore => {
                    const request = objectStore.get(id);
                    
                    request.addEventListener('success', event => 
                        resolve(event.target.result), false);
                    
                    request.addEventListener('error', event => 
                        reject(event.target.error), false);
                });
        });
    }

    update(store, object) {
        return new Promise((resolve, reject) => {
            this._openATransaction(store, 'readwrite')
                .then(objectStore => {
                    const request = objectStore.put(object);

                    request.addEventListener('success', event => 
                        resolve(event.target.result), false);

                    request.addEventListener('success', event => 
                        reject(event.target.error), false);
                });
        });
    }

    delete(store, id) {
        return new Promise((resolve, reject) => {
            this._openATransaction(store, 'readwrite')
                .then(objectStore => {
                    const request = objectStore.delete(id);

                    request.addEventListener('success', event => 
                        resolve(id), false);

                    request.addEventListener('error', event => 
                        reject(event.target.error), false);
                });
        });
    }
}
