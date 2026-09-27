import type { CSSProperties } from 'react';
const paths: Record<string, React.ReactNode> = {
  arrow: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
  northeast: <><path d="M6 18 18 6M6 6h12v12"/></>,
  trade: <><path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10M7.5 5l9 4"/></>,
  travel: <><path d="m21 3-6 18-4-8-8-4L21 3ZM11 13l10-10"/></>,
  care: <><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></>,
  media: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 8 6 4-6 4V8Z"/></>,
  school: <><path d="M12 5v16M12 5C9 2 4 3 2 4v15c3-2 7-1 10 2 3-3 7-4 10-2V4c-2-1-7-2-10 1Z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
};
export function Icon({name, className, style}: {name: string; className?: string; style?: CSSProperties}) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>{paths[name] || paths.arrow}</svg>;
}
