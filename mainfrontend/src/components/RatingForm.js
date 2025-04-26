import React, { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi';
import { ratingService } from '../services/ratingService';
import toast from 'react-hot-toast';

const RatingForm = ({ storeId, onRatingSubmit, existingRating = null }) => {
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(existingRating?.comment || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setComment(existingRating.comment || '');
    }
  }, [existingRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);
    
    try {
      const ratingData = {
        storeId,
        rating,
        comment
      };
      
      let response;
      if (existingRating) {
        // For now, let's resubmit as a new rating since update isn't directly available in the API
        await ratingService.deleteRating(existingRating.id);
        response = await ratingService.submitRating(ratingData);
      } else {
        response = await ratingService.submitRating(ratingData);
      }
      
      toast.success('Rating submitted successfully');
      
      if (onRatingSubmit) {
        onRatingSubmit(response.data);
      }
      
      if (!existingRating) {
        // Reset form if it's a new rating
        setRating(0);
        setComment('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-semibold mb-4">
        {existingRating ? 'Update Your Rating' : 'Leave a Rating'}
      </h3>
      
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            
            return (
              <button
                type="button"
                key={ratingValue}
                className="bg-transparent border-none outline-none cursor-pointer"
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                <HiStar 
                  className={`h-8 w-8 ${
                    (hover || rating) >= ratingValue 
                      ? 'text-yellow-500' 
                      : 'text-gray-300'
                  }`} 
                />
              </button>
            );
          })}
        </div>
        <span className="ml-4 text-gray-600">
          {rating > 0 ? `${rating} ${rating === 1 ? 'star' : 'stars'}` : 'Select rating'}
        </span>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review (optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input"
          placeholder="Share your experience with this store..."
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading || rating === 0}
        className="btn btn-primary w-full"
      >
        {loading ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
      </button>
    </form>
  );
};

export default RatingForm;