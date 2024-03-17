import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { ActiveScreen } from "../../generic/ActiveScreen";
import TaskModalSelectField from "./TaskModalSelectField";
import TaskModalTextField from "./TaskModalTextField";

const TaskModalPopup = ({ task, onSave, onDelete, onClickOutside }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    onClickOutside();
    updateTask();
  });

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      onClickOutside();
      updateTask();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [content, setContent] = useState(task.content);
  const [responsible, setResponsible] = useState(task.responsible);
  const [difficulty, setDifficulty] = useState(task.difficulty);
  const [repeats, setRepeats] = useState(task.repeats);
  const [daysOfWeek, setDaysOfWeek] = useState(task.daysOfWeek);

  const updateTask = () => {
    task.content = content;
    task.responsible = responsible;
    task.difficulty = difficulty;
    task.repeats = repeats;
    task.daysOfWeek = daysOfWeek;
  };

  const toggleDay = (index) => {
    const newDaysOfWeek = [...daysOfWeek];
    newDaysOfWeek[index].selected = !newDaysOfWeek[index].selected;
    setDaysOfWeek(newDaysOfWeek);
  };

  const save = (task) => {
    updateTask();
    onSave(task);
    onClickOutside();
  };

  return (
    <div>
      <div className="task-modal" ref={modalRef}>
        <div
          className="center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
            className="text-color"
          >
            Edit Task
          </div>
          <div className="center">
            <div className="task-modal-cancel text-color" onClick={() => onClickOutside()}>
              Cancel
            </div>
            <button
              className="task-modal-save"
              onClick={() => {
                save(task);
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <div>
            <TaskModalTextField caption="Title" text={content} onTextChange={setContent} />
            <TaskModalSelectField
              label="Responsibility"
              values={["test user 1", "test user 2"]}
              defaultValue={task.responsible}
              onChange={setResponsible}
            />
            <TaskModalSelectField
              label="Difficulty"
              values={["Trivial", "Easy", "Medium", "Hard"]}
              defaultValue={task.difficulty}
              onChange={setDifficulty}
            />
            <TaskModalSelectField
              label="Repeats"
              values={["Daily"]}
              defaultValue={task.repeats}
              onChange={setRepeats}
            />
            {repeats === "Daily" && (
              <div style={{ display: "flex" }} className="task-modal-field-container">
                {daysOfWeek.map((element, index) => (
                  <div
                    className={
                      element.selected
                        ? "task-modal-field-daily-element task-modal-field-daily-element-active"
                        : "task-modal-field-daily-element text-color"
                    }
                    key={index}
                    onClick={() => toggleDay(index)}
                  >
                    {element.day}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="task-modal-delete-container">
            <button className="task-modal-delete" onClick={() => onDelete()}>
              Delete Task
            </button>
          </div>
        </div>
      </div>
      <ActiveScreen />
    </div>
  );
};

export default TaskModalPopup;
