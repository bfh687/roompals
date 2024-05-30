import React from "react";

import ProfileHeader from "../components/PartyHeader/PartyHeader";
import TaskList from "../components/tasklist/TaskList";
import { TaskListType } from "../res/resx";

import { useLocation } from "react-router-dom";

const TasksPage = () => {
  const location = useLocation();
  const partyId = location.state;

  return (
    <>
      <ProfileHeader partyId={partyId} />
      <div style={{ display: "flex", padding: "16px", justifyContent: "center" }}>
        <TaskList partyId={partyId} type={TaskListType.Daily} />
        <TaskList partyId={partyId} type={TaskListType.Habits} />
        <TaskList partyId={partyId} type={TaskListType.Shopping} />
      </div>
    </>
  );
};

export default TasksPage;
