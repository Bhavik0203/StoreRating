import RatingStars from '../UI/RatingStars';

const RatingList = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No ratings available for this store yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-800">{rating.User?.name || 'Anonymous'}</h4>
              <div className="flex items-center mt-1">
                <RatingStars rating={rating.rating} />
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {rating.comment && (
            <p className="mt-2 text-gray-600">{rating.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingList;