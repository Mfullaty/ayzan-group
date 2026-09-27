'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return <header className="header">
    <a href="#home" className="brand" aria-label="Ayzan Group home" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">A</span><span>ayzan<span className="brand-sub">GROUP</span></span></a>
    <button className="menu-toggle" ref={toggle} aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'navigation open' : 'navigation'}>
      <a href="#about" onClick={() => setOpen(false)}>Our group</a>
      <a href="#businesses" onClick={() => setOpen(false)}>Our businesses <span className="nav-count">05</span></a>
      <a href="#purpose" onClick={() => setOpen(false)}>Our purpose</a>
      <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s connect <Icon name="northeast"/></a>
    </nav>
  </header>;
}
