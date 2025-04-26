import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const getRoleBadge = (role) => {
    const roleClasses = {
      ADMIN: 'bg-red-100 text-red-800',
      STORE_OWNER: 'bg-blue-100 text-blue-800',
      USER: 'bg-green-100 text-green-800',
    };
    
    return (
      <span className={`${roleClasses[role]} text-xs px-2 py-1 rounded-full`}>
        {role}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            <Link to={`/admin/users/${user.id}`} className="hover:text-blue-600 transition">
              {user.name}
            </Link>
          </h3>
          {getRoleBadge(user.role)}
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{user.email}</p>
        <p className="text-gray-500 text-sm line-clamp-2">{user.address}</p>
        
        <div className="mt-3 flex justify-end">
          <Link 
            to={`/admin/users/${user.id}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;