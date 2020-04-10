import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid';

let app = admin.initializeApp();
let db = app.database().ref();

export const initialize_lobby = functions.https.onRequest((request, response) => {
    let gameId = uuid.v4();
    let playerId = request.query.player;

    db.child("games").child(gameId).child("players").child("player1").child("id").set(playerId);
    db.child("games").child(gameId).child("status").set("lobby");
    response.send(gameId)
});

export const join_lobby = functions.https.onRequest(async (request, response) => {
    let gameId = request.query.id;
    let playerId = request.query.player;

    //look if game id is available
    let game = await db.child("games").child(gameId).once("value");
    if (game.val() === null){
        response.send("could not find lobby with id "+gameId);
        return;
    }

    //look if gamestate in lobby
    let state = await db.child("games").child(gameId).child("status").once("value");
    if (state.val() !== "lobby"){
        response.send("game not in lobby state");
        return;
    }

    //look if place is availble
    let players = db.child("games").child(gameId).child("players");
    let success = false;
    for(let i =1;i<=4;i++){
        await players.child("player" + i).child("id").transaction(
            player => {
                if (player === null) {
                    return playerId;
                } else {
                    return;
                }
            },
            (error, committed) => {
                if (!committed) {
                    console.log("couls not add as player" +i);
                } else {
                    success = true;
                }
            }
        );
        if(success){
            break;
        }

    }
    if (success){
        response.send("joined");
        return;
    }else{
        response.send("lobby full");
    }



});


export const start_game = functions.https.onRequest((request, response) => {
    let gameId = request.query.id;

    let gamedb = db.child("games").child(gameId);

    let cardStack = [
                        "HA","H10","HK","HO","HU",
                        "BA","B10","BK","BO","BU",
                        "KA","K10","KK","KO","KU",
                        "SA","S10","SK","SO","SU",
                        "HA","H10","HK","HO","HU",
                        "BA","B10","BK","BO","BU",
                        "KA","K10","KK","KO","KU",
                        "SA","S10","SK","SO","SU"
                    ];

    //shuffle Cards
    for(let i = cardStack.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = cardStack[i];
        cardStack[i] = cardStack[j];
        cardStack[j] = temp;
    }

    //hand out cards 4 Persons
    let dap = cardStack.slice(0,4);
    let player1 = cardStack.slice(5,14);
    let player2 = cardStack.slice(14,23);
    let player3 = cardStack.slice(23,32);
    let player4 = cardStack.slice(32,40);

    gamedb.child("dap").set(dap);
    gamedb.child("players").child("player1").child("hand").set(player1);
    gamedb.child("players").child("player2").child("hand").set(player2);
    gamedb.child("players").child("player3").child("hand").set(player3);
    gamedb.child("players").child("player4").child("hand").set(player4);

    gamedb.child("status").set("started");
    response.send("setup Game for Lobby: "+ gameId);
});