import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string | null;
};

const SunIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M6.76 4.84l-1.8-1.79L3.17 4.84 4.97 6.63 6.76 4.84zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.04 1.05l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17 13h3v-2h-3v2zM6.76 19.16l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm4.24-2.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM11 23h2v-3h-2v3z" />
  </svg>
);

export default SunIcon;