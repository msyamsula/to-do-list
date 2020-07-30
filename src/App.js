import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import dompurify from "dompurify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressId: 0,
      todos: [],
      newItem: "",
      inputField: undefined,
    };
  }

  componentDidMount = async () => {
    let inputField = await document.querySelector(".todo-input");
    await setTimeout(inputField.focus(), 750);
    await this.setState({ inputField: inputField });
  };

  componentDidUpdate = () => {
    let todoList = document.querySelector(".todo-list");
    todoList.scrollTop = todoList.scrollHeight;
  };

  handleNewItem = (event) => {
    this.setState({ newItem: event.target.value });
  };

  validateTodo = () => {
    if (this.state.newItem.length === 0) {
      alert("todo is empty");
      return 0;
    }
    if (this.state.newItem.length < 3) {
      alert("for better contex, please use more than 3 letters");
      return 0;
    }
    if (typeof this.state.newItem !== "string") return 0;
    let newItem = this.state.newItem.trim();
    let newItemClean = dompurify.sanitize(newItem);
    if (newItemClean.length > 30) {
      alert("todo can't exceed 30 characters");
      return 0;
    }
    this.setState({ newItem: newItemClean });
    return 1;
  };

  handleSubmitItem = async () => {
    if (this.validateTodo()) {
      let mytodos = this.state.todos;
      let nextId = this.state.progressId + 1;
      let newItem = {
        id: nextId,
        name: this.state.newItem,
        crossed: 0,
      };
      mytodos.push(newItem);
      await this.setState({ todos: mytodos });
      await this.setState({ progressId: nextId });
    }
    await this.setState({ newItem: "" });
    let inputField = document.querySelector(".todo-input");
    inputField.value = "";
    this.setState({ inputField: inputField });
    this.state.inputField.focus();
  };

  handleEnter = (event) => {
    if (event.key === "Enter") {
      this.handleSubmitItem();
      let inputField = document.querySelector(".todo-input");
      inputField.value = "";
      this.setState({ inputField: inputField });
      this.state.inputField.focus();
    }
  };

  handleDeleteTodo = (event) => {
    let curId = parseInt(event.target.id);
    let curTodos = this.state.todos;
    let newTodos = curTodos.filter((todo) => {
      console.log(todo.id);
      return todo.id !== curId;
    });

    this.setState({ todos: newTodos });
  };

  handleCrossTodo = (event) => {
    let buttonId = event.target.id;
    let id = "";
    for (let i = 5; i < buttonId.length; i++) {
      id += buttonId[i];
    }
    id = parseInt(id);
    let todos = this.state.todos;
    let crossedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.crossed = 1;
      }
      return todo;
    });
    this.setState({ todos: crossedTodos });
  };

  handleClear = () => {
    this.setState({ todos: [], progressId: 0, newItem: "" });
  };

  handleRemoveCrossed = () => {
    let todos = this.state.todos;
    let cleanTodos = todos.filter((todo) => {
      return todo.crossed === 0;
    });
    this.setState({ todos: cleanTodos });
  };

  render() {
    let crossed = <div></div>;
    let uncrossed = (id) => {
      return (
        <button
          className="item-cross-button btn-sm btn btn-success"
          onClick={this.handleCrossTodo}
          id={`cross${id}`}
        >
          cross
        </button>
      );
    };
    return (
      <div className="container">
        <h1 className="text-center">FINALYYYYY!!!!! YUHU</h1>
        <h1 className="text-center">My To-do List</h1>
        <h6 className="text-center">deploy at AWS and GCP</h6>
        <h6 className="text-center">powered by: travis-CI</h6>
        <input
          type="text"
          name="todo"
          className="mx-auto my-2 form-control todo-input"
          autoComplete="off"
          onChange={this.handleNewItem}
          onKeyDown={this.handleEnter}
        ></input>
        <div className="control-panel-btn">
          <button
            className="add-btn btn-info mx-auto my-1 form-control"
            onClick={this.handleSubmitItem}
          >
            add todo
          </button>
          <button
            className="remove-crossed-btn btn-warning mx-auto my-2 form-control"
            onClick={this.handleRemoveCrossed}
          >
            remove crossed item
          </button>
          <button
            className="clear-btn btn-danger mx-auto my-2 form-control"
            onClick={this.handleClear}
          >
            clear my todo list
          </button>
        </div>
        <ul className="list-group todo-list">
          {this.state.todos.map((item) => {
            return (
              <li key={item.id} className="list-group-item todo-item">
                <div id={`text${item.id}`} className="item-text mx-2">
                  {item.crossed === 0 ? (
                    item.name
                  ) : (
                    <s className="crossed">{item.name}</s>
                  )}
                </div>
                {item.crossed === 1 ? crossed : uncrossed(item.id)}
                <button
                  className="item-delete-button btn-sm btn btn-secondary"
                  id={`${item.id}`}
                  onClick={this.handleDeleteTodo}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
