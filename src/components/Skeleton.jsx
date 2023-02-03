import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={439}
    viewBox="0 0 280 439"
    backgroundColor="#f3f3f3"
    foregroundColor="#f4f2e4"
  >
    <circle cx="145" cy="128" r="116" />
    <rect x="18" y="275" rx="13" ry="13" width="252" height="55" />
    <rect x="156" y="357" rx="18" ry="18" width="111" height="38" />
    <rect x="23" y="356" rx="6" ry="6" width="102" height="39" />
    <rect x="69" y="399" rx="0" ry="0" width="2" height="9" />
    <rect x="31" y="378" rx="0" ry="0" width="15" height="1" />
  </ContentLoader>
);

export default Skeleton;
