/* 
 * Gustavo Grinsteins
 * CSE 264
 * Srping 2017
 * Final Project
 * Mine Sweeper
 */

//Declare and initialize Global Variables
var name = ""; //this is a string
var width = 0; //this is an int
var height = 0; //this is an int 
var numMines = 0; //this is an int
var board = []; //declare the array
var jugadores = []; //declare the leaderBoard info array
var time;

//create an enum in javascript
var MineSweeperCell = {
    INVALID_CELL: "invalid",
    COVERED_CELL: "covered",
    FLAG: "flag",
    MINE: "mine",
    FLAGGED_MINE: "flagged mine",
    UNCOVERED_MINE: "uncovered mine",
    ADJACENT_TO_0: 0,
    ADJACENT_TO_1: 1,
    ADJACENT_TO_2: 2,
    ADJACENT_TO_3: 3,
    ADJACENT_TO_4: 4,
    ADJACENT_TO_5: 5,
    ADJACENT_TO_6: 6,
    ADJACENT_TO_7: 7,
    ADJACENT_TO_8: 8
};

//WRITE A METHOD TO WRITE IT ON THE TABLE THIS WILL BE MY TESTING
function makeTable(container, data) {
    var table = $("<table>").addClass('grid');
    
    $(table).attr("data-role", "table");
    
    //add the tehead tag
    table.append("<thead></thead>");
    
    //add the tbody tag
    $.each(data, function(rowIndex, r) {
        var row = $("<tr>");
        $.each(r, function(colIndex, c) { 
            row.append($("<td>").text(c));
        });
        table.append(row);
    });
    //add Jquery Mobile stuff
    //$( "table" ).attr("data-role", "table");

    
    return container.append(table);
}

//NOTE: I need to pass the created 2d array to the getters and setters
//so I do not get an undefined thing problem

//function to initialize the board it will return a 2d array.
function startBoard(width, height, board){
    
    for (var i = 0; i < width; i++)
        {
            //initialize the first row
            board [i] = [];
            
            for (var j = 0; j < height; j++)
            {
                //initialize the 2d array        
                setCell(i, j, MineSweeperCell.COVERED_CELL, board);
                //board[i][j] = MineSweeperCell.COVERED_CELL;
            }

        }
}

function placeMines (numMines, board){
    
    // randomly place specified number of mines in the board
        // Place the mines a random locations on the board
        var m = 0;
        while (m < numMines)
        {
            //obtain random locations for the mines
            var x = Math.floor(Math.random()*width); // column
           
            var y = Math.floor(Math.random()*height); // row
           
            // Check to make sure there is no mine at that spot
            // if there is a mine the loop will run again until
            // a mine-less spot is found
            if ((getCell(x, y, board) != MineSweeperCell.MINE))
            {

                setCell(x, y, MineSweeperCell.MINE, board);

                m += 1;

            }

        }
    
}

//set cell function
function setCell(x, y, MSCvalue, board)
    {
        if (chekParams(x, y))
        {
            board[x][y] = MSCvalue;
        }

    }
    
//get cell function
function getCell(x, y, board)
    {
        if (chekParams(x, y))
        {
            return board[x][y];
        }

        return MineSweeperCell.INVALID_CELL;

    }
    
//check the parameters
function chekParams(x, y)
    {

        var b =
            !(x < 0 || x > (width - 1) || y < 0 || y > (height - 1));

        return b;

    }
    
//adjacent to method
function adjacentTo(number)
    {
        if (number == 0)
        {
            return MineSweeperCell.ADJACENT_TO_0;
        }
        else if (number == 1)
        {
            return MineSweeperCell.ADJACENT_TO_1;
        }
        else if (number == 2)
        {
            return MineSweeperCell.ADJACENT_TO_2;
        }
        else if (number == 3)
        {
            return MineSweeperCell.ADJACENT_TO_3;
        }
        else if (number == 4)
        {
            return MineSweeperCell.ADJACENT_TO_4;
        }
        else if (number == 5)
        {
            return MineSweeperCell.ADJACENT_TO_5;
        }
        else if (number == 6)
        {
            return MineSweeperCell.ADJACENT_TO_6;
        }
        else if (number == 7)
        {
            return MineSweeperCell.ADJACENT_TO_7;
        }
        else if (number == 8)
        {
            return MineSweeperCell.ADJACENT_TO_8;
        }
        else{
            alert('Yo, your number is not from 0 to 8');
        }
    }
    
