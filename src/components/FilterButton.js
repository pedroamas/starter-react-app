import React from "react";
import {Tab , Tabs } from 'react-bootstrap';

function FilterButton(props) {
  return (
    
    <Tabs defaultActiveKey="All" 
    variant="pills"
    className="separe-margin nav-pills nav-fill"
      onSelect = {(filterName) => props.setFilter(filterName)}
    >
      
      <Tab 
        eventKey="Filters:"
        title="Filters:"
        disabled
        >
      </Tab>
      <Tab 
        eventKey="All"
        title="All"
        >
      </Tab>
      <Tab 
        eventKey="Active"
        title="Active"
        >
      </Tab>
      <Tab 
        eventKey="Completed"
        title="Completed"
        >
      </Tab>
    </Tabs>
    
  );
}

export default FilterButton;