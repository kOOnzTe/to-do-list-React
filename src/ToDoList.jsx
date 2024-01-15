import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat Iskender", "Sleep 7 Hours", "Play NBA 2K", "Peeing / Pooing 😊"]);
  const [newTask, setNewTask] = useState("");
  const [checkedItems, setCheckedItems] = useState(Array(tasks.length).fill(false));

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setCheckedItems((prev) => [...prev, false]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems.splice(index, 1);
    setTasks(updatedTasks);
    setCheckedItems(updatedCheckedItems);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      const updatedCheckedItems = [...checkedItems];
      [updatedCheckedItems[index], updatedCheckedItems[index - 1]] = [updatedCheckedItems[index - 1], updatedCheckedItems[index]];
      setTasks(updatedTasks);
      setCheckedItems(updatedCheckedItems);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      const updatedCheckedItems = [...checkedItems];
      [updatedCheckedItems[index], updatedCheckedItems[index + 1]] = [updatedCheckedItems[index + 1], updatedCheckedItems[index]];
      setTasks(updatedTasks);
      setCheckedItems(updatedCheckedItems);
    }
  }

  function handleCheckboxChange(index) {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }

  return (
    <>
      <div className="to-do-list">
        <h1>Daily To-Do-List</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a new task here..."
            value={newTask}
            onChange={handleInputChange}
          />
        </div>
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text" style={{textDecoration: checkedItems[index] ? "line-through" : "none",}}>
              {task}
            </span>

            <label htmlFor={`checkb-${index}`}>
              <div>
                <input
                  type="checkbox"
                  name={`checkb-${index}`}
                  id={`checkb-${index}`}
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
            </label>

            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>

            <button className="move-button" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>

            <button className="move-button" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
          </li>
        ))}
      </ol>
      <h3>by Alper Celik</h3>
    </>
  );
}

export default ToDoList
