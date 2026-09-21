import React from "react";

interface DigilianceLogoProps {
  className?: string;
  showPoweredBy?: boolean;
  variant?: "dark" | "light" | "white";
}

export default function DigilianceLogo({
  className = "h-8 w-auto",
  showPoweredBy = true,
  variant = "dark",
}: DigilianceLogoProps) {
  const digiColor = variant === "white" ? "#FFFFFF" : "#08529C";
  const lianceColor = variant === "white" ? "#38BDF8" : "#0099FF";
  const subtextColor = variant === "white" ? "#94A3B8" : "#222222";
  const tmColor = variant === "white" ? "#38BDF8" : "#0099FF";

  return (
    <svg
      viewBox={showPoweredBy ? "0 0 540 108" : "0 0 540 76"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* D with central dot */}
      <g>
        <path
          d="M 12 6 C 5.373 6 0 11.373 0 18 L 0 62 C 0 68.627 5.373 74 12 74 L 30 74 C 50.987 74 68 56.987 68 36 C 68 15.013 50.987 6 30 6 L 12 6 Z M 16 20 L 29 20 C 37.837 20 45 27.163 45 36 C 45 44.837 37.837 52 29 52 L 16 52 L 16 20 Z"
          fill={digiColor}
        />
        <circle cx="30" cy="36" r="6.5" fill={digiColor} />

        {/* I */}
        <rect x="78" y="6" width="16" height="68" rx="4" fill={digiColor} />

        {/* G */}
        <path
          d="M 174 29 C 168 15 154 6 136 6 C 112 6 96 20 96 39 C 96 60 112 74 136 74 C 158 74 172 63 174 46 L 138 46 C 134 46 132 44 132 40 L 132 35 C 132 31 134 29 138 29 L 188 29 C 191 29 193 31 193 34 L 193 49 C 193 68 171 88 136 88 C 98 88 74 62 74 39 C 74 16 98 -8 136 -8 C 162 -8 184 7 192 24 C 193.5 27 191.5 30 188 30 L 178 30 C 176 30 174.5 29.5 174 29 Z"
          transform="translate(18, 0)"
          fill={digiColor}
        />

        {/* I */}
        <rect x="220" y="6" width="16" height="68" rx="4" fill={digiColor} />

        {/* L */}
        <path
          d="M 248 10 C 248 7.8 249.8 6 252 6 L 264 6 C 266.2 6 268 7.8 268 10 L 268 58 L 292 58 C 294.2 58 296 59.8 296 62 L 296 70 C 296 72.2 294.2 74 292 74 L 252 74 C 249.8 74 248 72.2 248 70 Z"
          fill={lianceColor}
        />

        {/* I */}
        <rect x="306" y="6" width="16" height="68" rx="4" fill={lianceColor} />

        {/* A (Lambda chevron) */}
        <path
          d="M 358 6 C 360.5 6 362.5 7.5 363.6 9.8 L 387 70 C 387.8 72.5 385.9 74 383.5 74 L 371 74 C 368.5 74 366.5 72.5 365.7 70.2 L 358 48 L 350.3 70.2 C 349.5 72.5 347.5 74 345 74 L 332.5 74 C 330.1 74 328.2 72.5 329 70 L 352.4 9.8 C 353.5 7.5 355.5 6 358 6 Z"
          fill={lianceColor}
        />

        {/* N */}
        <path
          d="M 397 10 C 397 7.8 398.8 6 401 6 L 413 6 C 415.5 6 417.2 7.2 418.5 9 L 442 50 L 442 10 C 442 7.8 443.8 6 446 6 L 458 6 C 460.2 6 462 7.8 462 10 L 462 70 C 462 72.2 460.2 74 458 74 L 446 74 C 443.5 74 441.8 72.8 440.5 71 L 417 30 L 417 70 C 417 72.2 415.2 74 413 74 L 401 74 C 398.8 74 397 72.2 397 70 Z"
          fill={lianceColor}
        />

        {/* C */}
        <path
          d="M 506 20 C 500 10 488 4 474 4 C 452 4 438 18 438 39 C 438 60 452 74 474 74 C 488 74 499 67 504 57 C 505.5 54 508.5 53 511.5 54.5 L 520 58.5 C 522.5 60 523.5 63 521.8 66 C 512 80 495 88 474 88 C 440 88 418 64 418 39 C 418 14 440 -10 474 -10 C 496 -10 514 0 523 15 C 524.5 18 523.5 21 520.5 22.5 L 512 26.5 C 509 28 506 26.5 504.5 23.5 Z"
          transform="translate(48, 0)"
          fill={lianceColor}
        />

        {/* E */}
        <path
          d="M 522 10 C 522 7.8 523.8 6 526 6 L 565 6 C 567.2 6 569 7.8 569 10 L 569 19 C 569 21.2 567.2 23 565 23 L 542 23 L 542 32 L 560 32 C 562.2 32 564 33.8 564 36 L 564 44 C 564 46.2 562.2 48 560 48 L 542 48 L 542 57 L 566 57 C 568.2 57 570 58.8 570 61 L 570 70 C 570 72.2 568.2 74 566 74 L 526 74 C 523.8 74 522 72.2 522 70 Z"
          transform="translate(6, 0)"
          fill={lianceColor}
        />

        {/* TM */}
        <text
          x="582"
          y="20"
          fill={tmColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="20"
        >
          TM
        </text>
      </g>

      {/* Powered by SPECTRA */}
      {showPoweredBy && (
        <g transform="translate(325, 102)">
          <text
            x="0"
            y="0"
            fill={subtextColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            letterSpacing="0.02em"
          >
            powered by
          </text>
          <text
            x="100"
            y="0"
            fill={subtextColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="bold"
            fontSize="19"
            letterSpacing="0.1em"
          >
            SPECTR
          </text>
          {/* Stylized A in SPECTRA */}
          <path
            d="M 188 -16 L 198 0 L 192 0 L 188 -7 L 184 0 L 178 0 Z"
            fill={subtextColor}
          />
          <path
            d="M 188 -10 L 193 0 L 190 0 L 188 -3 Z"
            fill="#0099FF"
          />
        </g>
      )}
    </svg>
  );
}
