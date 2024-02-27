import { useState } from "react";
import "./App.css";

function TaskCard({
  task,
  index,
  handleSave,
  handleEdit,
  handleDelete,
  onDragStart,
}) {
  const [editvalue, setEditvalue] = useState(task.name);

  return (
    <div
      key={task.name}
      onDragStart={(e) => onDragStart(e, task.name)}
      draggable
      className="task-card"
      style={{ backgroundColor: task.bgcolor }}
    >
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={editvalue}
            onChange={(e) => setEditvalue(e.target.value)}
          />
          <button onClick={() => handleSave(index, editvalue)}>Save</button>
        </>
      ) : (
        <>
          <div>{task.name}</div>
          <div className="task-card">
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
function App() {
  const [tasks, setTasks] = useState([
    {
      name: "Self Cleansing",
      category: "wip",
      bgcolor: "lightblue",
      isEditing: false,
    },
    {
      name: "House Chores",
      category: "wip",
      bgcolor: "lightgrey",
      isEditing: false,
    },
    {
      name: "Coding Challenge",
      category: "complete",
      bgcolor: "lightgreen",
      isEditing: false,
    },
    {
      name: "Complete DOTM Entry",
      category: "complete",
      bgcolor: "#ee9090",
      isEditing: false,
    },
    {
      name: " Improve performance",
      category: "complete",
      bgcolor: "#eeed90",
      isEditing: false,
    },
  ]);

  function TodoForm() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState(
      tasks.length > 0 ? tasks[0].category : "wip"
    );
    const [bgcolor, setBgcolor] = useState("#ddd");

    const handleSubmit = (e) => {
      e.preventDefault();
      const newTask = {
        name,
        category,
        bgcolor,
        isEditing: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setName("");
      setCategory("wip");
    };

    return (
      <form onSubmit={handleSubmit} className="Form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="wip">Work in Progress</option>
          <option value="complete">Complete</option>
        </select>
        <label htmlFor="bgcolor">Background color:</label>
        <input
          type="color"
          id="bgcolor"
          value={bgcolor}
          style={{ backgroundColor: bgcolor, width: "100%", height: "40px" }}
          onChange={(e) => setBgcolor(e.target.value)}
        />
        <button type="submit">Add task</button>
      </form>
    );
  }

  const onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");
    let newTasks = [...tasks];
    let taskToUpdate = newTasks.find((task) => task.name === id);
    if (taskToUpdate) {
      taskToUpdate.category = cat;
    }

    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isEditing = true;
    setTasks(newTasks);
  };

  const handleSave = (index, newName) => {
    const newTasks = [...tasks];
    newTasks[index].name = newName;
    newTasks[index].isEditing = false;
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const getTask = () => {
    const tasksToRender = {
      wip: [],
      complete: [],
    };

    tasks.forEach((t, index) => {
      tasksToRender[t.category].push(
        <TaskCard
          key={t.name}
          task={t}
          index={index}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onDragStart={onDragStart}
        />
      );
    });

    return tasksToRender;
  };
  //   tasks.forEach((t, index) => {
  //     const [editvalue, setEditvalue] = useState(t.name);
  //     tasksToRender[t.category].push(
  //       <div
  //         key={t.name}
  //         onDragStart={(e) => onDragStart(e, t.name)}
  //         draggable
  //         className="task-card"
  //         style={{ backgroundColor: t.bgcolor }}
  //       >
  //         {t.isEditing ? (
  //           <>
  //             <input
  //               type="text"
  //               value={editvalue}
  //               onChange={(e) => setEditvalue(e.target.value)}
  //             />
  //             <button onClick={() => handleSave(index, editvalue)}>Save</button>
  //             {/* setTasks((prevTasks) => {
  //                   const newTasks = [...prevTasks];
  //                   newTasks[index].name = e.target.value;
  //                   return newTasks;
  //                 })
  //               } */}
  //             {/* /> */}
  //             <button onClick={() => handleSave(index, t.name)}>Save</button>
  //           </>
  //         ) : (
  //           <>
  //             <div>{t.name}</div>
  //             <div className="task-card">
  //               <button onClick={() => handleEdit(index)}>Edit</button>
  //               <button onClick={() => handleDelete(index)}>Delete</button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     );
  //   });

  //   return tasksToRender;
  // };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">TODO LIST</h2>
      <div className="drag-drop-board">
        <div
          className="wip"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, "wip");
          }}
        >
          <div className="task-header">In-PROGRESS</div>
          {getTask().wip}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "complete")}
        >
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
      <div className="main-form">
        <TodoForm tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
