/* 
 * Gustavo Grinsteins
 * CSE 264
 * Srping 2017
 * Word Search Game
 */

//Global variables
var id = "";
var userName = "";
var logStatus = "";
var rcArray = [];


$(document).ready(function(){
    
////test
//
//var testArray = [];
//var targetR = 3;
//var targetC = 4;
//        
//testArray.push(new coordinate(1,1));
//testArray.push(new coordinate(1,2));
//testArray.push(new coordinate(5,5));
//testArray.push(new coordinate(3,4));
//testArray.push(new coordinate(0,1));
//
//console.log(testArray);
//
////remove the item from the array
//testArray = $.grep(testArray, function(value){
//
//    return( (value.r !== targetR) && (value.c !== targetC) );
//
//});
//
//console.log(testArray);

    
//ADD CLICK EVENT HANDLER FOR LOGIN BUTTON
$("#register").click(function(){
    
    //Get the text in the login text box
    //console.log($("#login").val())
    //run the ajax call
    Login();
    
    
});

//CLICK EVENT FOR SUBMIT BUTTON
$("#submitWord").click(function(){
    
    SubmitWord();
    
});
    
    //Click event for td in tables
$("#playBoard").click(function(event){
    
    var refTarget = event.target;
    
    console.log(event.target.tagName);
    
    //check to make sure we selected a td
    if(event.target.tagName === "TD"){
        var col = $(refTarget).parent().children().index($(refTarget));
        var row = $(refTarget).parent().parent().children().index($(refTarget).parent());
        //if the thing was already selected
        if(event.target.className === "picked"){

            //remove the picked class to get rid of the border
            $(refTarget).removeClass("picked");

            //remove the item from the array
            rcArray = $.grep(rcArray, function(value){

                return( (value.r !== row) && (value.c !== col) );

            });
            
            console.log(rcArray);

        }
    
    //if it was not selected
    else{
      
        //add a class to this using jquery
        $(refTarget).addClass("picked");
        
        //create a coordinate object and push it to array
        rcArray.push(new coordinate(row,col));
        
        console.log(rcArray);
        
      }
    
    }
    
    
});    
    
    //add a click event method that highlights the word you selected
    //write the code similar to the magnetic poetry code
    
   //socket events --> look at set game example
   
   var HOST = "cse264.info:3000";
   
   var socket = io.connect(HOST);
   
   // Update the leader board when an updated player list arrives from the server
    socket.on('players', function (players) {
        console.log(players);
        loadStatus(players);
    });
    
    // Update the 
    socket.on('gridupdates', function (message) {
        loadGridUpdates(message);
        //console.log(message);
    });
    
    
});

//OTHER FUNCTIONS
//load the grid updates
function loadGridUpdates(object){
    //get the array of letters
    console.log(object.words);
    $(object.words).each(function(){
        
        $(this.letters).each(function(){
            //write a method that obtains the current row
            //and column searches it in the table
            //console.log(this);
            var r = this.r;
            var c = this.c;
            
        });
        
    });
}


//load the leader board
// loadStatus reloads the leader board from the list of players
function loadStatus(players) {
    var usergrid = "";
    for (var i = 0; i < players.length; ++i) {
        var player = players[i];
        var row = "<tr style='background-color:" + (player.winner ? "gold" : "white") + "'>" +
                "<td>" + player.name + "</td>" +
                "<td>" + player.score + "</td>" +
                "</tr>";
        usergrid += row;
    }
    $("#leaderBoard tbody").html(usergrid);
}
//need to structure the string so that I can put it in the data form
function fixString(serverString, rows, columns){
    //all the arrays of column number of leters will go in here
    var contArray = [];
    var stringIndex = 0;
    //create a double for loop
    for(var i = 0; i < rows; i++){
        //array that will go in the contArray
        var inArray = [];
        for(var j = 0; j < columns; j++){
            
            //iterate through the given string and push into array
            inArray.push(serverString.charAt(stringIndex));
            
            //increse the stringIndex
            stringIndex += 1;
        }
        
        //push array into the other array
        contArray.push(inArray);
    }
    
    return contArray;
    
}

//This function will take the string given by the server and make 
//a table out of it. Original Code obtained from: 
//http://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
//Modified version
function makeTable(container, data) {
    var table = $("<table/>").addClass('grid');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<td/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

  //writing the ajax functions
    
  function Login() {
  $.ajax(
    "http://cse264.info:3000/wordsearch/login",
    {
      type: "GET",
      processData: true,
      data: { username: $("#login").val() },
      dataType: "json",
      //where does result come from? from entries on the app.post?
      success: function (result) {
        console.log(result);
        
        logStatus = result.success;
        
        //check if login was a success
        if(logStatus){
            //store the results accordingly
            id = result.id;
            userName = result.username;
            
            //get the board game
            GetPuzzle();            
            //console.log(id + " " + userName);
        }
        
        else{
            alert("Please log in again, something went wrong");
        }
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
  
  //clear out the login tab
  $("#login").val("");
}

//Get Puzzle ajax call
  function GetPuzzle() {
  $.ajax(
    "http://cse264.info:3000/wordsearch/puzzle",
    {
      type: "GET",
      processData: true,
      data: { id: id },
      dataType: "json",
      //where does result come from? from entries on the app.post?
      success: function (result) {
          
          console.log(result);
          
          //if all is good
          if(result.success){
          //put the string in the board
          //put the string in the format I want
          var data = fixString(result.grid, result.nrows, result.ncols);
          //insert this into the word search table
          makeTable($("#playBoard"), data);
          //place the theme where it goes
          $("#subject").html("Theme: " + result.theme);
        }
        
        //if something went wrong
        else{
            alert('something went wrong loading the puzzle');
        }
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
  
}

//CONSTRUCTOR FOR Coordinate
function coordinate(r, c) {
	this.r = r;
        this.c = c;
};



//Get Puzzle ajax call
  function SubmitWord() {
  $.ajax(
    "http://cse264.info:3000/wordsearch/submit",
    {
      type: "GET",
      processData: true,
      data: { id: id, letters: rcArray },
      dataType: "json",
      //where does result come from? from entries on the app.post?
      success: function (result) {
          
          //do something with the result
          console.log(result);
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    }
  );
  
}

