import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";

export default class TodoList extends Component {
  state = {
    todo: "",
    todoItems: [],
    counter: 0
  };

  handleInput = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.todo !== "") {
      let arr = this.state.todoItems;
      const todo = {
        item: this.state.todo,
        complete: false
      };
      arr.push(todo);
      let rem = 0;
      arr.forEach(index => {
        if (!index.complete) {
          return rem++;
        }
      });

      this.setState({
        todoItems: arr,
        todo: "",
        counter: rem
      });
    }
  };

  completeTask = index => {
    let results = this.state.todoItems;
    results.forEach((num, ind) => {
      if (index === ind) {
        num.complete = !num.complete;
      }
    });

    let rem = 0;
    results.forEach(index => {
      if (!index.complete) {
        return rem++;
      }
    });

    this.setState({
      todoItems: results,
      counter: rem
    });
  };

  render() {
    return (
      <Layout>
        <>
          <div>
            <h2>Todo List</h2>
          </div>
          <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>

          <div>
            <form>
              <input
                name="todo"
                value={this.state.todo}
                onChange={this.handleInput}
              />
              <button onClick={this.handleSubmit}>add</button>
            </form>
          </div>
          <div>
            {this.state.todoItems.length > 0 ? (
              <p>
                {this.state.counter} remaining out of{" "}
                {this.state.todoItems.length} tasks
              </p>
            ) : (
              <p>No todo items</p>
            )}
          </div>
          <div id="todo-list">
            <ul>
              {this.state.todoItems.map((todo, index) => {
                return (
                  <li
                    key={index}
                    className={todo.complete ? "is-done" : ""}
                    onClick={() => this.completeTask(index)}
                  >
                    {todo.item}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      </Layout>
    );
  }
}
