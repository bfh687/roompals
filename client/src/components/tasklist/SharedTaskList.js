import React, { useState, useEffect, useRef } from "react";

import TaskItem from "./item/TaskItem";

const SharedTaskList = ({ title }) => {
  const [task, setTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(-1);

  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const me = "test user 1";

  useEffect(() => {
    // All Tasks
    if (taskFilter === 0) {
      setFilteredTasks(tasks.filter((task) => !task.checked));
    }

    // My Tasks
    else if (taskFilter === 1) {
      setFilteredTasks(tasks.filter((task) => task.responsible === me && !task.checked));
    }

    // Done Tasks
    else if (taskFilter === 2) {
      setFilteredTasks(tasks.filter((task) => task.checked));
    }
  }, [tasks, taskFilter]);

  const isSelectedFilter = (filter) => {
    return taskFilter == filter;
  };

  const addTask = (task) => {
    const newTasks = [...tasks];
    const id = tasks.length === 0 ? 1 : tasks[0].id + 1;
    newTasks.unshift({
      id: id,
      content: task,
      checked: false,
      responsible: me,
      repeats: "Daily",
      daysOfWeek: [
        { day: "Mo", selected: false },
        { day: "Tu", selected: false },
        { day: "We", selected: false },
        { day: "Th", selected: false },
        { day: "Fr", selected: false },
        { day: "Sa", selected: false },
        { day: "Su", selected: false },
      ],
    });
    setTasks(newTasks);
  };

  const removeTask = (id) => {
    let prevTasks = [...tasks];
    prevTasks = prevTasks.filter((task) => task.id != id);
    setTasks(prevTasks);
  };

  const onCheckboxChange = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
    });
  };

  return (
    <div
      style={{
        width: "40%",
        maxWidth: "380px",
        minHeight: "540px",
        margin: "auto",
        marginTop: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "15px",
        }}
      >
        <div style={{ paddingRight: "4px", fontWeight: "bold", color: "#cccac6" }}>{title}</div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "0px 4px 3px 4px",
              cursor: "pointer",
              borderBottom: isSelectedFilter(0) ? "1px solid #cccac6" : "",
            }}
            className="text-color"
            onClick={() => setTaskFilter(0)}
          >
            All
          </div>
          <div
            style={{
              padding: "0px 4px 3px 4px",
              cursor: "pointer",
              borderBottom: isSelectedFilter(1) ? "1px solid #cccac6" : "",
              whiteSpace: "nowrap",
            }}
            className="text-color"
            onClick={() => setTaskFilter(1)}
          >
            My Tasks
          </div>
          <div
            style={{
              padding: "0px 4px 3px 4px",
              marginRight: "5px",
              cursor: "pointer",
              borderBottom: isSelectedFilter(2) ? "1px solid #cccac6" : "",
            }}
            className="text-color"
            onClick={() => setTaskFilter(2)}
          >
            Done
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#141616",
          maxWidth: "380px",
          minHeight: "540px",
        }}
      >
        <div style={{ border: "1px black" }}>
          <textarea
            className="task-textarea"
            placeholder="Enter a task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!task.trim()) return;

                addTask(task);
                setTask("");
              }
            }}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            value={task}
          />
        </div>
        <div>
          {filteredTasks.map((task, index) => (
            <TaskItem
              task={task}
              selectedTask={selectedTask}
              index={index}
              onCheckboxChange={() => onCheckboxChange(task.id)}
              onOptionMenu={() => setSelectedTask(index)}
              onClick={() => setSelectedTask(index)}
              onDelete={() => removeTask(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedTaskList;
