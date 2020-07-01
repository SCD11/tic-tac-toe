"use strict";

let homePage = (function(){
    //we are using Immediately Invoked Function Expression combined with closures
    function _initVales(){
        let play_btn = document.querySelector(".play");
        let player1_name = document.querySelector(".player_1");
        let player2_name = document.querySelector(".player_2");
        
        play_btn.addEventListener('click', _play.bind(_initVales,player1_name,player2_name));   

        console.log("all values initialised")
    
    }
     
    function _play(x,y){
        localStorage.setItem("player_1",x.value);
        localStorage.setItem("player_2",y.value);
        // console.log(localStorage.getItem("player_1"))
        location.replace("./game_display.html")//NOTICE THIS**
    }

    function startGame(){
        _initVales()
    }

    return {startGame}
})();
homePage.startGame()