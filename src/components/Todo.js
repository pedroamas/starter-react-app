import React , { useEffect, useRef, useState } from "react"
import {ListGroup , Form ,ButtonGroup ,Button , Alert} from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
} 

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);
  const [alerta , setAlerta] = useState(false);
  const editingTemplate = (
    <ListGroup.Item>
      <Form onSubmit={handleSubmit} >
        <Form.Group >
          <Form.Control 
            id={props.id}
            type="text"
            value={newName}
            autoComplete="off"
            onChange={handleChange}
            ref={editFieldRef}
            />
            <Alert  variant="danger" show={alerta}>
              Task can't be empty
            </Alert>
        </Form.Group>
        <ButtonGroup className="btn-group-sm">
          <Button 
            variant="outline-dark"
            onClick={() => setEditing(false)} >
              Cancel
          </Button>
          <Button 
            variant="success"
            type="submit" >
            Save
          </Button>
        </ButtonGroup>
      </Form>
    </ListGroup.Item>
  );
  const viewTemplate = (
        <ListGroup.Item>
          <Form.Group className="float-left">
            <Form.Check className = "big-checkbox">
              <Form.Check.Input type="checkbox" 
              id={props.id}
              onChange={() => props.toggleTaskCompleted(props.id , props.completed)}
              defaultChecked={props.completed}  />
              <Form.Check.Label className="task-label align-middle">{props.name}</Form.Check.Label>
              </Form.Check>
        </Form.Group>
        <ButtonGroup className="float-right btn-group-sm">
          <Button 
            variant="outline-secondary"
            className="btn" 
            onClick={() => {setEditing(true);setNewName(props.name)}}
            ref={editButtonRef}
          >
            <EditIcon/>
            
          </Button>
          <Button 
            variant="outline-danger"
            className="btn" 
            onClick={() => props.deleteTask(props.id)}
          >
            <DeleteIcon/>
          </Button>
        </ButtonGroup>
    </ListGroup.Item>
  );
  
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  
  return <>{isEditing ? editingTemplate : viewTemplate}</>;

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(newName===""){
      
      setAlerta(true);
      setTimeout(() => setAlerta(false), 5000);
    }
    else {
      props.editTask(props.id, newName);
      setEditing(false);
    }
  }
}