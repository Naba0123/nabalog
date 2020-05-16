import React from "react"
import { Link } from "gatsby"
import kebabCase from 'lodash/kebabCase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"

import "./layout.css"
import "./tags.css"

const Tag = ({ tag }) => (
  <li>
    <Link to={`/tags/${kebabCase(tag)}/`}>
      <FontAwesomeIcon icon={faTags} /> {tag}
    </Link>
  </li>
)

const Tags = ({ tags }) => (
  <ul className={`tag`}>
    {(tags || []).map(tag => (
      <Tag tag={tag} />
    ))}
  </ul>
)

export default Tags
