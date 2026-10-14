import React from "react";

export default function Glassware({
  item,
  solution,
  selected,
  onClick,
  onDragStart,
  compact = false,
}) {
  const liquid = solution?.color || "#c9eef8";
  const type = item.kind;
  return (
    <button
      className={`glassware ${compact ? "compact" : ""} ${selected ? "selected" : ""}`}
      onClick={onClick}
      draggable={!compact}
      onDragStart={onDragStart}
      aria-label={`${item.name}${solution ? ` containing ${solution.name}` : ""}`}
    >
      <svg viewBox="0 0 100 112" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={`liquid-${item.id}`} x1="0" x2="1">
            <stop offset="0" stopColor={liquid} stopOpacity=".72" />
            <stop offset="1" stopColor={liquid} stopOpacity=".98" />
          </linearGradient>
        </defs>
        {type === "glass" && (
          <>
            <path
              d="M25 17 L75 17 L70 91 Q50 101 30 91 Z"
              fill="#ffffff"
              fillOpacity=".28"
              stroke="#7194a8"
              strokeWidth="2.5"
            />
            <path
              d="M29 57 L71 57 L68 89 Q50 97 32 89 Z"
              fill={`url(#liquid-${item.id})`}
            />
            <path
              d="M25 17 L75 17"
              stroke="#7194a8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M34 29 L38 29 M34 39 L40 39 M34 49 L38 49"
              stroke="#7194a8"
              strokeWidth="1.5"
            />
          </>
        )}
        {type === "tube" && (
          <>
            <path
              d="M34 13 L66 13 L64 76 Q62 96 50 97 Q38 96 36 76 Z"
              fill="#ffffff"
              fillOpacity=".25"
              stroke="#7194a8"
              strokeWidth="2.5"
            />
            <path
              d="M37 56 L63 56 L62 77 Q60 91 50 92 Q40 91 38 77 Z"
              fill={`url(#liquid-${item.id})`}
            />
            <path
              d="M34 13 L66 13"
              stroke="#7194a8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}
        {type === "flask" && (
          <>
            <path
              d="M42 12 L58 12 L58 42 L79 79 Q85 94 67 96 L33 96 Q15 94 21 79 L42 42 Z"
              fill="#ffffff"
              fillOpacity=".25"
              stroke="#7194a8"
              strokeWidth="2.5"
            />
            <path
              d="M28 76 L72 76 L79 84 Q80 92 66 93 L34 93 Q20 92 22 84 Z"
              fill={`url(#liquid-${item.id})`}
            />
            <path
              d="M42 12 L58 12"
              stroke="#7194a8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}
        {type === "dropper" && (
          <>
            <path
              d="M44 12 Q50 2 56 12 L56 26 L53 31 L53 83 L47 83 L47 31 L44 26 Z"
              fill="#ffffff"
              stroke="#7194a8"
              strokeWidth="2"
            />
            <path d="M48 39 L52 39 L52 78 L48 78 Z" fill={liquid} />
            <path d="M50 86 Q44 92 50 97 Q56 92 50 86" fill={liquid} />
          </>
        )}
        {type === "cylinder" && (
          <>
            <path
              d="M35 13 L65 13 L63 91 L37 91 Z"
              fill="#ffffff"
              fillOpacity=".25"
              stroke="#7194a8"
              strokeWidth="2.5"
            />
            <path
              d="M38 55 L62 55 L61 88 L39 88 Z"
              fill={`url(#liquid-${item.id})`}
            />
            {[28, 38, 48, 58, 68, 78].map((y) => (
              <path
                key={y}
                d={`M39 ${y} L47 ${y}`}
                stroke="#7194a8"
                strokeWidth="1.2"
              />
            ))}
          </>
        )}
        {solution && (
          <circle
            cx="72"
            cy="25"
            r="5"
            fill={liquid}
            stroke="#fff"
            strokeWidth="2"
          />
        )}
      </svg>
      <span className="glass-label">{item.name}</span>
      {solution && <span className="glass-content">{solution.name}</span>}
    </button>
  );
}
