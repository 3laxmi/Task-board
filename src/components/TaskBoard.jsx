import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../hooks/useTasks.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import TaskCard from './TaskCard.jsx';
import TaskForm from './TaskForm.jsx';

const TaskBoard = () => {
  const { tasks, activityLog, createTask, updateTask, deleteTask, moveTask, resetBoard } = useTasks();
  const { logout, user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showActivityLog, setShowActivityLog] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priorityFilter === 'all' || task.priority === priorityFilter)
      )
      .sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, searchTerm, priorityFilter]);

  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      doing: filteredTasks.filter(task => task.status === 'doing'),
      done: filteredTasks.filter(task => task.status === 'done')
    };
  }, [filteredTasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    
    moveTask(draggableId, newStatus);
  };

  const handleCreateTask = (taskData) => {
    createTask(taskData);
    setShowForm(false);
  };

  const handleEditTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleResetBoard = () => {
    if (window.confirm('Are you sure you want to reset the board? This will delete all tasks and activity logs.')) {
      resetBoard();
    }
  };

  const renderColumn = (status, title, tasks) => (
    <div style={{ flex: 1, minWidth: '300px' }}>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px 8px 0 0',
        borderBottom: '2px solid #dee2e6'
      }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>
          {title} ({tasks.length})
        </h3>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? '#e3f2fd' : '#f8f9fa',
              minHeight: '400px',
              padding: '1rem',
              borderRadius: '0 0 8px 8px'
            }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ margin: 0 }}>Task Board</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span>Welcome, {user?.email}</span>
          <button
            onClick={() => setShowActivityLog(!showActivityLog)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Activity Log
          </button>
          <button
            onClick={handleResetBoard}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset Board
          </button>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{
        padding: '1rem 2rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + New Task
        </button>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {showActivityLog && (
        <div style={{
          padding: '1rem 2rem',
          backgroundColor: '#fff3cd',
          borderBottom: '1px solid #dee2e6'
        }}>
          <h4>Recent Activity</h4>
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {activityLog.slice(0, 10).map(activity => (
              <div key={activity.id} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <strong>{activity.taskTitle}</strong> was {activity.action}
                {activity.details && ` (${activity.details})`}
                <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
            {activityLog.length === 0 && (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No activity yet</p>
            )}
          </div>
        </div>
      )}

  
      <div style={{ padding: '2rem' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            overflowX: 'auto',
            minHeight: '500px'
          }}>
            {renderColumn('todo', 'To Do', tasksByStatus.todo)}
            {renderColumn('doing', 'Doing', tasksByStatus.doing)}
            {renderColumn('done', 'Done', tasksByStatus.done)}
          </div>
        </DragDropContext>
      </div>

   
      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskBoard;