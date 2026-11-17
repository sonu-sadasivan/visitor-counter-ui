import { useCallback, useEffect, useRef, useState } from 'react';
import { recordVisit } from '../services/visitorService';
import type { VisitorState } from '../types/visitor';

const initialState: VisitorState = { count: null, loading: true, error: false };

export function useVisitorCount() {
  const [state, setState] = useState<VisitorState>(initialState);
  const requested = useRef(false);
  const load = useCallback(async () => {
    setState({ count: null, loading: true, error: false });
    try { const { count } = await recordVisit(); setState({ count, loading: false, error: false }); }
    catch { setState({ count: null, loading: false, error: true }); }
  }, []);
  useEffect(() => { if (requested.current) return; requested.current = true; void load(); }, [load]);
  return { ...state, retry: load };
}
