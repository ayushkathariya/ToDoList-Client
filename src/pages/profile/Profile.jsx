import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Profile() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  useEffect(() => {
    setName(myProfile?.name || "");
    setImage(myProfile?.avatar?.url || "");
  }, [myProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(updateMyProfile({ name, image }));
    } catch (error) {
      console.log(error);
    } finally {
      setImage("");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full  h-[90vh] justify-center items-center"
    >
      <div>
        <div className="border-[2px] p-3 flex flex-col items-center gap-1 rounded-xl">
          <div>
            <label htmlFor="image" className="avatar">
              <div className="rounded-full cursor-pointer w-28 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={image || avatar}
                  title="Click to change profile photo"
                />
              </div>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div>
            <div className="w-full p-8 rounded-lg sm:w-96">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50 focus:outline-none focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <button
                type="submit"
                title="Click to update profile"
                onClick={handleSubmit}
                className="w-full btn btn-primary"
              >
                Update
              </button>
              <button
                type="button"
                title="Click to logout"
                onClick={handleLogout}
                className="w-full btn btn-error mt-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Profile;
