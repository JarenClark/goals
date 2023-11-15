import React from "react";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
      className={className}
    >
      <circle cx="256" cy="256" r="256" fill="#F58426"></circle>
      <path
        fill="#FFF"
        d="M390.8 248c-.7-3-2.9-5.4-5.8-6.3l-107.2-33L338 76.8c1.9-4.4-.2-9.4-4.5-11.3-3-1.3-6.4-.8-8.9 1.3L123.9 255.1c-3.6 3.1-3.9 8.5-.8 12.1 1 1.2 2.4 2.1 3.9 2.5l105.6 32.5L176 435.4c-1.7 4.4.4 9.4 4.9 11.2 3 1.2 6.3.6 8.8-1.5l198.5-188.9c2.3-2.1 3.3-5.2 2.6-8.2z"
      ></path>
    </svg>
  );
}

export default Logo;
