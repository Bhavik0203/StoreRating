const Alert = ({ type = 'info', message, onClose }) => {
    const alertClasses = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };
  
    return (
      <div className={`${alertClasses[type]} p-4 rounded-md mb-4 flex justify-between items-center`}>
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>
    );
  };
  
  export default Alert;