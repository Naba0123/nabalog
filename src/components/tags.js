import React from "react"
import { Link } from "gatsby"
import kebabCase from 'lodash/kebabCase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

import "./layout.css"
import "./tags.css"

const Tag = ({ tag }) => (
  <li>
    <Link to={`/tags/${kebabCase(tag)}/`}>
      <FontAwesomeIcon icon={faTag} /> {tag}
    </Link>
  </li>
)

const Tags = ({ tags }) => (
  <ul className={`tag`}>
    {(tags || []).map((tag, index) => (
      <Tag tag={tag} key={index} />
    ))}
  </ul>
)

export default Tags
