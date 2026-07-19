export function MiniMap({ pinCount = 4 }: { pinCount?: number }) {
  return (
    <div className="mini-map">
      {Array.from({ length: pinCount }).map((_, i) => (
        <div key={i} className="pin" style={{ top: '40%', left: '35%' }}></div>
      ))}
    </div>
  )
}
