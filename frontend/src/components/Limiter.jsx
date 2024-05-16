import React from 'react'

const Limiter = (longString, maxLen = 50) => {
    if (!longString) {
        return
    }
    if (longString.length > maxLen)
        return longString.slice(0, maxLen) + '...';
    return longString;
}

export default Limiter;
