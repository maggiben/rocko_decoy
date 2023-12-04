import React from 'react'

function CloseIcon(props) {
  const { fill = '#2C3B8D', ...rest } = props
  return (
    <svg
      width="16"
      height="16"
      {...rest}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Close">
        <path
          id="icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.05659 7.9994L2.86133 3.80414L3.80414 2.86133L7.9994 7.05659L12.1947 2.86133L13.1375 3.80414L8.94221 7.9994L13.1375 12.1947L12.1947 13.1375L7.9994 8.94221L3.80414 13.1375L2.86133 12.1947L7.05659 7.9994Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

export default CloseIcon
