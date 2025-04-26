import { useState } from 'react';

const RatingStars = ({ rating = 0, editable = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (newRating) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (newHoverRating) => {
    if (editable) {
      setHoverRating(newHoverRating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type={editable ? "button" : "div"}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={`${editable ? 'cursor-pointer' : 'cursor-default'} text-xl`}
            disabled={!editable}
          >
            {isFilled ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;