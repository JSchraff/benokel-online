import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid';

let app = admin.initializeApp();
export const initialize_game = functions.https.onRequest((request, response) => {
    let db = app.database();

    let gameData = {
        "id": uuid.v4(),
    };

    let prom: Promise<void>;
    prom = db.ref().set("test",JSON.stringify(gameData));
    response.send(gameData);
    return prom
});
