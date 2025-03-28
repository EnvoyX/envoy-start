import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1 ">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping bg-teal-500 rounded-full opacity-75"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-teal-500"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