//UNCOVER METHOD - THIS WILL BE A CLICK EVENT
function uncoverCell(x, y, board)
    {
        var c = getCell(x, y, board);
        // switch statement implementation
        switch (c)
        {
            case MineSweeperCell.COVERED_CELL:
                // this should define the cell as the number of adjacent
                // mines that are close to it
                setCell(
                    x,
                    y,
                    adjacentTo(numberOfAdjacentMines(x, y, board)), 
                    board);

                break;

            case MineSweeperCell.MINE:
                setCell(x, y, MineSweeperCell.UNCOVERED_MINE, board);
                break;

            default:
                // do nothing
                break;
        }
        //change the value in the html table
        //method that traverses and changes the value
        //of the TD
        tableTraverse(x,y);

    }
    
 function numberOfAdjacentMines(x, y, board)
    {
        // start counter to find the number of mines adjacent
        var counter = 0;
        // this for loop is incharge of exploring the adjacent
        // cells relative to the cell we want to find the number
        // of mines adjacent to
        // column loop
        for (var a = (x - 1); a <= (x + 1); a++)
        {

            // row loop loop
            for (var b = (y - 1); b <= (y + 1); b++)
            {

                // check to make sure the index is not out
                // of bounds Then change the number
                if (a >= 0 && a < width && b >= 0 && b < height)
                {

                    // if there is a mine around add that to the counter
                    if (getCell(a, b, board) === MineSweeperCell.MINE
                        || getCell(a, b, board)
                            === MineSweeperCell.FLAGGED_MINE
                        || this.getCell(a, b, board)
                            === MineSweeperCell.UNCOVERED_MINE)
                    {

                        counter += 1;

                    }

                    // bracket for if statement
                }
                // bracket for row for loop
            }
            // bracket for column for loop
        }

        // return what we have counted
        return counter;
    }
    
function revealBoard()
{
    // this for loop will run through the board
    // and uncover everything
    for (var i = 0; i < width; i++)
    {

        for (var j = 0; j < height; j++)
        {

            uncoverCell(i, j, board);

        }

    }
}

//traverse table to change values
function tableTraverse(r, c){
    //console.log(array);
    //I want to just traverse the td's
    $("#gameBoard td").each(function(){
        
        //obtain the reference
        var refTarget = this;
        
        //if the row column combination matches
        //change classes
        var col = $(refTarget).parent().children().index($(refTarget));
        var row = $(refTarget).parent().parent().children().index($(refTarget).parent());
        
 
        //if the selection matches
        if(r == row && c == col){
            console.log("Matched!")
            //set the value of the cell to the 2d
            //array value
            var word = board[r][c];
            if(word == MineSweeperCell.FLAG || word == MineSweeperCell.FLAGGED_MINE){
                word = MineSweeperCell.FLAG;
            }
            $(this).html(word);
            
        }
            
            
       
        
    });
    
   
}

function flagCell(x, y, board)
    {
        // for this method check to see if the cell has a mine
        // if it does call it a flagged mine enum
        switch (getCell(x, y, board))
        {
            case MineSweeperCell.COVERED_CELL:
                // this should define the cell as the number of adjacent
                // mines that are close to it
                setCell(x, y, MineSweeperCell.FLAG,board);

                break;

            case MineSweeperCell.MINE:

                setCell(x, y, MineSweeperCell.FLAGGED_MINE,board);

                break;

            default:
                // do nothing
                break;

        }
        
        //change the cell in the actual board
        tableTraverse(x,y);

    }
    
function isGameLost()
    {

        for (var i = 0; i < height; i++)
        {

            for (var j = 0; j < width; j++)
            {

                if ((getCell(i, j,board)) == (MineSweeperCell.UNCOVERED_MINE))
                {
                    return true;
                }

            }

        }

        return false;

    }
    
    function isGameWon()
    {
        // meet the conditions
        // implement foor loop that examines the board
        // use numMines for mine examination
        // only mines can be flagged?
        // this values will be used for testing
        var m = 0;
        // EXAMINING
        for (var i = 0; i < width; i++)
        {

            for (var j = 0; j < height; j++)
            {

                if ((getCell(i, j,board)) == (MineSweeperCell.FLAGGED_MINE))
                {
                    m += 1;
                }
                // assuming the only flags are the ones on the mines
                else if ((getCell(i, j, board)) == (MineSweeperCell.FLAG))
                {
                    return false;
                }
                else if ((getCell(i, j, board))
                    == (MineSweeperCell.COVERED_CELL))
                {
                    return false;
                }

            }

        }

        // EVALUATING
        return (m == this.numMines);

    }
    
    //timer functions
    function startTime(){
          var start = new Date;  
          time = setInterval(function() { 
              $('#timer').text(Math.floor((new Date - start) / 1000)
                      + " Seconds"); }, 1000);

            
    }
    
    
    function stopTime(){
        clearInterval(time);
    }
    
    
    function clearGame(){
        //clear the html
        $("#gameBoard").html("");
        $("#gameBoard2").html("");
        $("#timer").html("");
        //$("#leaderBoard").html("");
        //clear the 2d array
        board = [];
    }
    
