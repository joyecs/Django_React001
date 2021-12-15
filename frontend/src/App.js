import logo from './logo.svg';
import './App.css';
import './joye.css';
import React, { Component } from 'react';
// import Modal from './components/Modal';
import JoyeModal from './components/JoyeModal';
import axios from "axios";

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_comp: false,
      viewCompleted: false,
      // todoList: todoItems,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then( res => {
      const persons = res.data;
      this.setState({ persons});
    })
  }
  toggle = () => {
    this.setState(
      { modal: !this.state.modal }
    );
  }
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}>Completed</span>
        <span className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}>Incompleted</span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}>
          {item.title}
        </span>
        <span>
          {/* {item.description} */}
        </span>
        <span>
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </span>
      </li>
    )

    )
  };
  EditItem = (item) => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    })
  };
  getTodoItems = () => {
    const renderItems = todoItems.filter( (items) => items.completed==this.state.list_comp);
    // alert(this.state.list_comp);
    console.log(renderItems);
    return renderItems.map((item) => (
      <li className="list-group-item d-flex justify-content-between align-items-center"
      key={item.id}> {item.title} 
        <span>
          <button className="btn btn-secondary" onClick={()=>this.EditItem(item)}>Edit</button>
          <button className="btn btn-danger">Delete</button>
        </span>
      </li>
    )
    );
    
  };
  showstatus = () =>{
    if(this.state.list_comp){
      return(
        <p>Shwoing Completed Tasks</p>
      )
    }else{
      return(
        <p>Showing Incompleted Tasks</p>
      )
    }
  }
  switchStatus = (status) => {
    if(status){
      this.setState({
        list_comp: true
      })
    }else{
      this.setState({
        list_comp: false
      })
    }
    
    // this.state.list_comp = !this.state.list_comp;
    // this.getTodoItems();
  };
  AddItem = () => {
    const item = {
      title: "",
      description: "",
      completed: false,
    };
    this.setState({
      modal:!this.state.modal,
      activeItem: item,
    })
  };
  toggle = () =>{
    this.setState({
      modal: !this.state.modal
    })
  };
  saveItem = (item) =>{
    this.toggle();
    alert("Save: "+JSON.stringify(item))
  };
  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        {/*
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary"
                  onClick={this.state.modal = !this.state.modal}>Add task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {
          this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null
        }*/}
        <div>
      
          <div className="row">
          <p className="offset-5 col-6">My test1</p>
            <div className="col-md-6 mx-auto">
              <div className="card p-3">
                <button className="btn btn-primary col-md-3" onClick={()=>this.AddItem()}>Add a task</button>
                <span>
                  {this.showstatus()}
                </span>
                <div className="nav nav-tabs">
                  <span className={ `completed nav-link ${this.state.list_comp ? "active": ""} `} 
                  onClick={() => this.switchStatus(true)}>Completed</span>
                  <span className={ `completed nav-link ${this.state.list_comp ? "": "active"} `}
                   onClick={() => this.switchStatus(false)}>Incompleted</span>
                </div>
                <div className="tab-items">
                  {this.getTodoItems()}
                </div>
              </div>
                {
                  this.state.modal ? (
                    <JoyeModal activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.saveItem}/>
                  ) : null
                }
            </div>
          </div>
        </div>
      </main>

    );
  }
}

export default App;
