import {Link} from 'react-router-dom'
import './index.css'

const EachTech = props => {
  const {eachTech} = props
  const {id, name, logoUrl} = eachTech
  return (
    <Link to={`/courses/${id}`} className="link-style">
      <li className="each-tech-list-item">
        <img src={logoUrl} alt={name} className="each-tech-card-image" />
        <p className="each-tech-card-title">{name}</p>
      </li>
    </Link>
  )
}
export default EachTech
