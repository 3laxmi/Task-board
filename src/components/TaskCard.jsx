import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    low: '#2f349b78',
    medium: '#357bb0',
    high: '#743239'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '0.5rem',
      cursor: 'grab'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem' }}>{task.title}</h4>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              fontSize: '0.8rem'
            }}
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              fontSize: '0.8rem'
            }}
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '0.9rem', 
          color: '#666',
          lineHeight: '1.4'
        }}>
          {task.description}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{
          backgroundColor: priorityColors[task.priority],
          color: 'white',
          padding: '0.2rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.8rem',
          textTransform: 'capitalize'
        }}>
          {task.priority}
        </span>
        
        {task.dueDate && (
          <span style={{ fontSize: '0.8rem', color: '#666' }}>
            Due to {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {task.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#e9ecef',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: '#495057'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;