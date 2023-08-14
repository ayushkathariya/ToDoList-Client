import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/appConfigSlice";

function CreateTask() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(createTask({ task }));
    } catch (error) {
      console.log(error);
    } finally {
      setTask("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-2 mt-4 border rounded focus:ring focus:ring-opacity-50 focus:outline-none focus:border-blue-500"
    >
      <input
        type="text"
        placeholder="Enter a task "
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border-none bg-inherit outline-none py-2 lg:py-3 px-3 rounded w-64 md:w-[30rem] lg:w-[30.5rem]"
      />
      <button onClick={handleSubmit}>
        <FiPlus
          title="Add task"
          className="text-3xl text-red-600 transition-colors duration-150 cursor-pointer hover:text-red-700"
        />
      </button>
    </form>
  );
}

export default CreateTask;
