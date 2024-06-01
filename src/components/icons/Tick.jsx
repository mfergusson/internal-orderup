const Tick = ({ height = 20, width = 20, viewBox = '1 1 19 19', color = '#ff1616' }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={viewBox} fill='none'>
    <path d='M17.8125 10.9374C17.1875 14.0624 14.8314 17.0045 11.5241 17.6623C8.21691 18.3202 4.86081 16.7818 3.20035 13.847C1.53989 10.9122 1.94981 7.24312 4.21705 4.74709C6.48429 2.25106 10.3125 1.56246 13.4375 2.81246' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M7.1875 9.6875L10.3125 12.8125L17.8125 4.6875' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
export default Tick;