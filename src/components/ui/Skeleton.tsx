export function RowSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="ln-panel ln-two-col" aria-busy="true" aria-label="Loading songs">
      {Array.from({ length: count }, (_, i) => (
        <div className="ln-skel-row" key={i}>
          <span className="ln-skel ln-skel--art" />
          <span className="ln-skel-lines">
            <span className="ln-skel ln-skel--line" />
            <span className="ln-skel ln-skel--line short" />
          </span>
        </div>
      ))}
    </div>
  )
}

export function CardSkeletons({ count = 5 }: { count?: number }) {
  return (
    <div className="ln-grid" aria-busy="true" aria-label="Loading albums">
      {Array.from({ length: count }, (_, i) => (
        <div className="ln-skel-card" key={i}>
          <span className="ln-skel ln-skel--square" />
          <span className="ln-skel ln-skel--line" />
          <span className="ln-skel ln-skel--line short" />
        </div>
      ))}
    </div>
  )
}
