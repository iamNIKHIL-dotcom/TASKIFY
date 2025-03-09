import { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleComplete = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/todos/${todo._id}`, {
        completed: !todo.completed
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        disabled={isLoading}
        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <span 
        className={`ml-3 flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
      >
        {todo.title}
      </span>
      {isLoading && (
        <span className="text-sm text-gray-500">Updating...</span>
      )}
    </div>
  );
};

export default TodoItem; 