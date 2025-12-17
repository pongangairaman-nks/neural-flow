import React from 'react';

export const NamePill = ({ name }) => {
  return (
    <div className="w-full">
      <div className="rounded-md bg-indigo-100 text-indigo-900 text-sm font-medium px-3 py-1 text-center">
        {name}
      </div>
    </div>
  );
};
