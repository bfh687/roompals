import React from "react";

import ProfileHeader from "../components/ProfileHeader";
import TaskList from "../components/tasklist/TaskList";
import { TaskListType } from "../res/resx";

const TasksPage = () => {
  return (
    <>
      <div className="task"></div>
      <ProfileHeader />
      <div style={{ display: "flex", padding: "16px", justifyContent: "center" }}>
        <TaskList type={TaskListType.Daily} />
        <TaskList type={TaskListType.Habits} />
        <TaskList type={TaskListType.Shopping} />
      </div>
    </>
  );
};

export default TasksPage;
