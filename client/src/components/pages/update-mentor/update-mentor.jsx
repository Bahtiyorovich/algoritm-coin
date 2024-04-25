import React from 'react'
import { Card, Typography, Input,  IconButton,
  Tooltip, } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTheme } from '../../../helpers/context';
 
const TABLE_HEAD = ["UserName", "Phone Number", "Date", "Edits", "Deleted"];
 
const UpdateMentor = () => {
  const { handleSearch} = useTheme();
  return (
    <div className='grid grid-cols-6 grid-rows-10 h-screen gap-4'>
      <div className='col-span-6 row-span-1'>
      <div className="w-[350px]">
        <Input 
          color='white' label="Search mentor..." 
          icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-100"/>} 
          className='text-gray-100 out' 
          onChange={handleSearch}
          />
      </div>
      </div>
      <div className='col-span-3 row-span-9'><MentorsTable/></div>
      <div className='col-span-3 row-span-9 border-[1px] border-gray-300'></div>
    </div>
  )
}

export default UpdateMentor
 
function MentorsTable() {
  const {filteredData} = useTheme();

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ username, phoneNumber, createdAt }, index) => (
            <tr key={username} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {username}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {phoneNumber}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {createdAt}
                </Typography>
              </td>
              <td className="p-4">
              <Tooltip content="Edit User">
                <IconButton variant="text">
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              </td>
              <td className="p-4">
              <Tooltip content="Edit User">
                <IconButton variant="text">
                  <TrashIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}