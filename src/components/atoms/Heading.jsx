import React from 'react';
import PropTypes from 'prop-types';

function Heading({ level, children }) {

    const HeadingTag = `h${level}`

    const getHeadingStyles = (level) => {
        switch (level) {
          case '1':
            return 'text-[28px] font-[700] text-textColor flex items-center';
          case '2':
            return 'text-[24px] font-[700] text-textColor flex items-center';
          case '3':
            return 'text-[22px] font-[700] text-textColor flex items-center';
          case '4':
            return 'text-2xl text-pink';
          case '5':
            return 'text-[16px] font-[600] text-textColor';
          case '6':
            return 'text-lg text-secondary';
          default:
            return 'text-lg';
        }
    }

    const headingStyles = getHeadingStyles(level)

  return (
    <HeadingTag className={headingStyles}>{children}</HeadingTag>
  )
}

Heading.propTypes = {
    level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
}

export default Heading
