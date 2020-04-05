import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid';

let app = admin.initializeApp();
let db = app.database();
export const initialize_game = functions.https.onRequest((request, response) => {
    let gameId = uuid.v4();


    let prom = db.ref(gameId).set("test");
    response.send("setup new Game");
    return prom;
});
