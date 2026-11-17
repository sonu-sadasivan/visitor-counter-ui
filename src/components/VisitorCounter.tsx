import { AnimatedNumber } from './AnimatedNumber';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';
export function VisitorCounter({ count, loading, error, onRetry }: { count: number | null; loading: boolean; error: boolean; onRetry: () => void }) {
  return <section className="counter-card" aria-label="Visitor total">{loading ? <LoadingState /> : error || count === null ? <ErrorState onRetry={onRetry} /> : <div className="counter-content"><p className="counter-label">Total visitors</p><AnimatedNumber value={count} /></div>}</section>;
}
