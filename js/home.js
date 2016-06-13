window.onload = homeInit;
currentDirectory = "init";


function homeInit() {
    currentDirectory = "Home";
    xml_home = xmlRequest('http://ie.ce-it.ir/hw3/xml/home.xml');
    processorHome();
}

function xmlRequest(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false) ;
	xhr.send();
    return xhr.responseXML;
}

function processorHome() {
    clearPage();
 changeCurrentDirectory();
    var header = xml_home.querySelector('header');
    var games = xml_home.querySelector('games');

    var backgroundColor = header.querySelector('background').innerHTML;
    document.querySelector('header').style.backgroundColor= backgroundColor;

    var pwdColor = header.querySelector('pwd').innerHTML;


    document.querySelector('#pwd').style.color= pwdColor;
    var gameIconColor = header.querySelector('gameicon').getAttribute("color");
    var gameIconHover = header.querySelector('gameicon').getAttribute("hover");
    document.querySelector("#games  li:first-child").style.color= gameIconColor;
    document.querySelector("#games  li:first-child").style.float= "right";
    var counter = 0;

    document.querySelector("#games  li:first-child").onclick = function () {
        counter = counter +1 ;
        if (counter % 2 == 1) {
            document.querySelectorAll("#games  li:not(:first-child)")[0].style.display ="inline-block";
            document.querySelectorAll("#games  li:not(:first-child)")[1].style.display ="inline-block"
        }
        else {
            document.querySelectorAll("#games  li:not(:first-child)")[0].style.display="none";
            document.querySelectorAll("#games  li:not(:first-child)")[1].style.display="none";
        }

    };
    document.querySelector("#games  li:first-child").onmouseover = function () {
        document.querySelector("#games  li:first-child").style.color = gameIconHover;
    };
    document.querySelector("#games  li:first-child").onmouseout = function () {
        document.querySelector("#games  li:first-child").style.color = gameIconColor;
    };





    var allGames = games.querySelectorAll('game');
    var activeGames = games.querySelectorAll('game[active="true"]');

    for (var j=0 ;j<activeGames.length;j++) {
        var activeGameName = activeGames[j].querySelector('name').innerHTML;
        var li = document.createElement("li");
        li.innerHTML = activeGameName ;
        li.style.float ="right";
        li.style.marginRight= "10px";
        li.style.marginTop = "8px";
        li.setAttribute("data-activeid", j);
        var activeItemColor =  header.querySelector('game').getAttribute("color");
        li.style.color = activeItemColor ;


        var parent = document.querySelector ("#games");
        parent.appendChild(li);

        li.onmouseover = function(){
            var activeItemHover = header.querySelector('game').getAttribute("hover");

            document.querySelectorAll("#games  li:not(:first-child)")[parseInt(this.dataset.activeid)].style.color = activeItemHover ;

        }
        li.onmouseout = function(){

            document.querySelectorAll("#games  li:not(:first-child)")[parseInt(this.dataset.activeid)].style.color = activeItemColor ;

        }
    }


     var maxonline = 0 ;
    for(var i=0;i<allGames.length;i++) {
        var gameImage = allGames[i].querySelector('image').innerHTML;
        var gameName = allGames[i].querySelector('name').innerHTML;
        var url = allGames[i].querySelector('url').innerHTML;
        var text = allGames[i].querySelector('text').innerHTML;
        var textColor = allGames[i].querySelector('text').getAttribute("color");
        var textHover = allGames[i].querySelector('text').getAttribute("hover");
        var onlines = parseInt(allGames[i].querySelector('onlines').innerHTML);

        if (parseInt(allGames[i].querySelector('onlines').innerHTML)> maxonline) {
            maxonline = parseInt(allGames[i].querySelector('onlines').innerHTML);
              maxindex = i ;
        }

        var maxOnlinesBackground = xml_home.querySelector("games").getAttribute("max-onlines-background");
        var maxBorderWidth = xml_home.querySelector("games").getAttribute("max-onlines-border-width");
        var maxBorderColor = xml_home.querySelector("games").getAttribute("max-onlines-border-color");
        var maxBorderStyle = xml_home.querySelector("games").getAttribute("max-onlines-border-style");

        var div = document.createElement("div");
        div.setAttribute("class","game-block");
        div.setAttribute("id", gameName+"-block");
        div.setAttribute("data-onlines", onlines);
        div.setAttribute("data-gameid", i);
        div.setAttribute("data-name", gameName);
        if (i==maxindex) {

            div.style.backgroundColor = maxOnlinesBackground ;
            div.style.borderWidth = maxBorderWidth ;
            div.style.borderColor = maxBorderColor ;
            div.style.borderStyle = maxBorderStyle ;

        }
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class","game-image-container");
        var image = document.createElement("img");
        image.setAttribute("src",gameImage);
        innerDiv.appendChild(image);
        div.appendChild(innerDiv);
        var p = document.createElement("p");
        p.innerHTML=text;
        p.style.color= textColor;
        div.appendChild(p);
        document.querySelector("#main-container").appendChild(div);
        div.onmouseover =  function(){

            var  nextColor = allGames[parseInt(this.dataset.gameid)].querySelector('text').getAttribute("hover");
            document.querySelectorAll("p")[parseInt(this.dataset.gameid)].style.color = nextColor ;


        };
        div.onmouseout =  function(){

            var  firstColor = allGames[parseInt(this.dataset.gameid)].querySelector('text').getAttribute("color");
            document.querySelectorAll("p")[parseInt(this.dataset.gameid)].style.color = firstColor ;
        };

    }

    document.querySelectorAll("#games  li:not(:first-child)")[0].onclick=  sudocuInit ;
    document.querySelectorAll("#games  li:not(:first-child)")[1].onclick= chessInit ;
    document.querySelector("#sudoku-block").onclick=sudocuInit;
    document.querySelector("#chess-block").onclick=chessInit;
    document.querySelector("#snake-block").onclick=inActiveSnake;
    document.querySelector("#mario-block").onclick=inActiveMario;
    document.querySelector("#maze-block").onclick=inActiveMaze;

    function chessInit() {
        currentDirectory="Chess";
        changeCurrentDirectory();
        document.querySelector("#home-icon").onclick = goBackToHome ;
        //console.log("chess");
        clearPage();
        chessMaker();
    }
    function sudocuInit() {
        currentDirectory="SudoKu";
        changeCurrentDirectory();
        document.querySelector("#home-icon").onclick = goBackToHome ;
        clearPage();
        sudokuMaker();
    }
    function inActive() {
        changeCurrentDirectory();
        clearPage();
        var message = document.createElement("div");
        message.innerHTML="This Game is not Implemented Yet!";
        var pedar= document.querySelector("#main-container");
        pedar.appendChild(message);
        document.querySelector("#home-icon").onclick = goBackToHome ;
    }
    function clearPage(){
        var  killerparent = document.querySelector ("#main-container");
        var children = killerparent.childNodes;


        for(var p=children.length-1 ;p>=0 ; p--) {

            killerparent.removeChild(children[p]);
        }
    }
    function inActiveSnake() {
       currentDirectory="Snake" ;
        inActive();
    }
    function inActiveMaze() {
        currentDirectory="Maze" ;
        inActive();
    }
    function inActiveMario() {
        currentDirectory="Mario" ;
        inActive();

    }
    function goBackToHome () {
        clearPage();
        homeInit();
    }

    function changeCurrentDirectory (){
        if (currentDirectory=="Home"){
            document.querySelector("#home-icon").style.display="none";
        }
        else
        {document.querySelector("#home-icon").style.display="inline";}
        document.querySelector('#pwd').innerHTML= currentDirectory;
    }

}