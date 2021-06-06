import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('documents');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY NOT NULL, type TEXT NOT NULL, uri TEXT NOT NULL, loadId INTEGER NTO NULL)', 
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

export const saveDocument = (type, uri, loadId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO documents (type, uri, loadId) VALUES (?, ?, ?);`, 
                [type, uri, loadId],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

export const fetchDocuments = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM documents', 
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};
