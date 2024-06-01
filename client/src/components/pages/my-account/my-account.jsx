import React from "react";
import { Avatar, Button, Input, IconButton } from "@material-tailwind/react";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const MyAccount = () => {
  
  const user = useSelector(state => state.user.user)

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-3/4 w-full">
      <div className="h-40 w-72 rounded-xl flex items-center justify-start gap-4">
        <div className="relative">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="xxl"
          />
          <div className="absolute bottom-0 right-2 bg-white flex items-center justify-center h-6 w-6 rounded-full cursor-pointer">
            <CameraIcon className="h-4 w-4 text-gray" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-2xl ">{user?.username || "Username"}</h3>
          <p className="text-white bg-cyan-600 rounded-full text-center mt-2">
            {user?.role || "Role"}
          </p>
        </div>
      </div>
      <div className="h-52 w-80 bg-blue-gray-900 rounded-xl flex flex-col gap-4 items-center justify-center p-4">
        <div className="w-72 flex items-center justify-between">
          <Input
            variant="static"
            className="border-b-[1px]"
            label="Fullname"
            placeholder={user?.fullname || "Full name"}
          />
          <IconButton variant="text" className="cursor-pointer">
            <PencilIcon className="h-4 w-4 text-white" />
          </IconButton>
        </div>

        <div className="w-72 flex items-center justify-between">
          <Input
            variant="static"
            className="border-b-[1px]"
            label="Password"
            placeholder="Password"
          />
          <IconButton variant="text" className="cursor-pointer">
            <PencilIcon className="h-4 w-4 text-white" />
          </IconButton>
        </div>
        <Button className="bg-cyan-600 w-full">Save</Button>
      </div>
    </div>
  );
};

export default MyAccount;
