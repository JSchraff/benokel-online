import * as functions from 'firebase-functions';
import * as uuid from 'uuid';

export const initialize_game = functions.https.onRequest((request, response) => {


    let gameData = {
        "id": uuid.v4(),
    };
    response.send(gameData);
});
