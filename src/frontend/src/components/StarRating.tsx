interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({
  rating,
  size = "sm",
  showValue = true,
}: StarRatingProps) {
  const sizeClass =
    size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg";
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i < rating;
    return { filled, half, key: `star-${i}` };
  });

  return (
    <span className={`flex items-center gap-0.5 ${sizeClass}`}>
      {stars.map((s) => (
        <span
          key={s.key}
          style={{ color: s.filled || s.half ? "#F4B400" : "#D1D5DB" }}
        >
          {s.filled ? "★" : s.half ? "⯨" : "☆"}
        </span>
      ))}
      {showValue && (
        <span className="ml-1 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
