import React from "react";
import { IconSquare, IconCircle, IconPencil } from "@tabler/icons-react";

const Toolbar = () => {
  return (
    <div className="flex items-center gap-4 bg-neutral-900 border border-gray-800 px-4 h-16 rounded-2xl shadow-md">
      {/* Square Tool */}
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <IconSquare className="w-6 h-6 text-lime-900" />
      </button>

      {/* Circle Tool */}
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <IconCircle className="w-6 h-6 text-lime-900" />
      </button>

      {/* Pencil Tool */}
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <IconPencil className="w-6 h-6 text-lime-900" />
      </button>
    </div>
  );
};

export default Toolbar;
