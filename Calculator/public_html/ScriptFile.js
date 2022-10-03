
//Note that whenever your code starts the onclick event needs to be followed 
//by a function
//start writting code
window.onload = function() {
/*DEFINE VARIABLES*/
//this code gets all elements in the with tag span that are childrens
//of the tag under the calculator ID

var ButtonValue; //represents the button value

var ScreenDisplay; //represents what is currently on the screen

var result = "not initialized"; //variable that stores the result

//make a variable for the screen
var screen = document.getElementById('screen');

//what is queryselectorall?
//

//store all the numbers keys in a separate array
var numbers = document.getElementsByClassName('number');

//Store all the operators in an array
var operators = document.getElementsByClassName('operator');

//variable for the push operation
var push = document.getElementById("push");

//variable for clear operation
var clear = document.getElementById("clear");

//variable for plusMinus
var plusMinus = document.getElementById("plusMinus");

//variable for period
var period = document.getElementById("period");

//Create a stack to put the values in
var stack = [];
//how many keys we have in the calculator? 18 keys 

//START WRITTING CODE
//loops the number keys in the calculator
 for(var i = 0; i < numbers.length; i++ ){
     
     numbers[i].addEventListener("click",function(){
         
        ScreenDisplay = screen.innerHTML;
        ButtonValue = this.innerHTML; 
        
        //if the display is zero then
        if(ScreenDisplay === "0" ){
            //clear the screen
            screen.innerHTML = "";
            //add value
            ScreenDisplay = screen.innerHTML += ButtonValue;
        }
        else if(screen.innerHTML === result.toString()){
             //clear the screen
            screen.innerHTML = "";
            //add value
            ScreenDisplay = screen.innerHTML += ButtonValue;
        }
        else{
        //concatenation
        ScreenDisplay = screen.innerHTML += ButtonValue;
    }
         
         
     });
     
 }
 
 //loops for the operators
  for(var i = 0; i < operators.length; i++ ){
     
     operators[i].addEventListener("click",function(){
        var calcNumber;
        
        //for sum
        if(this.innerHTML === "+"){
            //perform calculation
            calcNumber = stack[0]+stack[1];
            //empty the stack
            stack = [];
            //push result
            stack.push(calcNumber);
        }
        
        //for subtraction
        else if(this.innerHTML === "-"){
            //check for an error
            /*if(stack.length === 2){
                //say the result to 0
                result = 0;
                //empty the stack
                stack = [];
                //display error on the sreen
                ScreenDisplay = screen.innerHTML = "Error please press C"; 
            }*/
                //perform calculation
                calcNumber = stack[0]-stack[1];
                //empty the stack
                stack = [];
                //push result
                stack.push(calcNumber);
            
        }
        //for division
        else if(this.innerHTML === "÷"){
            //perform calculation
            calcNumber = stack[0]/stack[1];
            //empty the stack
            stack = [];
            //push result
            stack.push(calcNumber);
        }
        
        //for multiplication
        //for division
        else if(this.innerHTML === "x"){
            //perform calculation
            calcNumber = stack[0]*stack[1];
            //empty the stack
            stack = [];
            //push result into the array
            stack.push(calcNumber);
        }
        
        //Change the display to show calculation
        result = calcNumber; 
        ScreenDisplay = screen.innerHTML = calcNumber; 
     });
     
 }
 
  //function for when the push button is selected
push.addEventListener("click",function(){
    //if the length of the stack has 2 values dont push more
    if(stack.length === 2){
        //do nothing
    }
    else{
    //puch the number into the stack
    stack.push(Number(screen.innerHTML));
    
    //clear the display
    ScreenDisplay = screen.innerHTML = "";
    }
    
});

//function for when the clear button is selected
clear.addEventListener("click",function(){
    //clear the stack
    stack = [];
    //clear the display
    ScreenDisplay = screen.innerHTML = 0;
    
});

//work with th eplus minus button
plusMinus.addEventListener("click",function(){
    //check if the number on the display is positive or negative
    if(Number(screen.innerHTML) > 0){
        //changing the sign pn the screen
        screen.innerHTML = "-" + screen.innerHTML;
    }
    else{
       screen.innerHTML = (Math.abs(Number(screen.innerHTML))).toString(); 
    }
    
});

//work with the decimal button
period.addEventListener("click",function(){
    //check to see if there is another period on the string
    
    //if the display is empty do nothing
    if(screen.innerHTML.length === 0){
        //do nothing
    }
    
    for(var i = 0; i < screen.innerHTML.length; i++ ){
        if(screen.innerHTML.charAt(i) === "."){
            //do nothing
        }
        
        //if we reach the end of the loop without finding .
        else if( i === (screen.innerHTML.length - 1)){
            //concatenation
            ScreenDisplay = screen.innerHTML += this.innerHTML;
        }   
    }
  
});


    
};


//https://codepen.io/ckm100/pen/dPLyjZ