import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";

//USer,Game


export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null
    private users:WebSocket[];

    constructor(){
        this.games=[]
        this.pendingUser=null;
        this.users=[];
    }

    addUser(socket:WebSocket){
        this.users.push(socket);
        this.addHandler(socket)
    }

    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user!=socket);
        //Stop the Game as User Left
    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString())

            //Check if the message is of type INIT_GAME
            if(message.type==INIT_GAME){
                if(this.pendingUser){
                    const game=new Game(this.pendingUser,socket);
                    this.games.push(game);
                    this.pendingUser=null;
                }
                else{
                    this.pendingUser=socket;
                }
            }


            //Check if the message is of type MOVE
            if(message.type==MOVE){
                
                console.log("inside game move")
                const game=this.games.find(game =>game.player1==socket ||game.player2==socket)
                if(game){
                    console.log("inside move if")
                    game.makeMove(socket,message.payload.move)
                }
            }

        })
    }
}