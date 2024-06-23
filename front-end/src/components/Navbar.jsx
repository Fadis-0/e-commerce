import React, { useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai';
import { FiMoon, FiSun } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { MdNotificationsNone } from 'react-icons/md';

import { Notifications } from '.'



import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <div
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative opacity-0 text-xl rounded-full p-3"
    >
      <span
        style={{ background: dotColor }}
        className="absolute opacity-0 inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </div>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick} = useStateContext();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-1 relative">
      <div></div>
      <div className="flex">
        <NavButton title="Notification" dotColor="lightgreen"  color="#333" icon={<MdNotificationsNone/>} />
        <NavButton title="Settings" customFunc={() => {}} color="#333" icon={<AiOutlineSetting />} />
        <NavButton title="Profile" customFunc={() => {}} color="#333" icon={<BsPerson />} />
        


        
      </div>
    </div>
  );
};

export default Navbar;