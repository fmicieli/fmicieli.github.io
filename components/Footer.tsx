export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/florencia-micieli-270350150/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:fmicieli94@gmail.com",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m4 6.5 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    // No horizontal padding of its own (unlike before): Footer now always
    // renders nested inside a container that already applies px-page-x
    // (Contact's own section on the home page, the case-study page's
    // px-page-x wrapper for NextStepsSection) rather than as a standalone
    // page-level sibling — adding its own here would double the margin.
    <footer className="relative flex items-center justify-between gap-4 py-5 text-body text-text-secondary">
      <p>© {year} Florencia Micieli</p>
      <ul className="flex items-center gap-3">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-text-secondary transition-colors hover:border-accent/30 hover:bg-surface-hover hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
