import React from "react"
import { Link } from "gatsby"

const Page = ({ context }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = context
  return (
    <div className={`pagination`}>
      <p style={{marginBottom: 0}}>
        <span>
          Page {humanPageNumber} of {numberOfPages}
        </span>
      </p>
      <ul>
        
          <li>
          {previousPagePath && (
            <Link to={previousPagePath} className={`pagination-before`}>前のページ</Link>
            )}
          </li>
        
        {nextPagePath && (
          <li>
            <Link to={nextPagePath} className={`pagination-after`}>
              次のページ
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Page
