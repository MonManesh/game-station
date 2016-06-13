var selectedCellValue = null;
var turnValue = null;
var whiteScore =0 ;
var blackScore =0;
var pawnMax = 8;
var rookMax =2 ;
var bishopMax =2;
var knightMax =2;
var kingMax = 1;
var queenMax = 1;
var isGameFinished = false;
var isTheKingChecked = false;
var whiteKingLocation =[];
var blackKingLocation =[];
var whiteRooks =[];
var blackRooks =[];
function chessMaker() {
    selectedCellValue = null;
    $(document).ready(function() {
        var xml = getXML('http://ie.ce-it.ir/hw3/xml/chess.xml');
        display(xml);

    });}
function display(xml) {
    //making the board
    var messege = document.createElement("div");
    messege.setAttribute("id","messege");
    messege.style.marginBottom = "15px";
    messege.style.color = "white";
    messege.innerHTML="messege";
    var chessDiv = document.createElement("div");
    chessDiv.setAttribute("id", "chess");
    var chessInfoDiv = document.createElement("div");
    chessInfoDiv.setAttribute("id", "chess-info");
    var scoreDivOne = document.createElement("div");
    scoreDivOne.setAttribute("class", "score");
    scoreDivOne.innerHTML = "white score: ";
    var scoreDivTwo = document.createElement("div");
    scoreDivTwo.setAttribute("class", "score");
    scoreDivTwo.innerHTML = "black score: ";
    whiteScore = $(xml).find("score").find("white").html();
    blackScore = $(xml).find("score").find("black").html();
    var scoreDivOneSpan = document.createElement("span");
    scoreDivOneSpan.setAttribute("id", "white-score");
    scoreDivOneSpan.innerHTML = whiteScore;
    scoreDivOne.appendChild(scoreDivOneSpan);
    var scoredivTwoSpan = document.createElement("span");
    scoredivTwoSpan.setAttribute("id", "black-score");
    scoredivTwoSpan.innerHTML = blackScore;
    scoreDivTwo.appendChild(scoredivTwoSpan);
    turnValue = $(xml).find("chess").attr("turn");
    var turnDiv = document.createElement("div");
    turnDiv.innerHTML = turnValue;
    turnDiv.setAttribute("id", "turn");
    turnDiv.setAttribute("class", "black");
    //console.log(blackScore);
    chessInfoDiv.appendChild(scoreDivOne);
    chessInfoDiv.appendChild(turnDiv);
    chessInfoDiv.appendChild(scoreDivTwo);
    chessDiv.appendChild(chessInfoDiv);

    whiteChessManPanel = document.createElement("div");
    whiteChessManPanel.setAttribute("id", "white-chessman-panel");
    chessDiv.appendChild(whiteChessManPanel);
    var table = document.createElement("table");
    chessDiv.appendChild(table);
    for (var i = 0; i < 8; i++) {
        var child1 = document.createElement("a");
        var row = document.createElement("tr");
        row.setAttribute("row", i);
        var col1 = document.createElement("td");
        col1.setAttribute("id", i + "0");
        row.appendChild(col1);
        var col2 = document.createElement("td");
        col2.setAttribute("id", i + "1");
        row.appendChild(col2);
        var col3 = document.createElement("td");
        col3.setAttribute("id", i + "2");
        row.appendChild(col3);
        var col4 = document.createElement("td");
        col4.setAttribute("id", i + "3");
        row.appendChild(col4);
        var col5 = document.createElement("td");
        col5.setAttribute("id", i + "4");
        row.appendChild(col5);
        var col6 = document.createElement("td");
        col6.setAttribute("id", i + "5");
        row.appendChild(col6);
        var col7 = document.createElement("td");
        col7.setAttribute("id", i + "6");

        row.appendChild(col7);
        var col8 = document.createElement("td");
        col8.setAttribute("id", i + "7");
        row.appendChild(col8);
        table.appendChild(row);
    }
    blackChessManPanel = document.createElement("div");
    blackChessManPanel.setAttribute("id", "black-chessman-panel");
    chessDiv.appendChild(blackChessManPanel);
    $("#main-container").append(messege);
    $("#main-container").append(chessDiv);
  //  $("#main-container").css("background-color","yellow");
    $("#main-container").css("margin-top","40px");

    // color of cells
    var whiteCellColor = $(xml).find("board").attr("white-cells");
    var blackCellColor = $(xml).find("board").attr("black-cells");
    $("#chess table tr:nth-child(2n+1) td:nth-child(2n+1)").css("background-color", whiteCellColor);
    $("#chess table tr:nth-child(2n) td:nth-child(2n)").css("background-color", whiteCellColor);
    $("#chess table tr:nth-child(2n+1) td:nth-child(2n)").css("background-color", blackCellColor);
    $("#chess table tr:nth-child(2n) td:nth-child(2n+1)").css("background-color", blackCellColor);
    $("#chess #white-chessman-panel").css("background-color", whiteCellColor);
    $("#chess #black-chessman-panel").css("background-color", blackCellColor);
    $("#chess #black-chessman-panel").css("color", "black");
    $("#chess #white-chessman-panel").css("color", "white");
    /////
    // unicode of characters
    var pawnUnicode = $(xml).find("chessmans").find("pawn").attr("unicode");
    var rookUnicode = $(xml).find("chessmans").find("rook").attr("unicode");
    var knightUnicode = $(xml).find("chessmans").find("knight").attr("unicode");
    var bishopUnicode = $(xml).find("chessmans").find("bishop").attr("unicode");
    var queenUnicode = $(xml).find("chessmans").find("queen").attr("unicode");
    var kingUnicode = $(xml).find("chessmans").find("king").attr("unicode");
    // putting elements on the board
    var whiteField = $(xml).find("white").attr("field");
    var blackField = $(xml).find("black").attr("field");
    var whiteFirstRow;  var blackFirtRow ;
    if (whiteField=="top" && blackField=="bottom"){
        whiteFirstRow=7;
        blackFirtRow=0;
    }
    else if (whiteField=="bottom" && blackField=="top"){
        whiteFirstRow=0;
        blackFirtRow=7;
    }
   // console.log("whiteFirstRow",whiteFirstRow,"blackFirtRow",blackFirtRow);




    setOnBoardWhite(pawnMax, "pawn", pawnUnicode);
    setOnBoardWhite(knightMax, "knight", knightUnicode);
    setOnBoardWhite(queenMax, "queen", queenUnicode);
    setOnBoardWhite(rookMax, "rook", rookUnicode);
    setOnBoardWhite(bishopMax, "bishop", bishopUnicode);
    setOnBoardWhite(kingMax, "king", kingUnicode);
    setOnBoardBlack(pawnMax, "pawn", pawnUnicode);
    setOnBoardBlack(knightMax, "knight", knightUnicode);
    setOnBoardBlack(queenMax, "queen", queenUnicode);
    setOnBoardBlack(rookMax, "rook", rookUnicode);
    setOnBoardBlack(bishopMax, "bishop", bishopUnicode);
    setOnBoardBlack(kingMax, "king", kingUnicode);
   // console.log("whiteKing ",whiteKingLocation,"blackKing",blackKingLocation,"whiteRook",whiteRooks,"blackRook",blackRooks);
    $("#"+whiteKingLocation[0]).children().attr("moved","false");
    $("#"+blackKingLocation[0]).children().attr("moved","false");
    $("#"+whiteRooks[0]).children().attr("moved","false");
    $("#"+whiteRooks[1]).children().attr("moved","false");
    $("#"+blackRooks[0]).children().attr("moved","false");
    $("#"+blackRooks[1]).children().attr("moved","false");
    setEmptyColors();
    isKingChecked();
    isCheckMate();


    function setEmptyColors() {
        for (var i = 0; i < 64; i++) {
            var childrenNUmber = $("td")[i].childNodes.length;
            if (childrenNUmber == 0) {
                $("td")[i].style.color = "red";
            }
        }
    }


    function setLocation(element, unicode, color) {
      //  console.log("first unicode",unicode,"first color",color);

        var row = element.attr("row");
        row = row.toString();
        var col = element.attr("col");
        col = col.toString();
        var cellId = row + col;
        if(unicode== kingUnicode && color=="white"){
            whiteKingLocation.push(cellId);

        }
        if(unicode==kingUnicode&& color=="black"){
            blackKingLocation.push(cellId);
        }
        if(unicode==rookUnicode&& color=="white"){
            whiteRooks.push(cellId);
        }
        if(unicode==rookUnicode&& color=="black"){
            blackRooks.push(cellId);
        }


        var child = document.createElement("a");
        child.innerHTML = unicode;

        addMouseEvent(child,color,unicode,cellId);
        $('#' + cellId).append(child);
        $('#' + cellId).css("color", color);


    }

    function insertBeatenInWhitePannel(number, unicode) {

        for (var m = 0; m < number; m++) {
            var child = document.createElement("a");
            child.innerHTML = unicode;


            $("#chess #white-chessman-panel").append(child);
        }
    }

    function insertBeatenInBlackPannel(number, unicode) {

        for (var m = 0; m < number; m++) {
            var child = document.createElement("a");
            child.innerHTML = unicode;
            $("#chess #black-chessman-panel").append(child);
        }
    }

    function setOnBoardWhite(max, name, unicode) {

        $(xml).find("white").find(name).each(function () {
            setLocation($(this), unicode, "white");
        });
        var beatenNumber = max - ($(xml).find("white").find(name).length);
        insertBeatenInWhitePannel(beatenNumber, unicode);
    }

    function setOnBoardBlack(max, name, unicode) {

        $(xml).find("black").find(name).each(function () {
            setLocation($(this), unicode, "black");
        });
        var beatenNumber = max - ($(xml).find("black").find(name).length);
        insertBeatenInBlackPannel(beatenNumber, unicode);
    }

    function showAllowedMoves(type, currentLocation, color , testMode ) {
        var pishavi = null;
        var validMoves = [];
        var candidatesForBeat = [];
        var cassledArray =[];
        var cassleForcassale =[];
        var location = parseInt(currentLocation);
        // console.log(location);
        var row = parseInt(location / 10);
        var col = location - row * 10;
        var cellId = row.toString()+col.toString();
        var isLeftNull = checkLeft(row, col, color);
        var isRightNull = checkRight(row, col, color);
        var isUpNull = checkUp(row, col, color);
        var isDownNull = checkDown(row, col, color);
        var isUpLeftNull = checkUpLeft(row, col, color);
        var isUpRightNull = checkUpRight(row , col , color);
        var isDownRightNull = checkDownRight(row , col , color);
        var isDownLeftNull = checkDownLeft(row ,col,color);
        if (testMode==false){ console.log(type,row,col);}

        //setting in which direction we should move
        if (color == "white" || color=="rgb(255, 255, 255)") {
            pishavi = whiteField;

        }
        else {
            pishavi = blackField;
        }
      //  console.log (color,pishavi);

            switch (type) {
                case rookUnicode:
                {
                    if (isDownNull) {
                        var i = row +1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i<8  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }


                    }
                    if (isLeftNull) {
                        var i = row  ; var j = col-1;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (j>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                 colision = true;
                            }
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }

                    }
                    if (isRightNull) {

                        var i = row  ; var j = col+1;
                        var allowdMove = i.toString() + j.toString();
                        var colision = false;
                        var temp = [];
                        while (i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }

                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }



                    }
                    if (isUpNull) {
                        var i = row -1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision= true;
                            }
                            i-=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }

                    }

                }
                    break;
                case bishopUnicode:
                {
                    if (isDownLeftNull) {
                        var i = row +1 ; var j = col-1;
                        var allowdMove = i.toString() + j.toString();
                        var colision =false;
                        var temp = [];
                        while (i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }


                    }
                    if(isDownRightNull){
                        var i = row +1 ; var j = col+1;
                        var colision=false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i<8 && j<8 && $('#' + allowdMove).css("color")!= color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                         //   validMoves.push(temp[0]);
                        }

                    }
                    if (isUpLeftNull) {
                        var i = row -1 ; var j = col-1;
                        var colision =false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0 && j>=0 && $('#' + allowdMove).css("color")!=color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }


                    }
                    if(isUpRightNull){
                        var i = row -1 ; var j = col+1;
                        var colision =false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0 && j<8 && $('#' + allowdMove).css("color")!=color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                         //   validMoves.push(temp[0]);
                        }

                    }


                }
                    break;
                case queenUnicode :
                {
                    if (isDownLeftNull) {
                        var i = row +1 ; var j = col-1;
                        var allowdMove = i.toString() + j.toString();
                        var colision =false;
                        var temp = [];
                        while (i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                            //validMoves.push(temp[0]);
                        }


                    }
                    if(isDownRightNull){
                        var i = row +1 ; var j = col+1;
                        var colision=false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i<8 && j<8 && $('#' + allowdMove).css("color")!= color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }

                    }
                    if (isUpNull) {
                        var i = row -1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision= true;
                            }
                            i-=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }

                    }
                    if (isDownNull) {
                        var i = row +1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i<8  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                         //   validMoves.push(temp[0]);
                        }


                    }
                    if (isLeftNull) {
                        var i = row  ; var j = col-1;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (j>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision = true;
                            }
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }

                    }
                    if (isRightNull) {

                        var i = row  ; var j = col+1;
                        var allowdMove = i.toString() + j.toString();
                        var colision = false;
                        var temp = [];
                        while (i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }

                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }



                    }
                    if (isUpLeftNull) {
                        var i = row -1 ; var j = col-1;
                        var colision =false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0 && j>=0 && $('#' + allowdMove).css("color")!=color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }


                    }
                    if(isUpRightNull){
                        var i = row -1 ; var j = col+1;
                        var colision =false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        while (i>=0 && j<8 && $('#' + allowdMove).css("color")!=color && colision==false){



                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }

                    }

                }
                    break;
                case kingUnicode :
                {   //console.log("isUpLeftNull",isUpLeftNull);
                   // console.log("isDownrightNull",isDownRightNull);
                    if (isDownLeftNull) {
                        var i = row +1 ; var j = col-1;
                        var allowdMove = i.toString() + j.toString();
                        var colision =false;
                        var temp = [];
                        if (i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }


                    }
                    if(isDownRightNull){
                        var i = row +1 ; var j = col+1;
                        var allowdMove = i.toString() + j.toString();
                        var colision=false;
                        var temp = [];
                        if (i<8 && j<8 && $('#' + allowdMove).css("color")!= color && colision==false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }

                    }
                    if (isUpNull) {
                        var i = row -1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        if (i>=0  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision= true;
                            }
                            i-=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }

                    }
                    if (isDownNull) {
                        var i = row +1 ; var j = col;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                        if (i<8  && $('#' + allowdMove).css("color")!= color && colision==false ){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i+=1;

                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }


                    }
                    if (isLeftNull) {
                        var i = row  ; var j = col-1;
                        var colision = false;
                        var temp = [];
                        var allowdMove = i.toString() + j.toString();
                       if (j>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision = true;

                            }
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }

                    }
                    if (isRightNull) {

                        var i = row  ; var j = col+1;
                        var allowdMove = i.toString() + j.toString();
                        var colision = false;
                        var temp = [];
                        if(i<8 && j>=0 && $('#' + allowdMove).css("color")!= color && colision==false){


                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }

                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }



                    }
                   // console.log("i am a tester" ,isUpLeftNull);
                    if (isUpLeftNull) {

                        var i = row -1 ; var j = col-1;
                        var colision =false;
                        var temp = [];
                       if (i>=0 && j>=0 && $('#' + allowdMove).css("color")!=color && colision==false){

                            var allowdMove = i.toString() + j.toString();

                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j-=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                           // validMoves.push(temp[0]);
                        }


                    }
                    if(isUpRightNull){
                        var i = row -1 ; var j = col+1;
                        var colision =false;
                        var temp = [];
                        if (i>=0 && j<8 && $('#' + allowdMove).css("color")!=color && colision==false){

                            var allowdMove = i.toString() + j.toString();

                            if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                validMoves.push(allowdMove);

                            }
                            else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                temp.push(allowdMove);
                                colision=true;
                            }
                            i-=1;
                            j+=1;
                            allowdMove = i.toString() + j.toString();
                        }
                        if (temp[0] != undefined) {
                            candidatesForBeat.push(temp[0]);
                          //  validMoves.push(temp[0]);
                        }

                    }
                    if(color=="rgb(255, 255, 255)" || color=="white"){

                        var i = row ; var j = col;
                        var id = i.toString() + j.toString();
                        var firtRookRow = (parseInt(whiteRooks[0])-(parseInt(whiteRooks[0])%10))/10;
                        var secondRookRow = (parseInt(whiteRooks[1])-(parseInt(whiteRooks[1])%10))/10;
                        var isKingMoved = $("#"+id).children().attr("moved") ;
                        var isFirstRookMoved = $("#"+whiteRooks[0]).children().attr("moved") ;
                        var isSecondRookMoved = $("#"+whiteRooks[1]).children().attr("moved") ;
                        var rightNeighbourone = i.toString()+ (j+1).toString();
                        var rightNeighbourtwo = i.toString()+ (j+2).toString();
                        var rightNeighbourThree = i.toString()+ (j+3).toString();
                        var leftone = i.toString()+ (j-1).toString();
                        var lefTwor =  i.toString()+ (j-2).toString();
                        if (row==whiteFirstRow && firtRookRow==whiteFirstRow && isKingMoved=="false" && isFirstRookMoved=="false" && $('#' + leftone).css("color") == "rgb(255, 0, 0)" && $('#' + lefTwor).css("color") == "rgb(255, 0, 0)"){
                            var wcsr = i.toString() + (j-2).toString();
                            cassledArray.push(wcsr);
                            var wcsrForCas = i.toString() + (j-1).toString();
                            cassleForcassale.push(wcsrForCas);
                        }
                        if (row=whiteFirstRow && secondRookRow==whiteFirstRow && isKingMoved=="false" && isSecondRookMoved=="false" && $('#' + rightNeighbourone).css("color") == "rgb(255, 0, 0)" && $('#' + rightNeighbourtwo).css("color") == "rgb(255, 0, 0)" && $('#' +rightNeighbourThree).css("color") == "rgb(255, 0, 0)"){
                            var www =i.toString() + (j+2).toString();
                            cassledArray.push(www);
                            var wwwforcas = i.toString() + (j+1).toString();
                            cassleForcassale.push(wwwforcas);
                        }
                    }
                    if(color=="rgb(0, 0, 0)"|| color=="black"){
                        var i = row ; var j = col;
                        //console.log("blackrooks",blackRooks);
                        var id = i.toString() + j.toString();
                        var firtRookRow = (parseInt(blackRooks[0])-(parseInt(blackRooks[0])%10))/10;
                        var secondRookRow = (parseInt(blackRooks[1])-(parseInt(blackRooks[1])%10))/10;
                        var isKingMoved = $("#"+id).children().attr("moved") ;
                        var isFirstRookMoved = $("#"+blackRooks[0]).children().attr("moved") ;
                        var isSecondRookMoved = $("#"+blackRooks[1]).children().attr("moved") ;
                        var rightNeighbourone = i.toString()+ (j+1).toString();
                        var rightNeighbourtwo = i.toString()+ (j+2).toString();
                        var rightNeighbourThree = i.toString()+ (j+3).toString();
                        var leftone = i.toString()+ (j-1).toString();
                        var lefTwor =  i.toString()+ (j-2).toString();

                        //console.log ("row= ",row,"row should be :",blackFirtRow,"first rook row=",firtRookRow,"2ns rook row =",secondRookRow,$('#' + leftone).css("color"),$('#' + lefTwor).css("color"),$('#' + rightNeighbourone).css("color"),$('#' + rightNeighbourtwo).css("color"),$('#' +rightNeighbourThree).css("color")) ;
                        if (row==blackFirtRow && firtRookRow==blackFirtRow  && isKingMoved=="false" && isFirstRookMoved=="false"  && $('#'+leftone).css("color")=="rgb(255, 0, 0)" && $('#'+lefTwor).css("color") == "rgb(255, 0, 0)" ){
                            var csMove = i.toString() + (j-2).toString();
                            cassledArray.push(csMove);
                            var csMoveCas =i.toString() + (j-1).toString();
                            cassleForcassale.push(csMoveCas);
                        }
                        if (row==blackFirtRow && secondRookRow==blackFirtRow  && isKingMoved=="false" && isSecondRookMoved=="false"&& $('#' + rightNeighbourone).css("color") == "rgb(255, 0, 0)" && $('#' + rightNeighbourtwo).css("color") == "rgb(255, 0, 0)" && $('#' +rightNeighbourThree).css("color") == "rgb(255, 0, 0)" ){
                            var csr = i.toString() + (j+2).toString();
                            cassledArray.push(csr);
                            var csrforcassle = i.toString() + (j+1).toString();
                            cassleForcassale.push(csrforcassle);

                        }


                    }
                   // console.log(id,firtRookRow,secondRookRow,isKingMoved,isFirstRookMoved,isSecondRookMoved);

                }
                    break;
                case knightUnicode:
                {
                    var i = row-1  ; var j = col+2;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                   if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                     //   validMoves.push(temp[0]);
                    }
                    //////////////////////////////
                    var i = row-1  ; var j = col-2;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                       // validMoves.push(temp[0]);
                    }
                    //////////////////////////////////////
                    var i = row-2  ; var j = col+1;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                        //validMoves.push(temp[0]);
                    }
                    //////////////////////////////////////////
                    var i = row-2  ; var j = col-1;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                        //validMoves.push(temp[0]);
                    }
                    //////////////////////////////////////////////
                    var i = row+1  ; var j = col+2;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                     //   validMoves.push(temp[0]);
                    }
                    /////////////////////////////
                    var i = row+2 ; var j = col+1;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                       // validMoves.push(temp[0]);
                    }
                    //////////////////////////////////
                    var i = row+2  ; var j = col-1;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                        //validMoves.push(temp[0]);
                    }
                    /////////////////////////////////////////
                    var i = row+1  ; var j = col-2;
                    var colision = false;
                    var temp = [];
                    var allowdMove = i.toString() + j.toString();
                    if (j>=0&& j<8 && i<8 && i>=0 && $('#' + allowdMove).css("color")!= color &&   colision == false){


                        if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                            validMoves.push(allowdMove);

                        }
                        else if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                            temp.push(allowdMove);
                            colision = true;
                        }
                        allowdMove = i.toString() + j.toString();
                    }
                    if (temp[0] != undefined) {
                        candidatesForBeat.push(temp[0]);
                        //validMoves.push(temp[0]);
                    }

                }
                    break;
                case pawnUnicode:
                {


                    if (pishavi=="bottom"){
                        if(row==1 && isDownNull){
                            var i = row + 1 ; var j = col;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            while (i<4  && $('#' + allowdMove).css("color")!= color && colision==false ){


                                if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                    validMoves.push(allowdMove);

                                }

                                i+=1;
                                allowdMove = i.toString() + j.toString();
                            }

                        }
                        else if (row!=1 && isDownNull){
                            var i = row + 1 ; var j = col;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8  && $('#' + allowdMove).css("color")!= color && colision==false ){


                                if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                    validMoves.push(allowdMove);

                                }

                            }
                        }
                        if (isDownLeftNull){
                            var i = row +1 ; var j = col-1;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8 && i>=0 && j>=0 && j<8  && $('#' + allowdMove).css("color")!= color && colision==false ){
                                if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                    temp.push(allowdMove);
                                    colision=true;
                                }

                            }
                            if (temp[0] != undefined) {
                                candidatesForBeat.push(temp[0]);
                            }



                        }
                        if (isDownRightNull){
                            var i = row +1 ; var j = col+1;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8 && i>=0 && j>=0 && j<8  && $('#' + allowdMove).css("color")!= color && colision==false ){
                                if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                    temp.push(allowdMove);
                                    colision=true;
                                }

                            }
                            if (temp[0] != undefined) {
                                candidatesForBeat.push(temp[0]);
                            }



                        }


                    }
                    else if(pishavi=="top"){
                        if(row==6 && isUpNull){
                            var i = row - 1 ; var j = col;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            while (i>3  && $('#' + allowdMove).css("color")!= color && colision==false ){


                                if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                    validMoves.push(allowdMove);

                                }

                                i-=1;
                                allowdMove = i.toString() + j.toString();
                            }

                        }
                        else if (row!=6 && isUpNull){
                            var i = row -1 ; var j = col;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8 && i>=0  && $('#' + allowdMove).css("color")!= color && colision==false ){


                                if ($('#' + allowdMove).css("color") == "rgb(255, 0, 0)") {
                                    validMoves.push(allowdMove);

                                }

                            }
                        }
                        if (isUpLeftNull){
                            var i = row -1 ; var j = col-1;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8 && i>=0 && j>=0 && j<8  && $('#' + allowdMove).css("color")!= color && colision==false ){
                                if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                    temp.push(allowdMove);
                                    colision=true;
                                }

                            }
                            if (temp[0] != undefined) {
                                candidatesForBeat.push(temp[0]);
                            }



                        }
                        if (isUpRightNull){
                            var i = row -1 ; var j = col+1;
                            var colision = false;
                            var temp = [];
                            var allowdMove = i.toString() + j.toString();
                            if (i<8 && i>=0 && j>=0 && j<8  && $('#' + allowdMove).css("color")!= color && colision==false ){
                                if ($('#' + allowdMove).css("color") != "rgb(255, 0, 0)" && $('#' + allowdMove).css("color") != color) {
                                    temp.push(allowdMove);
                                    colision=true;
                                }

                            }
                            if (temp[0] != undefined) {
                                candidatesForBeat.push(temp[0]);
                            }



                        }
                    }
                }
                    break;


            }
        if (testMode==false){
             console.log("validMOves",validMoves);
             console.log("candidatesForBeats:",candidatesForBeat);
            console.log("king moves after casseling",cassledArray);
            console.log("cassle Moves ",cassleForcassale);
        }

            setOthersColor(validMoves);
           //converting color format
        var colorName = null;
        if (color=="rgb(0, 0, 0)" || color=="black"){
            colorName ="black";
        }
        else if  (color=="rgb(255, 255, 255)" || color=="white"){colorName="white";}
            if (turnValue==colorName && testMode==false){
                move(cellId,validMoves,candidatesForBeat,cassledArray,cassleForcassale);
                changeColor (validMoves,candidatesForBeat,cassledArray);
            }

        return[validMoves,candidatesForBeat,cassledArray,cassleForcassale] ;



    }

    function checkLeft(row, col, color) {
        //console.log(color);
        var nodeColor = null;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (col == 0) {
            return false;
        }
        else {
            var leftNeighbour = row.toString() + (col - 1).toString();
            var neighbourColor = ($('#' + leftNeighbour + ' a').css("color"));
            if (neighbourColor == "red") {
                // this cell's left neighbour is empty
                return true
            }
            if (neighbourColor == nodeColor) {
                return false
            }
            if (neighbourColor != nodeColor) {
                return true;
            }

            // console.log(neighbourColor);
        }

    };
    function checkRight(row, col, color) {
        //console.log(color);
        var nodeColor = null;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (col == 7) {
            return false;
        }
        else {
            var rightNeighbour = row.toString() + (col + 1).toString();
            var neighbourColor = ($('#' + rightNeighbour).css("color"));
            if (neighbourColor == "red") {
                // this cell's right neighbour is empty
                return true
            }
            if (neighbourColor == nodeColor) {
                return false
            }
            if (neighbourColor != nodeColor) {
                return true;
            }

            // console.log(neighbourColor);
        }

    };
    function checkUp(row, col, color) {
        // console.log(color);
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 0) {
            return false;
        }
        else {
            var upNeighbour = (row - 1).toString() + (col).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + upNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red") {
                // this cell's up neighbour is empty
                return true
            }
            if (neighbourColor == nodeColor) {
                return false

            }
            if (neighbourColor != nodeColor) {
                return true;
            }


        }

    };
    function checkDown(row, col, color) {
        // console.log(color);
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 7) {
            return false;
        }
        else {
            var downNeighbour = (row + 1).toString() + (col).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + downNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red") {
                // this cell's up neighbour is empty
                return true
            }
            if (neighbourColor == nodeColor) {
                return false

            }
            if (neighbourColor != nodeColor) {
                return true;
            }


        }

    };
    function checkUpLeft(row, col, color) {
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 0) {
            return false;
        }
        if (col == 0) {
            return false;
        }
        else {
            var downNeighbour = (row - 1).toString() + (col - 1).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + downNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red" || "rgb(255, 0, 0)") {
                // this cell's up neighbour is empty
                return true
            }
            if (neighbourColor == nodeColor) {
                return false

            }
            if (neighbourColor != nodeColor) {
                return true;
            }

        }



    };
    function checkUpRight(row, col, color) {
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 0) {
            return false;
        }
        if (col == 7) {
            return false;
        }
        else {
            var downNeighbour = (row - 1).toString() + (col + 1).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + downNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red") {
                // this cell's up neighbour is empty
                return true;
            }
            if (neighbourColor == nodeColor) {
                return false;

            }
            if (neighbourColor != nodeColor) {
                return true;
            }

        }



    };
    function checkDownRight(row, col, color) {
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 7) {
            return false;
        }
        if (col == 7) {
            return false;
        }
        else {
            var downNeighbour = (row +1).toString() + (col + 1).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + downNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red") {
                // this cell's up neighbour is empty
                return true;
            }
            if (neighbourColor == nodeColor) {
                return false;

            }
            if (neighbourColor != nodeColor) {
                return true;
            }

        }



    };
    function checkDownLeft(row, col, color) {
        var nodeColor = null;
        var neighbourColor = undefined;
        if (color == "black" || color == "rgb(0, 0, 0)") {
            nodeColor = "rgb(0, 0, 0)";
        }
        if (color == "white" || color == "rgb(255, 255, 255)") {
            nodeColor = "rgb(255, 255, 255)";
        }
        if (row == 7) {
            return false;
        }
        if (col ==0) {
            return false;
        }
        else {
            var downNeighbour = (row +1).toString() + (col - 1).toString();

            // var neighbourColor = ($('#'+"13").css("color"));
            neighbourColor = ($('#' + downNeighbour).css("color"));
            //   console.log(neighbourColor);
            if (neighbourColor == "red") {
                return true;
            }
            if (neighbourColor == nodeColor) {
                return false;

            }
            if (neighbourColor != nodeColor) {
                return true;
            }

        }



    };
    function  setOthersColor (validMoves){


        for (var k=0 ;k<validMoves.length ; k++){
          for (var i=0 ; i<8; i++){
              for (var j=0;j<8;j++){
                  var row = i ;
                  var col = j;
                  var cellId = row.toString() + col.toString();

                  if (cellId!=validMoves[k])
                  {    $('#'+cellId).off("click");
                      if (row%2==1 && col%2==0 || row%2==0 && col%2==1){
                          $('#'+cellId).css("background-color",blackCellColor);
                      }
                    else
                      if (row%2==1 && col%2==1 || row%2==0 && col%2==0){
                          $('#'+cellId).css("background-color",whiteCellColor);
                      }


                  }
              }
          }

        }
    };
    function move(id,validMoves,candidatesForBeat,kingMovesIncas,rookMovesIncas){
        var MovedItemColor = $('#'+id).css("color");
        if(MovedItemColor=="rgb(0, 0, 0)"){
            MovedItemColor="black";
        }
        else if (MovedItemColor=="rgb(255, 255, 255)"){
            MovedItemColor="white";
        }
        //console.log("moveditem color is :",MovedItemColor);

        var mabdaMaghsad =[];
        var empty =["a"];
        var unicode = $('#'+id).children().html();
        var child = document.createElement("a");
        child.innerHTML = unicode;
        mabdaMaghsad.push(id);
       // console.log(child);
        for(var i =0 ; i<validMoves.length;i++){
           var option= validMoves[i];
          $('#'+option).click(function(){
              var parent =$(this).attr("id");

              mabdaMaghsad.push($(this).attr("id"));
            //  console.log(child,MovedItemColor,unicode,parent);

              var prom = isPromotionState(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);
              console.log("prom",prom);
             if(prom==false){
                 addMouseEvent(child,MovedItemColor,unicode,parent);
             }
              else if(prom==true){
                 addMouseEvent(child,MovedItemColor,queenUnicode,parent);
             }

              $(this).append(child);
              if (unicode==kingUnicode || unicode==rookUnicode){
                    $("#"+parent).children().attr("moved","true");
              }
              $(this).css("color",MovedItemColor);
              $("#"+id).empty();
              changeTurn(MovedItemColor);
              $('#'+id).css("color","red");

             doPromotion(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);

              var destinationId =$(this).attr("id");
              var output = showAllowedMoves($("#"+destinationId).children().html(),destinationId,$("#"+destinationId).css("color"),true);

            //  isCheck(output[1],MovedItemColor);
              isKingChecked();
              isCheckMate();
              setOthersColor(mabdaMaghsad);

              for(var k=0 ; k<mabdaMaghsad.length;k++){
                 $("#"+ mabdaMaghsad[k]).css("background-color","orange");

              }
              setTimeout(function() {
                  setOthersColor(empty);
              }, 700);
            });

        }
        // zadane mohre ha
        for(var i=0 ;i<candidatesForBeat.length;i++){

            var option= candidatesForBeat[i];
            $("#"+option).mouseenter(function(){
                $(this).css("cursor","pointer");
            });
            $('#'+option).click(function(){
                var parent =$(this).attr("id");
                var oldChildUnicode = $("#"+parent).children().html();
                var oldChildColor = $("#"+parent).children().css("color");
                updateScores(oldChildColor,oldChildUnicode);
                var a = document.createElement("a");
                a.style.float = "left";
                a.style.marginLeft="5px";
                a.innerHTML = oldChildUnicode;
                if (oldChildColor=="rgb(255, 255, 255)" || oldChildColor=="white" ){
                    $("#white-chessman-panel").append(a);
                }
                else if (oldChildColor=="rgb(0, 0, 0)" || oldChildColor=="black"){
                    $("#black-chessman-panel").append(a);
                }


                $("#"+parent).empty();
            //  console.log("oldChild:",oldChildUnicode,"oldChildColor",oldChildColor);
                //  console.log(child,MovedItemColor,unicode,parent);
                mabdaMaghsad.push($(this).attr("id"));
                var prom = isPromotionState(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);
                console.log("prom",prom);
                if(prom==false){ addMouseEvent(child,MovedItemColor,unicode,parent);}
                else if(prom==true){
                    addMouseEvent(child,MovedItemColor,queenUnicode,parent);
                }

                $(this).append(child);
                if (unicode==kingUnicode || unicode==rookUnicode){
                    $("#"+parent).children().attr("moved","true");
                    // rook ham true shavad
                }
                $(this).css("color",MovedItemColor);

                $("#"+id).empty();
                changeTurn(MovedItemColor);
                $('#'+id).css("color","red");

                doPromotion(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);

                var destinationId =$(this).attr("id");
                var output = showAllowedMoves($("#"+destinationId).children().html(),destinationId,$("#"+destinationId).css("color"),true);
               // isCheck(output[1],MovedItemColor);
                isKingChecked();
                isCheckMate();
                setOthersColor(mabdaMaghsad);
                for(var k=0 ; k<mabdaMaghsad.length;k++){
                    $("#"+ mabdaMaghsad[k]).css("background-color","orange");

                }
                setTimeout(function() {
                    setOthersColor(empty);
                }, 700);
            });

        }
        // caseling
        for(var i=0 ;i<kingMovesIncas.length;i++){

            var option= kingMovesIncas[i];
            var rooKnewPlace = rookMovesIncas[i];
            var rtemp = parseInt(rooKnewPlace)%10;//col
            var rcol =(parseInt(rooKnewPlace)-rtemp) /10; //row
             if (rtemp>3.5){
                 rtemp = 7;
                 //rook col
             }
            else if (rtemp<3.5){
                 rtemp=0;
             }

            var rookchild = document.createElement("a");
            rookchild.innerHTML = rookUnicode;
            rookchild.setAttribute("moved","true");
            var oldRookParentID = rcol.toString() + rtemp.toString();
            console.log("ooooooooooo",oldRookParentID);

            $("#"+option).mouseenter(function(){
                $(this).css("cursor","pointer");
            });

            $('#'+option).click(function(){
                var parent =$(this).attr("id");
                mabdaMaghsad.push($(this).attr("id"));
                var prom = isPromotionState(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);
                console.log("prom",prom);
                if(prom==false){ addMouseEvent(child,MovedItemColor,unicode,parent);}
                else if(prom==true){
                    addMouseEvent(child,MovedItemColor,queenUnicode,parent);
                }

                $(this).append(child);
                $("#"+rooKnewPlace).append(rookchild);
                if (unicode==kingUnicode || unicode==rookUnicode){
                    $("#"+parent).children().attr("moved","true");
                }
                $(this).css("color",MovedItemColor);
                $("#"+rooKnewPlace).css("color",MovedItemColor);
                $("#"+ oldRookParentID).empty();
                $("#"+id).empty();
                changeTurn(MovedItemColor);
                $('#'+id).css("color","red");

                doPromotion(unicode,mabdaMaghsad[0],mabdaMaghsad[1]);

                var destinationId =$(this).attr("id");
                var output = showAllowedMoves($("#"+destinationId).children().html(),destinationId,$("#"+destinationId).css("color"),true);
                // isCheck(output[1],MovedItemColor);
                isKingChecked();
                isCheckMate();
                setOthersColor(mabdaMaghsad);
                for(var k=0 ; k<mabdaMaghsad.length;k++){
                    $("#"+ mabdaMaghsad[k]).css("background-color","orange");

                }
                setTimeout(function() {
                    setOthersColor(empty);
                }, 700);
            });

        }


    };
    function changeTurn(currentTurn){
        //console.log(currentTurn);
        if(currentTurn=="rgb(255, 255, 255)" || currentTurn=="white" ){
            //white
            turnValue="black";

        }
        else if (currentTurn="rgb(0, 0, 0)"|| currentTurn=="black"){
            turnValue= "white";

        }
        turnDiv.innerHTML=turnValue;

    };
    function addMouseEvent(child,color,unicode,cellId){
        //console.log(child,color,unicode,cellId);

        child.onmouseover = function () {
         //   console.log("turnValue is :",turnValue);
         //   console.log("color is:",color);
            if (turnValue == color && isGameFinished==false) {
                child.style.cursor = "pointer";
                child.style.color = "rgb(230, 230, 0)";
            }


        };
        child.onmouseout = function () {
            child.style.color = color;
        };
        child.onclick = function () {
            var type = unicode;
           /* console.log("turnValue is :",turnValue);
            console.log("color is:",color);*/
            if (turnValue == color && isGameFinished==false) {
                child.style.color = "rgb(255, 255, 0)";
                var tdColor = $('#' + cellId).css("color");

                showAllowedMoves(type, cellId, tdColor,false);

            }
        };




    };
    function updateScores(beatedColor,beatedUnicode){
        var score = 0;
        if (beatedColor=="rgb(255, 255, 255)" || beatedColor=="white" ){
             score = parseInt(blackScore);
            switch(beatedUnicode) {
                case rookUnicode:
                {score+=5;}
                    break;
                case bishopUnicode:
                {score+=3;}
                    break;
                case  queenUnicode:
                {score+=9;}
                    break;
                case pawnUnicode:
                {score+=1;}
                    break;
                case knightUnicode:
                {score+=3;}
                    break;
            }
            blackScore = score;
            $("#black-score").html(score);

        }
        else if (beatedColor=="rgb(0, 0, 0)" || beatedColor=="black"){
           score = parseInt(whiteScore);
            switch(beatedUnicode) {
                case rookUnicode:
                {score+=5;}
                    break;
                case bishopUnicode:
                {score+=3;}
                    break;
                case  queenUnicode:
                {score+=9;}
                    break;
                case pawnUnicode:
                {score+=1;}
                    break;
                case knightUnicode:
                {score+=3;}
                    break;
            }
            whiteScore=score;
            $("#white-score").html(score);


        }

    };
    function changeColor(validMoves,candidatesForBeat,cassledArray){

        for (var i=0 ; i< cassledArray.length ; i++){
            $('#'+cassledArray[i]).css("backgroundColor","rgb(0, 255, 0)");

        }

        for (var i=0 ; i< validMoves.length ; i++){
            $('#'+validMoves[i]).css("backgroundColor","orange");

        }
        for(var j = 0 ; j<candidatesForBeat.length;j++){
            //  console.log(candidatesForBeat[j]);
            $('#'+candidatesForBeat[j]).css("backgroundColor","rgb(255, 51, 51)");
        }
    };
    function getKingPosition(){
        var $modele = kingUnicode;
       // console.log("modele",$modele);
        var kingElements =$('td:contains("'+$modele+'")');
        var kingIds =[];
        for (var z=0;z<2;z++){
            var kId = kingElements[z].getAttribute("id");
            kingIds.push(kId);

        }
        //console.log("king elemets are :",kingIds);
        return kingIds
    };
    function isCheck(moveArray,movedItemColor){
        var kingArray = getKingPosition();
        var firstkingcolor = $("#"+kingArray[0]).css("color");
        if (firstkingcolor=="rgb(0, 0, 0)"){firstkingcolor="black";}
        else if (firstkingcolor=="rgb(255, 255, 255)"){firstkingcolor="white";}
       var secondKingColor = $("#"+kingArray[1]).css("color");
        if (secondKingColor=="rgb(0, 0, 0)"){secondKingColor="black";}
    else if (secondKingColor=="rgb(255, 255, 255)"){secondKingColor="white";}
        var theKing = null;
        if (firstkingcolor==movedItemColor){
            theKing=kingArray[1];
        }
        else if (secondKingColor==movedItemColor){
            theKing=kingArray[0];
        }
            console.log("the king: ",theKing,"move array: ",moveArray);
        $("#messege").html("messege");
        $("#messege").css("color","white");
        for (var i=0 ; i<moveArray.length; i++){
            if (moveArray[i]==theKing){
                $("#messege").html("check");
                $("#messege").css("color","orange");
                $("#"+theKing).css("background-color","purple");
                 console.log("is check: ","true");


                return true;
            }
            else{}
        }

              console.log("is check: ","false");
                $("#messege").html("messege");
                $("#messege").css("color","white");
                return false;




    };
    function isCheckMate(){
        // getting all rival oponents on page
        var tds =$('td');
        var blackelelement = [];
        var whiteElements =[];
        for(var j=0 ;j<tds.length;j++){
            //   console.log(tds[j].style.color);
            if(tds[j].style.color=="black"){
                blackelelement.push(tds[j].getAttribute("id"));
            }
            else if(tds[j].style.color=="white"){
                whiteElements.push(tds[j].getAttribute("id"));
            }

        }
        ////// getting the king
        var kingArray = getKingPosition();
        var blackKingPosition; var whiteKingPosition;
        var firstkingcolor = $("#"+kingArray[0]).css("color");
        if (firstkingcolor=="rgb(0, 0, 0)"){blackKingPosition=kingArray[0];}
        else if (firstkingcolor=="rgb(255, 255, 255)"){whiteKingPosition=kingArray[0];}
        var secondKingColor = $("#"+kingArray[1]).css("color");
        if (secondKingColor=="rgb(0, 0, 0)"){blackKingPosition=kingArray[1];}
        else if (secondKingColor=="rgb(255, 255, 255)"){whiteKingPosition=kingArray[1];}
     //   console.log("black King is on :",blackKingPosition,"white king is on :",whiteKingPosition);
        //// checking mate
        var blackKingTemp = [];
        blackKingTemp.push(blackKingPosition);
        var whiteKingTemp = [];
        whiteKingTemp.push(whiteKingPosition);
         var  whiteKingAllowedMoves =  showAllowedMoves(kingUnicode,whiteKingPosition,"white",true);
        whiteKingAllowedMoves = whiteKingAllowedMoves[0].concat(whiteKingAllowedMoves[1].concat(whiteKingTemp).concat(whiteKingAllowedMoves[2]));
       // console.log("wkam",whiteKingAllowedMoves);
        var blackKingAllowedMoves = showAllowedMoves(kingUnicode,blackKingPosition,"black",true);
        blackKingAllowedMoves=blackKingAllowedMoves[0].concat(blackKingAllowedMoves[1].concat(blackKingTemp).concat(blackKingAllowedMoves[2]));



        ////// showing allowd moves for elements on the page
        var allowedMovesForWhiteElements =[];
        var unicode;
        for(var i=0;i<whiteElements.length;i++){
            unicode = $("#"+whiteElements[i]).children().html();
           // console.log(unicode);
           var thisMoves = showAllowedMoves(unicode,whiteElements[i],"white",true);
          thisMoves = thisMoves[0].concat(thisMoves[1]);
            //console.log("this moves: ",thisMoves)
            allowedMovesForWhiteElements = allowedMovesForWhiteElements.concat(thisMoves);
        }
        var allowedMovesForBlackElements =[];
        var bunicode;
        for(var i=0;i<blackelelement.length;i++){
            bunicode = $("#"+blackelelement[i]).children().html();
            // console.log(unicode);
            var bthisMoves = showAllowedMoves(bunicode,blackelelement[i],"black",true);
            bthisMoves = bthisMoves[0].concat(bthisMoves[1]);
          //  console.log("this moves: ",thisMoves)
            allowedMovesForBlackElements = allowedMovesForBlackElements.concat(bthisMoves);
        }
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        var whiteKingScape = whiteKingAllowedMoves.diff(allowedMovesForBlackElements);
        var blackKingScape = blackKingAllowedMoves.diff(allowedMovesForWhiteElements);
        var winner = null;
       // console.log("TTTTTTTTT",turnValue);
        if(whiteKingScape.length==0 && turnValue=="black"){
            winner = "black";
            isGameFinished = true;
        }
        else if (blackKingScape.length==0 && turnValue=="white"){
            winner = "white";
            isGameFinished = true;
        }
       // console.log("finish?",isGameFinished);
        if(isGameFinished==true){

            $("#messege").html("checkmate");
            $("#messege").css("color","orange");
            setTimeout(function(){  $("#messege").html("winner is: "+winner); }, 2000);

        }

        console.log("whiteKingScape",whiteKingScape,"blackKingScape",blackKingScape);
    };
    function isKingChecked(){
        // getting all rival oponents on page
        var tds =$('td');
        var blackelelement = [];
        var whiteElements =[];
        for(var j=0 ;j<tds.length;j++){
            //   console.log(tds[j].style.color);
            if(tds[j].style.color=="black"){
                blackelelement.push(tds[j].getAttribute("id"));
            }
            else if(tds[j].style.color=="white"){
                whiteElements.push(tds[j].getAttribute("id"));
            }

        }
        //////////
        var kingArray = getKingPosition();
        var blackKingPosition; var whiteKingPosition;
        var firstkingcolor = $("#"+kingArray[0]).css("color");
        if (firstkingcolor=="rgb(0, 0, 0)"){blackKingPosition=kingArray[0];}
        else if (firstkingcolor=="rgb(255, 255, 255)"){whiteKingPosition=kingArray[0];}
        var secondKingColor = $("#"+kingArray[1]).css("color");
        if (secondKingColor=="rgb(0, 0, 0)"){blackKingPosition=kingArray[1];}
        else if (secondKingColor=="rgb(255, 255, 255)"){whiteKingPosition=kingArray[1];}
        /////////////////
        var allowedMovesForWhiteElements =[];
        var unicode;
        for(var i=0;i<whiteElements.length;i++){
            unicode = $("#"+whiteElements[i]).children().html();
            // console.log(unicode);
            var thisMoves = showAllowedMoves(unicode,whiteElements[i],"white",true);
            thisMoves = thisMoves[0].concat(thisMoves[1]);
            //console.log("this moves: ",thisMoves)
            allowedMovesForWhiteElements = allowedMovesForWhiteElements.concat(thisMoves);
        }
        var allowedMovesForBlackElements =[];
        var bunicode;
        for(var i=0;i<blackelelement.length;i++){
            bunicode = $("#"+blackelelement[i]).children().html();
            // console.log(unicode);
            var bthisMoves = showAllowedMoves(bunicode,blackelelement[i],"black",true);
            bthisMoves = bthisMoves[0].concat(bthisMoves[1]);
            //  console.log("this moves: ",thisMoves)
            allowedMovesForBlackElements = allowedMovesForBlackElements.concat(bthisMoves);
        }
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        ///////////////////////
        var temp =[];
        temp.push(whiteKingPosition);
        whiteKingPosition = temp;
        var anotherTemp =[];
        anotherTemp.push(blackKingPosition);
        blackKingPosition = anotherTemp;
        console.log("white king is safe in: ",whiteKingPosition,"black king is safe in: ",blackKingPosition);
        var whiteKingScape = whiteKingPosition.diff(allowedMovesForBlackElements);
        var blackKingScape = blackKingPosition.diff(allowedMovesForWhiteElements);
        var checkedKing = null;
        if(whiteKingScape.length==0 && blackKingScape.length!=0){
                checkedKing ="white";
                isTheKingChecked =true;
        }
        else if (blackKingScape.length==0 && whiteKingScape.length!=0){
                checkedKing ="black"
            isTheKingChecked =true;
        }
        else if (blackKingScape.length==0 && whiteKingScape.length==0){
            isTheKingChecked = true;
            checkedKing = "black & white"
        }
        else if (blackKingScape.length!=0 && whiteKingScape.length!=0){
            isTheKingChecked = false;
        }

        if(isTheKingChecked==true){

            $("#messege").html(checkedKing +" is checked");
            $("#messege").css("color","orange");
         //   setTimeout(function(){  $("#messege").html("winner is: "+winner); }, 2000);

        }
        else if (isTheKingChecked==false){
            $("#messege").html("messege");
            $("#messege").css("color","white");
        }


    };
    function doPromotion(unicode,sourceId,destinationId){
       // console.log(unicode,sourceId,destinationId);
        if (unicode==pawnUnicode){
            var sRow = (parseInt(sourceId)-(parseInt(sourceId)%10)) /10  ;
            var dRow = (parseInt(destinationId)-(parseInt(destinationId)%10))/10;
          //  console.log("srow :",sRow,"drow: ",dRow);
            if((sRow==6&&dRow==7) ||( sRow==1 && dRow==0)){
                $("#"+destinationId).children().html(queenUnicode);

            }

        }

    };
    function isPromotionState(unicode,sourceId,destinationId){
        if (unicode==pawnUnicode){
            var sRow = (parseInt(sourceId)-(parseInt(sourceId)%10)) /10  ;
            var dRow = (parseInt(destinationId)-(parseInt(destinationId)%10))/10;
              console.log("unicode",unicode,"srow :",sRow,"drow: ",dRow);
            if((sRow==6&&dRow==7) ||( sRow==1 && dRow==0)){

                return true;
            }
           return false;
        }
      return false;
    };
}

