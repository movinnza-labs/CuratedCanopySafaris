import type { SVGProps } from "react";

const paths = {
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  x: <path d="M7 7l10 10M17 7 7 17" />,
  jeep: (
    <>
      <path d="M3 16V11l2-4h9l2 4h3a2 2 0 0 1 2 2v3" />
      <path d="M3 16h18" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M8 7v4M13 7v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  leaf: <path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16Zm0 0 7-7" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  snowflake: <path d="M12 2v20M4.9 7l14.2 10M4.9 17 19.1 7M9 4l3 2 3-2M9 20l3-2 3 2" />,
  cloudRain: (
    <>
      <path d="M7 15a4 4 0 0 1-.6-8A6 6 0 0 1 18 8a3.5 3.5 0 0 1 0 7H7Z" />
      <path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" />
    </>
  ),
  plane: <path d="M10.2 13.8 3 11.5l1.5-1.5 7.5 1 4.5-4.5a2 2 0 0 1 3 3L15 14l1 7.5-1.5 1.5-2.3-7.2L9 19v2.5L7.5 23 6 19.5 2.5 18 4 16.5h2.5l3.7-2.7Z" />,
  train: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01" />
    </>
  ),
  road: <path d="M4 21 9 3M20 21 15 3M12 5v2M12 11v2M12 17v2" />,
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3l-4.5 1.5Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-.9.8a4 4 0 0 1-2.3-2.3l.8-.9-1-1.9L9 9.5Z" />
    </>
  ),
  pawprint: (
    <>
      <circle cx="6" cy="10" r="2" />
      <circle cx="10" cy="6" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="18" cy="10" r="2" />
      <path d="M12 12c-3 0-5.5 3.5-5.5 6 0 1.5 1.2 2.5 2.7 2.5 1.2 0 1.9-.6 2.8-.6s1.6.6 2.8.6c1.5 0 2.7-1 2.7-2.5 0-2.5-2.5-6-5.5-6Z" />
    </>
  ),
  graduationCap: (
    <>
      <path d="M22 9 12 4 2 9l10 5 10-5Z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
    </>
  ),
  binoculars: (
    <>
      <circle cx="6.5" cy="16" r="3.5" />
      <circle cx="17.5" cy="16" r="3.5" />
      <path d="M10 16h4M4 13l2-8h3l1 8M20 13l-2-8h-3l-1 8" />
    </>
  ),
  quote: <path d="M9 7H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3M20 7h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5h.01" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Accessible label. When omitted the icon is treated as decorative. */
  title?: string;
};

export function Icon({ name, title, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-5"}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
