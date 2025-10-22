import React from "react";

const Navbar = () => {
  const user = {
    name: "Anas",
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  };

  return (
    <nav className="navbar bg-base-300 shadow-sm fixed top-0 z-50 px-4">
      {/* Left Section */}
      <div className="flex-1">
        <a
          href="/"
          className="btn btn-ghost normal-case text-2xl font-semibold text-primary"
        >
          DevKonect
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a className="text-error hover:bg-error/10">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
