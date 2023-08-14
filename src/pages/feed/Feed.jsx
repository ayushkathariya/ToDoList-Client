import React from "react";
import CreateTask from "../../components/create-task/CreateTask";
import DisplayTask from "../../components/display-task/DisplayTask";
import { useSelector } from "react-redux";

function Feed() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  return (
    <div className="flex flex-col items-center">
      <CreateTask />
      <span className="mt-7">
        {myProfile?.tasks?.map((item) => (
          <DisplayTask task={item} key={item._id} />
        ))}
      </span>
    </div>
  );
}

export default Feed;
