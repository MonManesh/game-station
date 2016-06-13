var selectedCellValue = null;
var HoveredCell = null ;
var UnHoveredCell = null ;
var finish = false ;
var input = null;
function sudokuMaker() {
    selectedCellValue = null;
    $(document).ready(function() {
        var xml = getXML('http://ie.ce-it.ir/hw3/xml/sudoku.xml');
        var xsl = getXML('js/sudoku.xsl');
        displayResult(xml, xsl);
});
}
function getXML(url) {
    var xml = null;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        async : false,
        success: function(responseXML) {
            xml = responseXML;
        }
    });
    return xml;
}
function sendXml(xml ,url){
    $.post(url, {
       solution_xml: xml
    }, function(data,status) {
        alert(data);
    });
    //var response = $.ajax({
    //    url: url,
    //    type: 'POST',
    //    dataType: 'xml',
    //    async : false,
    //    success: function(response) {
    //        result = response;
    //
    //    }
    //});
    //return response.responseText;

}
function displayResult(xml, xsl) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);

    var messege = document.createElement("div");
    messege.setAttribute("id","error");
    messege.style.color = "rgb(255, 77, 77)";
    messege.style.marginTop = "15px";
    messege.innerHTML="";

    $('#main-container').html(resultDocument);
    var checkButton = document.createElement("div");
    checkButton.setAttribute("id", "check-sudoku");
    checkButton.innerHTML = "Check it out!"
    var submitButton = document.createElement("div");
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute("id", "submit-sudoku");

    $('#main-container').append(checkButton, submitButton,messege);

    // click event for button
    checkButton.onclick = function (){

          var  dupBlockArray = blockValidator();
      //  console.log(dupBlockArray);
         showErrorInBlock(dupBlockArray);
        var dupRowArray = rowValidator ();
        showErrorInRow(dupRowArray);
        var dupColArray = colValidator ();
        showErrorInCol(dupColArray);
        if (dupBlockArray.length==0 && dupColArray.length==0 && dupRowArray.length==0) {
            messege.style.color = "rgb(0, 230, 138)";
            messege.innerHTML = "no mistakes, go on!";
            // needs modifiication

        }


    };

    submitButton.onclick = function(){

           finish = isUserDone();
      //  console.log(finish);
          if (finish){
                var innerCells = xsdToXml();
              var solution_xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?> <solution> <cells>"+
                  innerCells+"<"+"/"+"cells> <student id="+"\"9131079\">9131079</student"+"> </"+"solution>";
              console.log(solution_xml);
              var url = "http://ie.ce-it.ir/hw3/sudoku_validator.php";
              var response = sendXml(solution_xml,url);
             //console.log(response);
             // messege.style.color ="rgb(153, 0, 77)";
             // messege.innerHTML = response;


          }
    };
    for (var i = 0; i < $('tr').length; i++) {

        $('tr')[i].setAttribute("row", i);

    }
    //col and row attribute

    for (var m = 0; m < 9; m++) {

        for (j = 0; j < 9; j++) {

            //This is how variables should be used is jquery
           var cell = $('tr[row=' + m + '] td')[j];
            cell.setAttribute("col", j);
            if (cell.innerHTML == "") {
                cell.setAttribute("contenteditable", "true");
            }
            else
                cell.setAttribute("contenteditable", "false");

        }
    }
    // row attribute for cell

    for (var m = 0; m < 9; m++) {

        for (j = 0; j < 9; j++) {
            var cell = $('tr[row='+m+'] td')[j];
           // var cellColl = cell.getAttribute("col");
            var cellRow = m;
           // var cellId = cellColl.concat(m);

            cell.setAttribute("row", m);


        }
    }

    // block attribute
    for (var m = 0; m < 3; m++) {

        for ( var j = 0; j < 3; j++) {
            var cell = $('tr[row='+m+'] td')[j];

            cell.setAttribute("class", "block1");


        }
    }
    for (var m = 0; m < 3; m++) {

        for (var j = 3; j < 6; j++) {
            var cell = $('tr[row='+m+'] td')[j];
            //console.log(cell.innerHTML);
            cell.setAttribute("class", "block2");


        }
    }
    for (var m = 0; m < 3; m++) {

        for (var j = 6; j < 9; j++) {
            var cell = $('tr[row='+m+'] td')[j];
           // console.log(cell.innerHTML);
            cell.setAttribute("class", "block3");


        }
    }
    // block attribute
    for (var m = 3; m < 6; m++) {

        for ( var j = 0; j < 3; j++) {
            var cell = $('tr[row='+m+'] td')[j];

            cell.setAttribute("class", "block4");


        }
    }
    for (var m = 3; m < 6; m++) {

        for (var j = 3; j < 6; j++) {
            var cell = $('tr[row='+m+'] td')[j];
            //console.log(cell.innerHTML);
            cell.setAttribute("class", "block5");


        }
    }
    for (var a =3; a< 6; a++) {

        for (var j = 6; j < 9; j++) {
            var cell = $('tr[row='+a+'] td')[j];
          // console.log(cell.innerHTML);
            cell.setAttribute("class", "block6");


        } }
        // block attribute
    for (var m = 6; m < 9; m++) {

            for ( var j = 0; j < 3; j++) {
                var cell = $('tr[row='+m+'] td')[j];
               // console.log(cell.innerHTML);
                cell.setAttribute("class", "block7");


            }
        }
    for (var m = 6; m < 9; m++) {

            for (var j = 3; j < 6; j++) {
                var cell = $('tr[row='+m+'] td')[j];
                //console.log(cell.innerHTML);
                cell.setAttribute("class", "block8");


            }
        }
    for (var m = 6; m < 9; m++) {

            for (var j = 6; j < 9; j++) {
                var cell = $('tr[row='+m+'] td')[j];
                //  console.log(cell.innerHTML);
                cell.setAttribute("class", "block9");


            }
        }
    // Event Listeners for cells
    for (var m = 0; m < 9; m++) {

        for (j = 0; j < 9; j++) {
            var cell = $('tr[row='+ m +'] td')[j];
            // checking the valid input in range 1-9
            if(cell.getAttribute("contenteditable")=="true" ) {
                cell.onkeyup = function(){
                    input = this.innerHTML;
                     if (parseInt(input)>0 && parseInt(input)<10){}
                      else this.innerHTML ="";

                }


            }
            // highlighting other cells with the value same as clicked cell
            cell.onclick = function () {
                selectedCellValue = this.innerHTML;
                checkOthersValue();
                return selectedCellValue ;
            };

            cell.onmouseover = function () {
                HoveredCell = this ;
                cellHover();
                return HoveredCell;
            } ;

            cell.onmouseout = function () {
                var normalColorForFull ="rgba(0, 192, 0, 0.10)";
                var normalColorForEmpty ="white";
                if(this.getAttribute("contenteditable")=="false") {
                    this.style.backgroundColor = normalColorForFull;

                }
                else
                {this.style.backgroundColor = normalColorForEmpty ;}
                checkOthersValue();

            };

        }

    }
    function cellHover () {
        var cellHoverColor = xml.querySelector("sudoku").getAttribute("hover");
        HoveredCell.style.backgroundColor=cellHoverColor;
        messege.innerHTML="";
    }
    function checkOthersValue() {
        var selectedNumberColor = xml.querySelector("sudoku").getAttribute("selectedNumberColor");
        var selectedNumberBackColor = xml.querySelector("sudoku").getAttribute("selectedNumberBackColor");
        // console.log(selectedNumberBackColor);
        for (var m = 0; m < 9; m++) {
            for (j = 0; j < 9; j++) {
                var cell = $('tr[row='+ m +'] td')[j];


                //  console.log(cell.innerHTML);

                if (cell.innerHTML==selectedCellValue) {
                    if(selectedCellValue==""){
                        cell.style.backgroundColor="white";
                    }
                    else {
                        cell.style.backgroundColor=selectedNumberBackColor;
                        cell.style.color = selectedNumberColor ;
                    }

                    //cell.css("background-color", "yellow");
                    //console.log("i am mosavi");
                }
                else {
                    cell.style.color = "black" ;
                    if(cell.getAttribute("contenteditable")=="false") {
                        cell.style.backgroundColor= "rgba(0, 192, 0, 0.10)";

                    }
                    else
                    {cell.style.backgroundColor = "white" ;}


                    // cell.css("background-color", "red");
                }

            }

        }

    }
    function find_duplicates(data) {

        var track = {};
        var duplicates = [];

        data.forEach(function (item) {
            !track[item] ? track[item] = true : duplicates.push(item);
        });
        //console.log(duplicates.length);
        return duplicates.length;

    }
    function  colValidator(){
        var dupBlock = [];
        for  ( var i = 0 ; i<9; i++) {

            var colNumber = i;
            var colCellArray = [];
            for (var j = 0; j < 81; j++) {
                var selector =document.querySelectorAll("td")[j];
                if (selector.getAttribute("col")==colNumber && selector.innerHTML!="")
                { colCellArray.push(document.querySelectorAll("td")[j].innerHTML);}
            }

            //  console.log(rowCellArray);
            var dupCounter = find_duplicates(colCellArray);
            if (dupCounter > 0) {
                dupBlock.push(i);

            }


        }
        return dupBlock;
    }
    function rowValidator(){
        var dupBlock = [];
        for  ( var i = 0 ; i<9; i++) {

            var rowNumber = i;
            var rowCellArray = [];
            for (var j = 0; j < 81; j++) {
                    var selector =document.querySelectorAll("td")[j];

                    if (selector.getAttribute("row")==rowNumber && selector.innerHTML!="")
                    { rowCellArray.push(document.querySelectorAll("td")[j].innerHTML);}
           }

            //  console.log(rowCellArray);
            var dupCounter = find_duplicates(rowCellArray);
            if (dupCounter > 0) {
                dupBlock.push(i);

            }


     }
        return dupBlock;
    }
    function blockValidator () {
        var dupBlock = [];
        for  ( var i = 1 ; i<10; i++) {

            var className = "block" + i;
            var blockCellArray = [];
            for (var j = 0; j < 9; j++) {
                if (document.querySelectorAll("." + className)[j].innerHTML !=""){
                    blockCellArray.push(document.querySelectorAll("." + className)[j].innerHTML)  ;
                }

            }

          //console.log(blockCellArray);
            var dupCounter = find_duplicates(blockCellArray);

            if (dupCounter > 0) {
                dupBlock.push(i);


            }


        }
        return dupBlock;
    }
    function showErrorInBlock (array){
        for(i=0;i<array.length;i++) {

            var className = "block" + array[i];
            for (var j = 0; j < 9; j++) {

                var selector = document.querySelectorAll("." + className)[j];
               // console.log(selector);
                selector.style.backgroundColor ="rgb(255, 102, 102)";
            }
            messege.style.color = "rgb(255, 77, 77)";
            document.querySelector('#error').innerHTML = "You have made some mistakes, highlighted in red!";
            //alert("Error in block number "+array[i]);
        }


    }
    function showErrorInRow (array) {
        for(i=0;i<array.length;i++) {
            var rowNumber = array[i];
            for (var j = 0; j < 81; j++)
            {
                var selector =document.querySelectorAll("td")[j];
                if (selector.getAttribute("row")==rowNumber) {
                    selector.style.backgroundColor = "rgb(255, 102, 102)";

                }
            }
            messege.style.color = "rgb(255, 77, 77)";
           document.querySelector('#error').innerHTML = "You have made some mistakes, highlighted in red!";

        }
    }
    function showErrorInCol (array) {
        for(i=0;i<array.length;i++) {
            var colNumber = array[i];
            for (var j = 0; j < 81; j++)
            {
                var selector =document.querySelectorAll("td")[j];
                if (selector.getAttribute("col")==colNumber) {
                    selector.style.backgroundColor = "rgb(255, 102, 102)";

                }
            }
            messege.style.color = "rgb(255, 77, 77)";
            document.querySelector('#error').innerHTML = "You have made some mistakes, highlighted in red!";

        }
    }
    function isUserDone(){
        for (var i=0; i<81; i++) {
            var content = document.querySelectorAll('td')[i].innerHTML;
           // console.log(content);
            if (content==""){
                messege.style.color = "rgb(255, 77, 77)";
                messege.innerHTML = "you are not done yet!";
                alert("you are not done yet!");
                return false;
            }

        }
        return true;
    }
    function xsdToXml(){
        var wholeCellXml="";
        for (var i=0; i<81; i++) {
            var content = document.querySelectorAll('td')[i].innerHTML;
          var cellXml = "<cell posval=\"12\">"+content+"</cell>\n";
             wholeCellXml = wholeCellXml.concat(cellXml);
            //console.log(wholeCellXml);


       }
        return wholeCellXml;


    }



}


