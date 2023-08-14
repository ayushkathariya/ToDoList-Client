import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/slices/appConfigSlice";
import { TiTick } from "react-icons/ti";

function DisplayTask({ task }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  const saveTask = async (e) => {
    try {
      e.preventDefault();
      dispatch(updateTask({ newTask, taskId: task?._id }));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return isEdit ? (
    <form
      onSubmit={saveTask}
      className="flex items-center justify-between gap-10 p-2 mt-3 border rounded md:gap-14"
    >
      <input
        type="text"
        placeholder="Enter new task "
        className="w-[200px] md:w-[25rem] lg:w-[26rem] outline-none bg-transparent"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">
        <TiTick
          title="Save task"
          className="text-2xl text-green-500 hover:text-green-600"
        />
      </button>
    </form>
  ) : (
    <div className="flex items-center justify-between gap-10 p-2 mt-3 border rounded md:gap-14">
      <p className="w-[200px] md:w-[25rem] lg:w-[26rem]">{task?.task}</p>
      <span className="flex items-center gap-2">
        <div>
          <AiOutlineEdit
            title="Edit task"
            className="text-2xl text-yellow-500 cursor-pointer hover:text-yellow-600"
            onClick={() => setIsEdit(true)}
          />
        </div>
        <div>
          <AiOutlineDelete
            title="Delete task"
            className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
            onClick={() => dispatch(deleteTask({ taskId: task?._id }))}
          />
        </div>
      </span>
    </div>
  );
}

export default DisplayTask;
