import React , {useState , useEffect} from "react";
import $ from 'jquery';
import { Button , Form , InputGroup , FormControl , Row , Col , Modal , Image} from 'react-bootstrap';


const DOWN = "down" , RIGHT = "right" , LEFT = "left" , UP = "up";
var direction;
const INTERVALO = 200;
var start = false;
const NUEVO = 0 , READY= 1 ,JUGANDO = 2 , FIN = 3;
const OVERFLOW = 150;
var gameState = NUEVO;
var snake;
var snakeHead;
var fruit;
var eatenFruits=0;
const HEIGHT = 10;
const WIDTH = 10;
var lastDirection;

function SnakeGame(props) {
    var matrix = new Array(HEIGHT); 
    for(let i=0 ; i<HEIGHT ; i++){
        matrix[i]= new Array(WIDTH);
        for(let j=0 ; j<WIDTH ; j++){
            matrix[i][j] = {ocupado: false}
        }
    }
    matrix[0][0].ocupado=true;
    snake = new Array();
    snake.push({i: 0 , j: 0 , orientation: RIGHT});
    snakeHead=0;
    

    $("body").on("keydown", function(e) {
    	if(e.keyCode == 37 && gameState==JUGANDO && lastDirection!=RIGHT) { // left
            direction = LEFT;
          }
          else if(e.keyCode == 39 && direction!=LEFT) { // right
            
            if(gameState==NUEVO) {
                gameState=JUGANDO;
                direction = RIGHT;
                playGame();
            }else if (gameState==JUGANDO && lastDirection!=LEFT) {
                direction = RIGHT;
            }
          }
          else if(e.keyCode == 38 && gameState==JUGANDO && lastDirection!=DOWN) { // up
            direction = UP;
          }
          else if(e.keyCode == 40 && gameState==JUGANDO && lastDirection!=UP) { // down
            direction = DOWN;
          }
});
      
  var ini = <> 
    <hr/>
    <div className="d-flex justify-content-center">
        <Row>
        <Col><h4 className="text-center" id="eatenFruits">Fruits: {eatenFruits}</h4></Col>
        <Col><Button variant="primary" onClick={()=>newGame()}>New Game</Button></Col>
        </Row>
    </div>
    <hr/>
    <table className="d-flex justify-content-center">
        <tbody className="tableSnake">
        {matrix.map(function(x , i) {
        return  <tr key={i}>{(x.map( function (y , j) {
            return <td key={j} 
                    className="snakeBox"
                    id={i+"-"+j}
                    >{isIniBox(i , j)}</td> 
            }))}
            </tr>;
            
        })}
        </tbody>
    </table>
  </>;
  

  useEffect(() => {
    calculateNewFruit();
  }, []);

  return (
    <>
        
        {ini}

    </>
  );

  function isIniBox(i , j) {
      if (i==0 && j==0) return <img src="images/snakeHead.png" className ="snakeImg"/>
      return;
  }
    function newGame(e){
        if(gameState==NUEVO){
            eatenFruits = 0;
            gameState=JUGANDO;
            playGame();
        }else if (gameState==FIN) {
            inicializar();
        }
    }

    function inicializar() {
        gameState=NUEVO;
        for(let i=0 ; i<HEIGHT ; i++){
            matrix[i]= new Array(WIDTH);
            for(let j=0 ; j<WIDTH ; j++){
                matrix[i][j] = {ocupado: false}
                $('#'+i+'-'+j).empty();
            }
        }
        matrix[0][0].ocupado=true;
        snake = new Array();
        snake.push({i: 0 , j: 0 , orientation: RIGHT});
        snakeHead=0;
        eatenFruits=0;
        $("#0-0").prepend($('<img>',{src: "images/snakeHead.png", class: "snakeImg right"}));
        calculateNewFruit();
        
        direction=null;
        lastDirection=null;
        $("#eatenFruits").text("Fruits: " + eatenFruits);
    }
    function playGame() {
        if(gameState == JUGANDO){
            setTimeout( ()=>{
                
                    if(gameState == JUGANDO) {
                        movimientoSnake();
                        playGame();
                    }
            } ,INTERVALO );
        }
    }
    
  function movimientoSnake(){
      var idBox;
      var headBox;

      switch(direction){
        case DOWN:      headBox = snake[snake.length - 1];
                        if( !gameOver(headBox.i + 1 , headBox.j) && headBox.i + 1 < HEIGHT ){
                            matrix[headBox.i][headBox.j].ocupado = true;
                            idBox = "#"+(headBox.i +1) +"-"+headBox.j;
                            snake.push({i: headBox.i + 1 , j: headBox.j , orientation: DOWN});
                            if(!eat(headBox.i + 1 , headBox.j ))
                                tailControl();
                            else addTailImg();
                            $(idBox).prepend($('<img>',{src: "images/snakeHead.png", class: "snakeImg down"}));
                            transformateHeadToBody(direction);
                            lastDirection=direction;
                        }
                        break;
        case RIGHT:     headBox = snake[snake.length - 1];
                        if( !gameOver(headBox.i , headBox.j + 1) && headBox.j + 1 < WIDTH){
                            matrix[headBox.i][headBox.j].ocupado = true;
                            idBox = "#"+(headBox.i) +"-"+(headBox.j + 1);
                            snake.push({i: headBox.i , j: headBox.j + 1 , orientation: RIGHT});
                            if (!eat(headBox.i , headBox.j + 1 ))
                                tailControl();
                            else addTailImg();
                            $(idBox).prepend($('<img>',{src: "images/snakeHead.png", class: "snakeImg right"}));
                            transformateHeadToBody(direction);
                            lastDirection=direction;
                        }
                        break;
      
        case UP:        headBox = snake[snake.length - 1];
                        if( !gameOver(headBox.i - 1 , headBox.j) &&  0 <= headBox.i - 1 ){
                            matrix[headBox.i][headBox.j].ocupado = true;
                            idBox = "#"+(headBox.i -1) +"-"+headBox.j;
                            snake.push({i: headBox.i - 1 , j: headBox.j , orientation: UP});
                            
                            if(!eat(headBox.i - 1 , headBox.j ))
                                tailControl();
                            else addTailImg();
                            $(idBox).prepend($('<img>',{src: "images/snakeHead.png", class: "snakeImg up"}));
                            transformateHeadToBody(direction);
                            lastDirection=direction; 
                        }
                        break;
        case LEFT:      headBox = snake[snake.length - 1];
                        if( !gameOver(headBox.i , headBox.j - 1) && 0 <= headBox.j - 1 ){
                            matrix[headBox.i][headBox.j].ocupado = true;
                            idBox = "#"+(headBox.i) +"-"+(headBox.j - 1);
                            
                            snake.push({i: headBox.i , j: headBox.j - 1 , orientation: LEFT});
                            if(!eat(headBox.i , headBox.j - 1 ))
                                tailControl();
                            else addTailImg();
                            $(idBox).prepend($('<img>',{src: "images/snakeHead.png", class: "snakeImg left"}));
                            transformateHeadToBody(direction);
                            lastDirection=direction; 
                        }
                        break;
      }
      gameOver();
  }
  
  function transformateHeadToBody(orientation) {
      var idBox;
      if (eatenFruits > 1) {
          if (snake[snake.length -2].orientation == orientation) {
            idBox = "#"+snake[snake.length -2].i +"-"+snake[snake.length -2].j;
            $(idBox).empty();
            $(idBox).prepend($('<img>',{src: "images/snakeBody.png", class: "snakeImg "+orientation}));
          } else if ((snake[snake.length -2].orientation==RIGHT && orientation==DOWN)||
                    (snake[snake.length -2].orientation==DOWN && orientation==LEFT)||
                    (snake[snake.length -2].orientation==LEFT && orientation==UP)||
                    (snake[snake.length -2].orientation==UP && orientation==RIGHT)
                    ){
            idBox = "#"+snake[snake.length -2].i +"-"+snake[snake.length -2].j;
            $(idBox).empty();
            $(idBox).prepend($('<img>',{src: "images/snakeCorner.png", class: "snakeImg "+snake[snake.length -2].orientation+"-"+orientation}));
          }else if ((snake[snake.length -2].orientation==DOWN && orientation==RIGHT)||
                    (snake[snake.length -2].orientation==LEFT && orientation==DOWN)||
                    (snake[snake.length -2].orientation==UP && orientation==LEFT)||
                    (snake[snake.length -2].orientation==RIGHT && orientation==UP)
                    ){
            idBox = "#"+snake[snake.length -2].i +"-"+snake[snake.length -2].j;
            $(idBox).empty();
            $(idBox).prepend($('<img>',{src: "images/snakeCornerInvert.png", class: "snakeImg "+snake[snake.length -2].orientation+"-"+orientation}));
          }

      }

  }

  function tailControl() {
    
    var tailBox;
    var idBox;
    tailBox = snake[0];
    idBox = "#"+tailBox.i+"-"+tailBox.j;
    $(idBox).empty();
    snake.splice(0,1);
    addTailImg()
  }

  function addTailImg() {
    var tailBox;
    var idBox;
    if(eatenFruits==0) return;
    tailBox = snake[0];
    idBox = "#"+tailBox.i+"-"+tailBox.j;
    $(idBox).empty();
    $(idBox).prepend($('<img>',{src: "images/snakeTail.png", class: "snakeImg " + snake[1].orientation}));
  }

  function calculateNewFruit() {
    if(gameState==FIN ) return;  
    var fruit_i ;
    var fruit_j;
    var overflow = 0;
    do {
        fruit_i = Math.floor(Math.random()* HEIGHT);
        fruit_j = Math.floor(Math.random()* WIDTH);
        overflow++;
    } while (comparation(fruit_i,fruit_j)!=null && overflow<OVERFLOW);

    var idBox;
    if(comparation(fruit_i,fruit_j)!=null){
        for(fruit_i=0 ; fruit_i<HEIGHT ; fruit_i++) {
            for(fruit_j=0 ; fruit_j<WIDTH ; fruit_j++) {
                if(!matrix[fruit_i][fruit_j].ocupado) break;
            }
        }
        if(fruit_i == HEIGHT && fruit_j==WIDTH){
            fruit_i = snake[0].i;
            fruit_j = snake[0].j;
        }
    }
    idBox = "#"+fruit_i +"-"+fruit_j;
    $(idBox).prepend($('<img>',{src: "images/fruit.png", class: "snakeImg"}));
    fruit = {i:fruit_i , j: fruit_j};
    
  }
  
  
  function comparation(fruit_i , fruit_j) {
    return snake.find((item)=>item.i==fruit_i && item.j==fruit_j);
  }

  function isSnakeBody(nextMove_i , nextMove_j) {
    return snake.find((item, i)=>i!=0 && item.i==nextMove_i && item.j==nextMove_j);
  }

  function eat(i , j) {
    if(i===fruit.i && j===fruit.j) {
        var idBox = "#"+i +"-"+j;
        $(idBox).empty();
        calculateNewFruit();
        eatenFruits++;
        $("#eatenFruits").text("Fruits: " + eatenFruits);
        return true;
    }
    return false;
  }

  function gameOver(nextMove_i=-2 , nextMove_j=-2) {
      if(eatenFruits== WIDTH*HEIGHT-1){
          gameState = FIN;
          alert("You Win!!!");
          return true;
      }
      if(nextMove_i!=-2 , nextMove_j!=-2) {
        if(nextMove_i<0 || HEIGHT<=nextMove_i){
            gameState=FIN;
            alert("Game Over!");
            return true;
        }else if(nextMove_j<0 || WIDTH<=nextMove_j){
            gameState=FIN;
            alert("Game Over!");
            return true;
        } else if(isSnakeBody(nextMove_i,nextMove_j)!=null){
            gameState=FIN;
            alert("Game Over!");
            return true;
        }
        
      }
      return false;
  }
}
export default SnakeGame;