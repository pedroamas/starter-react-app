import React , {useState} from "react";
import $ from 'jquery';
import { Button , Form , InputGroup , FormControl , Row , Col , Modal , Image} from 'react-bootstrap';

var minesweeper;
var isNew;
var reminingBoxs;
var finished;
const dificulty = {easy: {height:8,width:8,mines:10} , medium: {height:16,width:16,mines:40} , hard: {height:16,width:30,mines:99}};
var reminingMines=dificulty.medium.mines;
var idBoxSelected;

function MinesweeperGame(props) {
  
  const [height , setHeigth] = useState(dificulty.medium.height);
  const [width , setWidth] = useState(dificulty.medium.width);
  const [mines , setMines] = useState(dificulty.medium.mines);
  const [show, setShow] = useState(false);
  var heightRef=React.createRef();
  var minesRef=React.createRef();
  var widthRef=React.createRef();
  isNew = true;
  finished = false;
  const handleClose = () => {
    newGameClick();
    setShow(false);
  }
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton className="background-green">
          <Modal.Title>You win!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center"><Image className="image" src="images/win.png" fluid /></Modal.Body>
      </Modal>
      <Form>
        <Form.Group className="mb-3">
          <Row>
              <Col>
                <Form.Control
                    onChange={optionsControl}
                    defaultValue="medium"
                    as="select">
                    <option value="easy">Easy</option>
                    <option value="medium" >Medium</option>
                    <option value="hard">Hard</option>
                    <option value="custom">Custom</option>
                </Form.Control>
              </Col>
              <Col>
                  <InputGroup>
                      <InputGroup.Text>Mines</InputGroup.Text>
                      <FormControl type="text" placeholder="Mines" ref={minesRef} defaultValue={dificulty.medium.mines}/>
                  </InputGroup>
              </Col>
              <Col>
                  <InputGroup>
                      <InputGroup.Text>Height</InputGroup.Text>
                      <FormControl id="height" placeholder="Height" ref={heightRef} defaultValue={dificulty.medium.height}/>
                  </InputGroup>
              </Col>
              <Col>
                  <InputGroup>
                      <InputGroup.Text>Width</InputGroup.Text>
                      <FormControl id="width" placeholder="Width" ref={widthRef} defaultValue={dificulty.medium.width}/>
                  </InputGroup>
              </Col>
              <Col>
                  <Button variant="primary" onClick={newGameClick} >New Game</Button>
              </Col>
          </Row>
        </Form.Group>
      </Form>
    <h4 className="text-center" id="reminingMines">Mines: {reminingMines}</h4>
    {initialize()}
    </>
  );

  function flagControl(e , i , j) {
    e.preventDefault();
    idBoxSelected = "#"+i+"-"+j;
    if (finished) return;
    if ($(idBoxSelected).hasClass("hiddenBox")){
      if ($(idBoxSelected).hasClass("flag")){
        $(idBoxSelected).removeClass("flag");
        $(idBoxSelected).addClass("question");
        reminingMines++;
      }else{
        if ($(idBoxSelected).hasClass("question")){
          $(idBoxSelected).removeClass("question");
        } else {
          $(idBoxSelected).addClass("flag");
          reminingMines--;
        }
      }
      $("#reminingMines").text("Mines: " + reminingMines);
    }
  }

  function initialize() {
    newGame();
    var retMinesweeper = 
      <> 
      <table className="d-flex  justify-content-center">
        <tbody>
          {minesweeper.map(function(x , i) {
          return  <tr key={i}>{(x.map( function (y , j) {
            return <td key={j} 
                      className="box hiddenBox"
                      id={i+"-"+j}
                      onContextMenu={(e)=>flagControl(e,i , j)}
                      onClick={()=>{
                        if(!finished) {selectedBox(i,j)}} 
                      }>{y}</td> 
            }))}
            </tr>;
            
          })}
        </tbody>
      </table>
      </>;
    return retMinesweeper; 
  }

  function newGameClick() {
    if (isNaN(heightRef.current.value)) return;
    if (isNaN(widthRef.current.value)) return;
    if (isNaN(minesRef.current.value)) return;
    finished=false;
    isNew=true;
    newGame();
    resetGame();
    setHeigth(heightRef.current.value);
    setWidth(widthRef.current.value);
    setMines(minesRef.current.value);
    reminingMines = minesRef.current.value;
    $("#reminingMines").text("Mines: " + minesRef.current.value);
  }

  function resetGame() {
    
    for (let i=0 ; i<height ; i++){
      for (let j=0 ; j<width ; j++){
        idBoxSelected = "#"+i+"-"+j;
        $(idBoxSelected).addClass("hiddenBox");
        $(idBoxSelected).removeClass("flag bomb mistake question");
      }
    }
  }

  function selectedBox( i , j ) {
    idBoxSelected = "#"+i+"-"+j;
    if(finished) return;
    if ($(idBoxSelected).hasClass("flag")) return;
    if(isNew){
      isNew=false;
      ponerMinas(mines , i , j);
      completeNumbers();
      selectedBox( i , j );
    }
    else {
      if ($(idBoxSelected).hasClass("hiddenBox")){
        reminingBoxs--;
        if(minesweeper[i][j] == "-1") {
          $(idBoxSelected).addClass("bomb");
          finish(false);
          return;
        }
        $(idBoxSelected).text(minesweeper[i][j]);
        $(idBoxSelected).removeClass("hiddenBox question");
        if(minesweeper[i][j] == "") {
          if(0<=i-1) selectedBox(i-1 , j);
          if(0<=i-1 && 0<=j-1) selectedBox(i-1 , j-1);
          if(0<=i-1 && j+1<width) selectedBox(i-1 , j+1);
          if(i+1<height) selectedBox(i+1 , j);
          if(i+1<height && 0<=j-1) selectedBox(i+1 , j-1);
          if(i+1<height && j+1<width) selectedBox(i+1 , j+1);
          if(0<=j-1) selectedBox(i , j-1);
          if(j+1<width) selectedBox(i , j+1);
          
        }
        if(reminingBoxs == mines && !finished) {
          finish(true);
        }
      }
    }
  }

  function finish(win) {
    finished=true;
    if(win){
      handleShow();
    }
    else{
      showMines();
    }
  }

  function showMines() {
    for (let i=0 ; i<height ; i++){
      for (let j=0 ; j<width ; j++){
        idBoxSelected = "#"+i+"-"+j;
        if(minesweeper[i][j] == "-1" && $(idBoxSelected).hasClass("hiddenBox") && !$(idBoxSelected).hasClass("flag")){
          $(idBoxSelected).removeClass("hiddenBox");
          $(idBoxSelected).addClass("bomb");
        }
        if(minesweeper[i][j] != "-1" && $(idBoxSelected).hasClass("flag")){
          $(idBoxSelected).removeClass("hiddenBox");
          $(idBoxSelected).addClass("mistake");
        }
      }
    }
  }

  function newGame() {
    reminingBoxs = height * width;
    finished=false;
    minesweeper = new Array(height);
    for (var i=0 ; i<height ; i++) {
      minesweeper[i] = new Array(width);
      for (var j=0 ; j<width ; j++) {
        minesweeper[i][j] = "";
      }
    }
  }

  function ponerMinas( minas , iSelected = -1 , jSelected = -1){
    var i=0;
    var minesOverflow = 0;
    while( i<minas && minesOverflow<150) {
      var mine_i = Math.floor(Math.random()*height);
      var mine_j = Math.floor(Math.random()*width);
      minesOverflow++;
      if ((iSelected!=mine_i || jSelected!=mine_j) && (minesweeper[mine_i][mine_j] != -1)) {
        minesweeper[mine_i][mine_j] = -1;
        i++;
        minesOverflow = 0;
      }
    }
  }

  function completeNumbers () {
    for (var i=0 ; i<height ; i++) {
      for (var j=0 ; j<width ; j++) {
        minesweeper[i][j] = minesAround(i,j);
      }
    }
  }

  function minesAround( i , j) {
    var totalMines = 0;
    var viewi, viewj;
    if (minesweeper[i][j]) return -1;
    viewi = i-1;
    viewj = j-1;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i+1;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    
    viewi = i-1;
    viewj = j;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i+1;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    
    viewi = i-1;
    viewj = j+1;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    viewi = i+1;
    if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
    
    if(totalMines==0) return "";
    return totalMines;
  }

  function optionsControl(e){
    var option = e.target.value;
    if(option=="easy"){
        heightRef.current.value=dificulty.easy.height;
        widthRef.current.value=dificulty.easy.width;
        minesRef.current.value=dificulty.easy.mines;
    }
    if(option=="medium"){
        heightRef.current.value=dificulty.medium.height;
        widthRef.current.value=dificulty.medium.width;
        minesRef.current.value=dificulty.medium.mines;
    }
    if(option=="hard"){
        heightRef.current.value=dificulty.hard.height;
        widthRef.current.value=dificulty.hard.width;
        minesRef.current.value=dificulty.hard.mines;
    }
    if(option=="custom"){
        heightRef.current.value="";
        widthRef.current.value="";
        minesRef.current.value="";
    }
  }
}
export default MinesweeperGame;