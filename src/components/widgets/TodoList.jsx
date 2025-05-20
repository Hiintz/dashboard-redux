import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('dashboard-todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        localStorage.setItem('dashboard-todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="todo-widget">
            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Ajouter une tâche..."
                />
                <button type="submit">+</button>
            </form>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => removeTodo(todo.id)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;