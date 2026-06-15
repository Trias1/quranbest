export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 animate-pulse flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AyahSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-6 animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl animate-pulse border-l-4 border-gray-200">
      <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
      <div className="h-8 bg-gray-200 rounded w-16" />
    </div>
  )
}