//function for the leader board (similar to word search)
function loadStatus(players) {
    var usergrid = "";
    for (var i = 0; i < players.length; ++i) {
        var player = players[i];
        var row = "<tr>" + "<td>" + player.name + "</td>" +
                "<td>" + player.time + "</td>" +
                "<td>" + player.width + "X" + player.height + "</td>"
                + "<td>" + player.mines + "</td>" +
                "</tr>";
        usergrid += row;
    }
    $("#leaderBoard tbody").html(usergrid);
}

//create a leader board constructor
function leaderBoardInfo(name, time, mines, width, height) {
	this.name = name;
        this.time = time;
        this.mines = mines;
        this.width = width;
        this.height = height;
};
  
    
 $(document).ready(function(){
     
     if(JSON.parse(localStorage.getItem("scores")).length != 0){
     //get array from storage
     jugadores = JSON.parse(localStorage.getItem("scores"));

     //write the leader board
     loadStatus(jugadores);
     
    }
    
    //add click to delete table
    $("#deleteBoard").click(function(){
        
        //empty players list
        jugadores = [];
        
        //empty html
        $("#leaderBoard tbody").html("");
        
    });
    
    
    //add click to initialize the board
    $("#playButton").click(function(){
        
        
        //initialize the width, height, and number of mines
        name = $("#name").val();
        width = $("#width").val();
        height = $("#height").val();
        numMines = $("#mines").val();
        
        //check to make sure the number of mines are less than
        //width*height
        
        if(width*height <= numMines){
            alert("Pick a number of mines that is less than" +
                    " width*height");
            
            //clear the boxes
            $("#name").val("");
            $("#mines").val("");
            $("#width").val("");
            $("#height").val("");
            
        }
            
        
        
        else{
            //clear the boxes
            $("#name").val("");
            $("#mines").val("");
            $("#width").val("");
            $("#height").val("");

            //initialize the table
            startBoard(width,height,board);

            //print the board to a table the user can see
            //with all the cells covered
            makeTable($("#gameBoard"), board);

            //start the counter
            startTime();

            //place mines in the table
            placeMines (numMines, board);

            //write down the answer table
            makeTable($("#gameBoard2"), board);
        
        }
    
    });
    
    //add event handler to flag or uncover a cell
    $('#gameBoard').mousedown(function(event) {
    switch (event.which) {
        case 1:
            //alert('Left Mouse button pressed.');
            
                //get the target reference
            var refTarget = event.target;

            //obtain the coordinates in the table
            var col = $(refTarget).parent().children().index($(refTarget));
            var row = $(refTarget).parent().parent().children().index($(refTarget).parent());

            //if the thing was already selected
            if(refTarget.className === "picked"){

                //do nothing
            }

            //if it has nit been selected
            else{
                //uncover the cell in 2d array
                uncoverCell(row, col, board);

                //add a class to this using jquery
                $(refTarget).addClass("picked"); 


          }
            
            break;
        case 2:
            //alert('Middle Mouse button pressed.');
            break;
        case 3:
            //alert('Right Mouse button pressed.');
            var refTarget = event.target;

            //obtain the coordinates in the table
            var col = $(refTarget).parent().children().index($(refTarget));
            var row = $(refTarget).parent().parent().children().index($(refTarget).parent());

            //if the thing was already selected
            if(refTarget.className === "flagged"){

                //de flag the cell
                //remove the class
                $(refTarget).removeClass("flagged");
                //change the cell value to covered
                setCell(row, col, MineSweeperCell.COVERED_CELL,board);
                //change the value in actual table
                tableTraverse(row,col);
            }

            //if it has nit been selected
            else{
                //Flag the cell
                flagCell(row, col, board);


                //add a class to this using jquery
                $(refTarget).addClass("flagged"); 


          }
            
            break;
        default:
            
    }
    
    //ADD GAME WON LOST METHOD
    if(isGameWon()){
        alert('congrats you won');
        //empty everything out
        //Obtain the current value in the timer
        var gameTime = $('#timer').text();
        console.log(gameTime);
        //stop the timer
        stopTime();
        
        //store winner info in array
        jugadores.push(new leaderBoardInfo(name, gameTime, numMines, width, height));
        
        //sort array from least to gratest time
        
        //write to the leader board
        loadStatus(jugadores);
        
        //store in local storage
        localStorage.setItem("words", JSON.stringify(jugadores));
        
        //clear everything
        clearGame();
        
    }
    else if (isGameLost()){
        alert('congrats you lost');
        
        var gameTime = $('#timer').text();
        console.log(gameTime);
        
        //stop the timer
        stopTime();
        
        //clear everything
        clearGame();
    }
                    
                
});


////TRAPPING UNLOAD EVENT
$(window).on("unload", function(){
    
    //empty current storage
    localStorage.removeItem("scores");
    
    //store in local storage
    localStorage.setItem("scores", JSON.stringify(jugadores));
    
});
    
    
    
});

