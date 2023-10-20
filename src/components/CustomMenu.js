import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomMenu = ({ size, row }) => {
  const menuRef = useRef();
  const [hidden, setHidden] = useState(true);
  //   console.log(row);

  const handleMenu = () => {
    setHidden(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHidden(true);
      }
    };

    if (hidden) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div ref={menuRef} className="relative">
        <div onClick={() => handleMenu()}>
          <BsThreeDotsVertical className="text-xl" />
        </div>
        <div
          className={`absolute  bg-black p-3 rounded right-0 w-40 grid gap-2 z-[30] top-6 ${
            hidden ? "hidden" : "block"
          } `}
        >
          <button onClick={() => alert(("delete", row.id))} className="btn">
            Delete
          </button>
          <button onClick={() => alert(`edit, ${row.id}`)} className="btn">
            Edit
          </button>
          <button onClick={() => alert(`edit, ${row.id}`)} className="btn">
            Detail
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomMenu;
