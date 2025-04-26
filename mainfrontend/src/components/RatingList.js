import React from 'react';
import { HiStar, HiTrash } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const RatingList = ({ ratings = [], onDeleteRating }) => {
  const { currentUser } = useAuth();

  if (ratings.length === 0) {
    return <p className="text-gray-500 text-center py-4">No ratings yet. Be the first to rate this store!</p>;
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="card">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <HiStar
                      key={index}
                      className={`h-5 w-5 ${
                        index < rating.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {rating.User?.name || 'Anonymous User'}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
              </div>
            </div>
            
            {currentUser && (currentUser.id === rating.userId || currentUser.role === 'ADMIN') && (
              <button 
                onClick={() => onDeleteRating(rating.id)}
                className="text-error hover:text-error/80"
                title="Delete rating"
              >
                <HiTrash className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {rating.comment && (
            <div className="mt-3 text-gray-700">{rating.comment}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingList;