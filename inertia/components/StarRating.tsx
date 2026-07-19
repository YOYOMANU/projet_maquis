type StarRatingProps = {
  rating: number // 0-5
  size?: 'sm' | 'md'
}

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const full = Math.round(rating)
  const stars = '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full)

  return (
    <span className="stars" style={size === 'sm' ? { fontSize: '11px' } : undefined}>
      {stars}
    </span>
  )
}
