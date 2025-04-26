import { Link } from 'react-router-dom';
import RatingStars from '../UI/RatingStars';

const StoreCard = ({ store }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          <Link to={`/stores/${store.id}`} className="hover:text-blue-600 transition">
            {store.name}
          </Link>
        </h3>
        
        <div className="flex items-center mb-2">
          <RatingStars rating={store.averageRating} />
          <span className="ml-2 text-sm text-gray-600">
            ({store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'})
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 line-clamp-2">{store.address}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{store.email}</span>
          <Link 
            to={`/stores/${store.id}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;