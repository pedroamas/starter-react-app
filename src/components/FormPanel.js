import React, { useState } from "react";
import {Alert ,Form , Button , Card , Accordion , Row , Col} from 'react-bootstrap';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function FormPanel(props) {
  const [name, setName] = useState("");
  const [alerta , setAlerta] = useState(false);

  function handleChange(e) {
    setName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if(name === ""){
      setAlerta(true);
      setTimeout(() => setAlerta(false), 5000);
    }else{
      props.addTask(name);
      setName("");
      setAlerta(false);
    }
    
    
  }

  return (
    <Accordion defaultActiveKey="0">
    
      <Accordion.Item eventKey="0">
      <Accordion.Header>
        What needs to be done? <ArrowDropDownIcon />
      
      </Accordion.Header>
      <Accordion.Body>

        <Form onSubmit={handleSubmit}>
        <Row >
          <Col>
            <Form.Group  >
                <Form.Control 
                  type="text" 
                  placeholder="Enter task" 
                  autoComplete="off"
                  value={name}
                  onChange={handleChange}
                  />
                  <Alert  variant="danger" show={alerta}>
                    Task can't be empty
                  </Alert>
            </Form.Group>
            </Col>
            <Col md={"auto"}>
            <Button variant="success" type="submit" >
                Add
            </Button>
          
          </Col>
          </Row>
        </Form>

      </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    
    
  );
}

export default FormPanel;
