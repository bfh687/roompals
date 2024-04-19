import React, { useState, useEffect } from "react";
import { TaskListType, TaskListTitle, TaskListBody } from "../../res/resx";

import CalendarIcon from "../icons/CalendarIcon";
import ShoppingIcon from "../icons/ShoppingIcon";
import RepeatIcon from "../icons/RepeatIcon";

const TaskZeroState = ({ type }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, setIcon] = useState("");

  const initTaskZeroState = () => {
    switch (type) {
      case TaskListType.Daily:
        setTitle(TaskListTitle.DailyTitle);
        setBody(TaskListBody.DailyBody);
        setIcon(<CalendarIcon width={24} height={24} />);
        break;
      case TaskListType.Habits:
        setTitle(TaskListTitle.HabitsTitle);
        setBody(TaskListBody.HabitsBody);
        setIcon(<RepeatIcon width={24} height={24} />);
        break;
      case TaskListType.Shopping:
        setTitle(TaskListTitle.ShoppingTitle);
        setBody(TaskListBody.ShoppingBody);
        setIcon(<ShoppingIcon width={24} height={24} />);
        break;
    }
  };

  useEffect(() => {
    initTaskZeroState();
  }, []);

  return (
    <div
      className="text-color"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {icon}
      <div style={{ fontSize: "small", fontWeight: "bold", marginTop: "6px" }}>{title}</div>
      <div style={{ fontSize: "smaller", textAlign: "center", marginTop: "4px" }}>{body} </div>
    </div>
  );
};

export default TaskZeroState;
