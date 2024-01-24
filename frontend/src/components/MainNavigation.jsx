import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

function MainNavigation() {
  return (
    <div>
      <nav className="flex items-center">
        <ul className="mx-8">
          <li className="relative group">
            <NavLink to="/" end>
              <span className="flex items-center py-4 pl-6 text-black transition duration-300 ease-in-out opacity-75 group-hover:opacity-100">
                <HomeIcon className="w-12 h-12 p-2 rounded-l-lg group-hover:bg-white" />
              </span>
            </NavLink>
              <div className="absolute top-0 hidden p-2 text-black bg-white rounded-md group-hover:block left-full">
                Home
              </div>
          </li>
          <li>
            <NavLink to="/write">Write</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/applicantList">신청자</NavLink>
          </li>
          <li>
            <NavLink to="/planning">Planning</NavLink>
          </li>
          <li>
            <NavLink to="/chatRoomTest">ChatroomTest</NavLink>
          </li>
          <li>
            <NavLink to="/practice">Practice</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
