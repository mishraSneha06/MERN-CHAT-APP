const MessageSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 });

  return (
    <div className="w-full space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-2 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar Skeleton */}
          {idx % 2 === 0 && (
            <div className="size-10 rounded-full bg-gray-700 animate-pulse" />
          )}

          <div>
            {/* Username Skeleton */}
            <div className="mb-1">
              <div className="bg-gray-700 h-4 w-16 rounded-md animate-pulse" />
            </div>

            {/* Message Bubble Skeleton */}
            <div
              className={`bg-gray-700 h-5 rounded-md animate-pulse 
              ${idx % 2 === 0 ? "w-36" : "w-48"} p-3`}
            />
          </div>

          {/* Avatar Skeleton for Right-aligned Messages */}
          {idx % 2 !== 0 && (
            <div className="size-10 rounded-full bg-gray-700 animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
