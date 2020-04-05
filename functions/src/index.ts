import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid';

let app = admin.initializeApp();
export const initialize_game = functions.https.onRequest((request, response) => {
    let db = app.firestore();



    let gameData = {
        "id": uuid.v4(),
    };
    db.collection("benokel-online").add(gameData);
    response.send(gameData);
});
