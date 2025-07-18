"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log(move);
        //Validation using Zod 
        if (this.moveCount % 2 == 0 && socket != this.player1) {
            return;
        }
        if (this.moveCount % 2 == 1 && socket != this.player2) {
            return;
        }
        console.log("didnot early return");
        //Validation
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        console.log("move succeded");
        //Check if Game ends
        if (this.board.isGameOver()) {
            console.log("Over");
            //Send the updated board to both players
            this.player1.emit(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white"
                }
            }));
            //Send the updated board to both players
            this.player2.emit(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white"
                }
            }));
            return;
        }
        //Send the updated board to both players
        if (this.moveCount == 0) {
            console.log("player1");
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                // payload:{
                //     board:this.board.fen()
                // }
                payload: move
            }));
        }
        else {
            console.log("player2");
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                // payload:{
                //     board:this.board.fen()
                // }
                payload: move
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
