import React, { useState, useEffect } from "react";

import TaskItem from "./item/TaskItem";
import TaskZeroState from "./TaskZeroState";

import { TaskListType, TaskListTitle } from "../../res/resx";

const TaskList = ({ type }) => {
  const [task, setTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(-1);

  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [title, setTitle] = useState("");

  const filterOptions = ["All", "My Tasks", "Done"];

  const me = "test user 1";

  useEffect(() => {
    setTitle(getTaskListTitle());

    const partyId = 1;

    const loadTasks = async () => {
      await fetch(`http://localhost:3000/api/party/${partyId}/tasks/${type}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setTasks(res))
        .catch((err) => console.log(err));
    };

    loadTasks();
  }, []);

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

  const getTaskListTitle = () => {
    switch (type) {
      case TaskListType.Daily:
        return TaskListTitle.DailyTitle;
      case TaskListType.Habits:
        return TaskListTitle.HabitsTitle;
      case TaskListType.Shopping:
        return TaskListTitle.ShoppingTitle;
    }
  };

  const isSelectedFilter = (filter) => {
    return taskFilter === filter;
  };

  const addTask = async (task) => {
    // optimistically update tasks/ui
    const tempId = Date.now();
    const partyId = 1;

    const newTasks = [...tasks];
    const newTask = {
      id: tempId,
      content: task,
      checked: false,
    };

    newTasks.unshift(newTask);
    setTasks(newTasks);

    // handle server response
    await fetch(`http://localhost:3000/api/party/${partyId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyId: partyId, content: task, type: type }),
    })
      .then((res) => res.json())
      .then((res) => {
        const index = newTasks.findIndex((task) => task.id == tempId);
        if (index !== -1) {
          const newerTasks = [...newTasks];
          newerTasks[index].id = res.id;
          setTasks(newerTasks);
        }
      })
      .catch((err) => {
        console.log("here");
        const newerTasks = newTasks.filter((task) => task.id !== tempId);
        setTasks(newerTasks);
      });
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);

    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      console.log("here");
    });
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
        maxWidth: "25%",
        width: "25%",
        minHeight: "540px",
        padding: "0px 24px",
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
          {filterOptions.map((filter, index) => (
            <div
              style={{
                padding: "0px 4px 3px 4px",
                cursor: "pointer",
                borderBottom: isSelectedFilter(index) ? "1px solid #cccac6" : "",
              }}
              className="text-color"
              onClick={() => setTaskFilter(index)}
              key={index}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#141616",
          width: "100%",
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
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskItem
                task={task}
                selectedTask={selectedTask}
                index={index}
                key={task.id}
                onCheckboxChange={() => onCheckboxChange(task.id)}
                onOptionMenu={() => setSelectedTask(index)}
                onClick={() => setSelectedTask(index)}
                onDelete={() => removeTask(task.id)}
              />
            ))
          ) : (
            <TaskZeroState type={type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
