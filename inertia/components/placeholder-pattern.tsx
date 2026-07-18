export function PlaceholderPattern({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none">
      <defs>
        <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" strokeWidth="1" />
        </pattern>
      </defs>
      <rect stroke="none" fill="url(#pattern)" width="100%" height="100%" />
    </svg>
  )
}
