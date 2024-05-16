import React, { useEffect } from 'react'

const PageTitle = (title) => {
    useEffect(() => {
        document.title = 'Porthree - ' + title;
    }, [title]);
}

export default PageTitle
