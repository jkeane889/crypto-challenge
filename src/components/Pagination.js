import React from 'react'
import './Pagination.css'

const Pagination = ({ totalCoins, maxCoinsPerPage, paginate }) => {
    /*
        Component will showcase numbers based on elements per page
            which will be linked and clickable to allow user to
            search through pages by clicking.

            "1, 2, 3, 4, 5" <-- page numbers
    */

    // Create numbers array for pagination component
    
    let pageNumbers = [];

    for (let i = 1; i < Math.ceil(totalCoins / maxCoinsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return (
        <div className="paginate-numbers">
            {pageNumbers.map(number => (
                <div>
                    <a onClick={() => paginate(number)} key={number} href="!#">{number}</a>
                </div>
            ))}
        </div>
    )
}

export default Pagination