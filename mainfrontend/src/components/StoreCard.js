import React from 'react';
import { Link } from 'react-router-dom';
import { HiStar, HiLocationMarker, HiMail } from 'react-icons/hi';

const StoreCard = ({ store }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{store.name}</h3>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <HiStar
            key={i}
            className={`h-5 w-5 ${
              i < Math.round(store.averageRating)
                ? 'text-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({store.totalRatings} {store.totalRatings === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600">
        <div className="flex items-center gap-2">
          <HiLocationMarker className="h-5 w-5 text-gray-500" />
          <span className="text-sm">{store.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiMail className="h-5 w-5 text-gray-500" />
          <span className="text-sm">{store.email}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <Link 
          to={`/store/${store.id}`}
          className="btn btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;