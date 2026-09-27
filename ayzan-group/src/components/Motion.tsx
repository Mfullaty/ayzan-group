'use client';
import { useEffect } from 'react';
import { businesses } from '@/lib/content';

type ModelContext = { registerTool: (tool: {name: string; description: string; inputSchema: object; annotations: object; execute: (input: unknown) => unknown}, options: {signal: AbortSignal}) => void | Promise<void> };
export function Motion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    if (!media.matches) elements.forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    const onMedia = () => { if (media.matches) elements.forEach(el => el.classList.add('revealed')); };
    media.addEventListener('change', onMedia);
    const lifecycle = new AbortController();
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (context?.registerTool) {
      try {
        Promise.resolve(context.registerTool({
          name: 'explore_ayzan_business',
          description: 'Open an Ayzan business in the visible portfolio and read its services. This does not send an inquiry.',
          inputSchema: { type: 'object', properties: { id: { type: 'string', enum: businesses.map(b => b.id) } }, required: ['id'], additionalProperties: false },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input) {
            if (!input || typeof input !== 'object' || !('id' in input) || typeof input.id !== 'string') throw new Error('A valid business id is required.');
            const business = businesses.find(b => b.id === input.id);
            if (!business) throw new Error('Unknown Ayzan business.');
            const element = document.getElementById(business.id);
            if (!(element instanceof HTMLDetailsElement)) throw new Error('Business information is unavailable.');
            element.open = true;
            element.scrollIntoView({ behavior: 'instant', block: 'start' });
            return { id: business.id, name: business.name, description: business.description, services: business.services, contact: 'support@ayzangroup.com' };
          }
        }, { signal: lifecycle.signal })).catch(() => {});
      } catch { /* Optional browser capability; normal navigation remains available. */ }
    }
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); lifecycle.abort();
      window.removeEventListener('scroll', update); media.removeEventListener('change', onMedia);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true"/>;
}
