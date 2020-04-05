import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid';

let app = admin.initializeApp();
export const initialize_game = functions.https.onRequest((request, response) => {
    let db = app.database();
    db.ref().set("test");



    let gameData = {
        "id": uuid.v4(),
    };
    response.send(gameData);
});
