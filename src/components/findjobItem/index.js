import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill, BsFillStarFill} from 'react-icons/bs'
import './index.css'

const Item = props => {
  const {det} = props

  const {
    id,
    title,
    description,
    rating,
    location,
    type,
    packaage,
    companyUrl,
  } = det

  return (
    <Link to={`/jobs/${id}`}>
      <li className="item-cont">
        <div className="img-cont">
          <img className="item-img" src={companyUrl} alt="company logo" />
          <div className="title-cont">
            <h1 className="item-h1">{title}</h1>
            <div className="type-content-lo">
              <BsFillStarFill className="star" />
              <p className="item-p">{rating}</p>
            </div>
          </div>
        </div>
        <div className="type-cont">
          <div className="type-content">
            <div className="type-content-lo">
              <GoLocation />
              <p className="item-p">{location}</p>
            </div>

            <div className="type-content-lo">
              <BsFillBagFill />
              <p className="item-p">{type}</p>
            </div>
          </div>

          <p>{packaage}</p>
        </div>
        <hr className="line" />
        <h1>Description</h1>
        <p className="item-h">{description}</p>
      </li>
    </Link>
  )
}
export default Item
