"use strict";

let player_1 = localStorage.getItem("player_1")
let player_2 = localStorage.getItem("player_2")
if (!player_1){
    player_1 = "Player One"
}
if (!player_2){
    player_2 = "Player Two"
}

let define_players = (function(){
    function _addPlayers(){
        let outer_container = document.querySelector(".outer_container2");
        outer_container.setAttribute("class","outer_container2_new");
    
        let players = document.createElement("div");
        players.setAttribute("class","players");
        outer_container.insertBefore(players,document.querySelector(".open_boxes"));
    
        let player_1_name = document.createElement("div");
        player_1_name.setAttribute("class","player_1_name");
        players.appendChild(player_1_name);
    
        let player_2_name = document.createElement("div");
        player_2_name.setAttribute("class","player_2_name");
        players.appendChild(player_2_name);
    
        let h3_1 = document.createElement("h3");
        h3_1.textContent = player_1;
        let h3_2 = document.createElement("h3");
        h3_2.textContent = "X";
        player_1_name.appendChild(h3_1);
        player_1_name.appendChild(h3_2)
    
        let h3_3 = document.createElement("h3");
        h3_3.textContent = player_2;
        let h3_4 = document.createElement("h3");
        h3_4.textContent = "O";
        player_2_name.appendChild(h3_3);
        player_2_name.appendChild(h3_4)
    }
    
    function initNames(){
        _addPlayers();
    }
    return {initNames}
})();
let stop_playing = (function(){
    function _initButton(){
        let stop_playing = document.querySelector('.stop_playing');
        let stop_playing_float = document.querySelector('.stop_playing_float');
        stop_playing_float.addEventListener('click',_goBack);
        stop_playing.addEventListener('click',_goBack);
    }
    function _goBack(){
        location.replace("index.html");
    }
    function stopPlaying(){
        _initButton();
    }
    return {stopPlaying}
})();

stop_playing.stopPlaying();
define_players.initNames();


let user_interaction = (function(){
    
    let count = 0;//to keep track of which player is playing
    let master_flag = -1;//to keep track of game status
    const truthys = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
    let flags = [];
    
    for(let i = 0 ; i < 9; i++){
        flags[i] = 0;
    }

    function _initElements(){
        let boxes = document.querySelectorAll(".box_button");
        boxes.forEach((item)=>{
            item.addEventListener('click',_takeAction);
        })
    }
    function _takeAction(){
        if (master_flag == -1){
            let box = (this.getAttribute("class")).split(" ")[1];
            if(count % 2 == 0){//for first player
            if (flags[box-1]==0){
                    let p = document.createElement("p");
                    p.textContent = "X";
                    p.setAttribute("class","x");
                    this.appendChild(p);
                    flags[box-1] = "X";
                    _check_vals("X");//check if player won
                    count++;
                    // console.log(flags);
                }
            }
            else{//for second player this if-else black can be shorten using a function
                if (flags[box-1] == 0){
                        let p = document.createElement("p");
                        p.textContent = "O";
                        p.setAttribute("class","o");
                        this.appendChild(p);
                        flags[box-1] = "O";
                        _check_vals("O");//check if player won
                        count++;
                        console.log(flags);
                    }
            }
           
        }
        if(count == 9 && master_flag == -1){
            let h1 = document.createElement("h1");
                h1.setAttribute("class","winning_message");
                h1.textContent = "Match is Draw!";
                document.querySelector(".floating_box_container").insertBefore(h1,document.querySelector(".stop_playing_float"));
                document.querySelector(".floating_box").setAttribute("class","floating_box toggle_on");
                document.querySelector(".floating_box_container").setAttribute("class","floating_box_container toggle_on_container");
            console.log("It's a Draw");
        }                     
        // console.log("===================================")

    }


    function _check_vals(symbol){
        let flag = -1;
        // console.log(symbol)
        if (master_flag == -1){
            flag = _checkDiag(symbol);
            // console.log(flag)
            if (flag != -1){
                master_flag = flag;
                if (symbol == "X"){
                  return  _playerOneWon();
                }
                else{
                    return _playerTwoWon();
                }
            }
            flag = _checkOthers(symbol);
            if (flag != -1){
                master_flag = flag;
                if (symbol == "X"){
                    return _playerOneWon();
                }
                else{
                   return _playerTwoWon();
                }
            }
        }
        else{
            console.log("Game Over");
        }

    }

    function _checkOthers(symbol){
        let temp_count = 0;
        for( let i = 0; i < 6; i++){
            temp_count = 0;
            let truthys_arr = truthys[i];
            // console.log(truthys_arr);
            for(let j = 0; j < 3; j++){
                let temp = truthys_arr[j];
                // console.log(temp)
                for(let k = 0; k < 9;k++){
                    if ( flags[k] == symbol && temp == k){
                        // console.log(flags[k],symbol,temp)
                        temp_count += 1;
                        
                    }
                }
            }
            // console.log("count",temp_count);
            if (temp_count >=3){
                // console.log(temp_count)
                return 1;
            }
        }
        return -1;
    }
    
    function _checkDiag(symbol){  
        let temp_count = 0;
        for (let i = 0; i < 9; i++){
            if (flags[i]==symbol){
                // console.log(flags[i],symbol)
                // console.log((i)/3,(i)%3);
                // console.log(Math.trunc((i)/3),Math.trunc((i)%3));
                if (Math.trunc((i)/3)==Math.trunc((i)%3)){
                //here if (x,y) are the coordinates for the symbols on the tic-tac-toe then x = i/3 and y = i%3
                    // console.log(symbol);
                    temp_count += 1;
                }
            }
        }
        if (temp_count >= 3){
            return temp_count;
        }
        temp_count = 0;
        for (let i = 0; i < 9; i++){
            if (flags[i]==symbol){
                if ((Math.trunc(i/3)+Math.trunc(i%3))==2){
                    temp_count += 1;
                }
            }
        }
        if (temp_count >= 3){
            return temp_count;
        }
        return -1;
    }
    function _playerOneWon(){
        let h1 = document.createElement("h1");
        h1.setAttribute("class","winning_message");
        h1.textContent = `${player_1} Won!`;
        document.querySelector(".floating_box_container").insertBefore(h1,document.querySelector(".stop_playing_float"));
        document.querySelector(".floating_box").setAttribute("class","floating_box toggle_on");
        document.querySelector(".floating_box_container").setAttribute("class","floating_box_container toggle_on_container");
        console.log("Player One Won!");
        
        return 1;
    }
    function _playerTwoWon(){
        let  h1 = document.createElement("h1");
        h1.setAttribute("class","winning_message");
        h1.textContent = `${player_2} Won!`;
        document.querySelector(".floating_box_container").insertBefore(h1,document.querySelector(".stop_playing_float"));
        document.querySelector(".floating_box_container").setAttribute("class","toggle_on_container floating_box_container");
        document.querySelector(".floating_box").setAttribute("class","floating_box toggle_on");
        console.log("Player Two Won!");
        return 1;
    }
    function initUserInteraction(){
        _initElements();
    }
    return {initUserInteraction}
})();

user_interaction.initUserInteraction();