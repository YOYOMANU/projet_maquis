import type { PopularPlace } from '~/types/index'

export function PopularList({ places }: { places: PopularPlace[] }) {
  return (
    <>
      {places.map((place) => (
        <div className="trend-item" key={place.name}>
          <span>{place.name}</span>
          <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{place.duration}</span>
        </div>
      ))}
    </>
  )
}
