import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string | null;
};

const MoonIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M12.43 2.3a9 9 0 1 0 9.27 12.4 7 7 0 0 1-9.27-12.4z" />
  </svg>
);

export default MoonIcon;