import React , {useState} from "react";
import $ from 'jquery';
import CARDS from '../libs/cards';
import { Button , Form , InputGroup , FormControl , Row , Col , Modal , Image} from 'react-bootstrap';

var minesweeper;
var isNew;
var reminingBoxs;
var finished;
const dificulty = {easy: {height:8,width:8,mines:10} , medium: {height:16,width:16,mines:40} , hard: {height:16,width:30,mines:99}};
var reminingMines=dificulty.medium.mines;
var idBoxSelected;
var slots;
var stacks;

function FreeCellGame(props) {

  var freecell = new Array(8);
  slots = new Array(4);
  stacks = new Array(4);
  for (let i=0 ; i < 8 ; i++ ) {
      freecell[i] = new Array();
  }
  for ( let i=0;i<4 ;i++) {
    for( let j=0 ;j<7 ;j++) {
      var randomCard = Math.floor(Math.random()*CARDS.length);
      freecell[i].push(CARDS[randomCard]);
      CARDS.splice(randomCard , 1);
    }
  }

  for ( let i=4;i<8 ;i++) {
    for( let j=0 ;j<6 ;j++) {
      var randomCard = Math.floor(Math.random()*CARDS.length);
      freecell[i].push(CARDS[randomCard]);
      CARDS.splice(randomCard , 1);
    }
  }
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Row>
              
              <Col>
                  <Button variant="primary" id="boton2">New Game </Button>
              </Col>
          </Row>
        </Form.Group>
      </Form>
    {initialize()}
    </>
  );

  function initialize() {
      var ret = 
      <> 
            <div className="headerFreecell">
            <div id="slot0" className="slot"></div>
            <div id="slot1" className="slot"></div>
            <div id="slot2" className="slot"></div>
            <div id="slot3" className="slot"></div>
            <div id="stackP" className="stack"></div>
            <div id="stackD" className="stack"></div>
            <div id="stackT" className="stack"></div>
            <div id="stackC" className="stack"></div>
            </div>
            {freecell.map(function(x , col) {
            return  <div id= {"col-"+col} className="colFreecell" key={col}>{(x.map( function (card , j) {
                return <div key={j} 
                        onContextMenu={(e)=>rightClickCard(e,col,card)}
                        onDoubleClick={(e)=>rightClickCard(e,col,card)}
                        onMouseLeave={() => normalCard(card)}
                        className={"cardRow " + stackStyle ( col , j)}
                        /* id={i+"-"+j}><img className={stackStyle ( i , j)} src={"images/cards/"+card+".png"}/></div>  */
                        id={card}><img id= {card+"-img"} src={"images/cards/"+card+".png"}/></div> 
                }))}
                </div>;
                
            })}
      </>;
      
      return ret;
      
  }

  function stackStyle ( i , j) {
    if(j<1) return "" ;
    return "paddCard";
  }

  function rightClickCard(e, col ,card) {
    e.preventDefault();
    if(freecell[col]==null) return;
    if(freecell[col][freecell[col].length-1] != card ){
      viewCard(card)
    }else {
      moveToSlot(col , card)
    }
    checkStack()
  }

  function checkStack() {
    orderStack("T10");
  }

  function orderStack(card) {
    var pinta = card[0];
    var valor = card.slice(1);
    var valorStack;
    if(pinta==="P"){
      valorStack = nextValCardStack(stacks[0].length);
    }else if(pinta==="D") {
      valorStack = nextValCardStack(stacks[1].length);
    }else if(pinta==="T") {
      valorStack = nextValCardStack(stacks[2].length);
    }else {
      valorStack = nextValCardStack(stacks[3].length);
    }
    return valor==valorStack;
  }

  function nextValCardStack(len) {
    var valorStack;
    switch(len){
      case 0: valorStack="A";break;
      case 1: valorStack="2";break;
      case 2: valorStack="3";break;
      case 3: valorStack="4";break;
      case 4: valorStack="5";break;
      case 5: valorStack="6";break;
      case 6: valorStack="7";break;
      case 7: valorStack="8";break;
      case 8: valorStack="9";break;
      case 9: valorStack="10";break;
      case 10: valorStack="J";break;
      case 11: valorStack="Q";break;
      case 12: valorStack="K";break;
    }
    return valorStack;
  }
  function moveToSlot(col,card) {
    var idFreeSlot=freeSlot(card);
    if(idFreeSlot=="") return;
    var idCard = "#"+card;

    freecell[col].splice(freecell[col].length -1,1); 
    var xi = $(idCard).offset().left;
    var yi = $(idCard).offset().top;
    

   var x = $(idFreeSlot).offset().left;
   var y = $(idFreeSlot).offset().top;
  
   $(idCard ).animate( {
    
    left: "-="+(xi-x),
    top: "-="+(yi-y)
  }, 1000, function() {
    $(idCard).css('left', x-xi).css('top', y-yi);
    

  });
  }

  function freeSlot(card) {
    
    if(slots[0]==null){ 
      slots[0] = card;
      return "#slot0";
    }
    if(slots[1]==null) { 
      slots[1] = card;
      return "#slot1";
    }
    if(slots[2]==null){ 
      slots[2] = card;
      return "#slot2";
    }
    if(slots[3]==null) { 
      slots[3] = card;
      return "#slot3";
    }
    return ""
  }

  function viewCard(card) {
    
    var idCard = "#"+card;
    if($(idCard).hasClass("viewCard")){
      $(idCard).removeClass("viewCard");
    }else {
      $(idCard).addClass("viewCard");
      
    }
  }

  function normalCard(card) {
    var idCard = "#"+card;
    if($(idCard).hasClass("viewCard")){
      $(idCard).removeClass("viewCard");
    }
  }
}
export default FreeCellGame;