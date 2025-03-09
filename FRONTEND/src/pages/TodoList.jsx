import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/todos');
      setTodos(response.data.todos);
      setError('');
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      
      <TodoForm onTodoAdded={fetchTodos} />
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No tasks yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              onUpdate={fetchTodos} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 