const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'square',
  'aria-hidden': true,
});

export const ArrowRightIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDownIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const CheckIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const CopyIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="8" y="8" width="12" height="12" />
    <path d="M16 8V4H4v12h4" />
  </svg>
);

export const PlayIcon = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M7 5v14l12-7z" fill="currentColor" />
  </svg>
);

export const ResetIcon = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5" />
  </svg>
);
