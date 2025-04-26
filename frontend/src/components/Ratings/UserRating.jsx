import RatingStars from '../UI/RatingStars';
import { Link } from 'react-router-dom';

const UserRating = ({ rating, onDelete }) => {
  if (!rating) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/stores/${rating.Store.id}`} className="font-medium text-blue-600 hover:underline">
            {rating.Store.name}
          </Link>
          <div className="flex items-center mt-1">
            <RatingStars rating={rating.rating} />
            <span className="ml-2 text-sm text-gray-500">
              {new Date(rating.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(rating.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      {rating.comment && (
        <p className="mt-2 text-gray-600">{rating.comment}</p>
      )}
    </div>
  );
};

export default UserRating;