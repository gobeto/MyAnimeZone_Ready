import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Delete
    </button>
  );
};

export default DeleteButton;