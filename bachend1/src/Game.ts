import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess
    public startTime:Date
    public moveCount =0;


    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.board=new Chess();
        this.startTime=new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }

    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
        console.log(move)
        //Validation using Zod 
        if(this.moveCount%2==0 && socket!=this.player1){
            return;
        }
        if(this.moveCount%2==1 && socket!=this.player2){
            return;
        }

        console.log("didnot early return")
        //Validation
        try{
            this.board.move(move)

        }
        catch(e){
            console.log(e)
            return;
        }
        console.log("move succeded")


        //Check if Game ends
        if(this.board.isGameOver()){
            console.log("Over")
        //Send the updated board to both players
        this.player1.emit(JSON.stringify({
            type: GAME_OVER,
            payload:{
                winner:this.board.turn()=="w"?"black":"white"
            }
        }))
        

        //Send the updated board to both players
        this.player2.emit(JSON.stringify({
            type: GAME_OVER,
            payload:{
                winner:this.board.turn()=="w"?"black":"white"
            }
        }))

        return;
        }

        //Send the updated board to both players
        if(this.moveCount==0){
            console.log("player1")
            this.player2.send(JSON.stringify({
                type: MOVE,
                // payload:{
                //     board:this.board.fen()
                // }
                payload:move
            }))
        }
        else{
            console.log("player2")
            this.player1.send(JSON.stringify({
                type: MOVE,
                // payload:{
                //     board:this.board.fen()
                // }
                payload:move
            }))
        }
        this.moveCount++;

        

    }
}