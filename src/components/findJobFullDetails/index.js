import {GoLocation} from 'react-icons/go'
import {BsFillBagFill, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Similar from '../findsimilarData'
import './index.css'

const FullDetails = props => {
  const {jobdata, similar} = props
  console.log(jobdata)
  const {
    title,
    paackage,
    rating,
    location,
    des,
    skills,
    life,
    compurl,
    weburl,
    etype,
  } = jobdata
  const skillss = skills.map(each => ({
    name: each.name,
    imgurl: each.image_url,
  }))
  const Life = {
    des: life.description,
    imgurl: life.image_url,
  }
  console.log(Life)
  console.log(similar)

  return (
    <div className="item-cont mar-cont">
      <div className="img-cont">
        <img
          className="item-img"
          src={compurl}
          alt="job details company logo"
        />
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
            <p className="item-p">{etype}</p>
          </div>
        </div>

        <p>{paackage}</p>
      </div>
      <hr className="line" />
      <p className="item-h">{des}</p>
      <div className="job-skills">
        <h1>Skills</h1>
        <ul className="skills-cont">
          {skillss.map(each => (
            <li className="skills-content">
              <img className="skills-img" src={each.imgurl} alt={each.name} />
              <h1 className="skills-h1">{each.name}</h1>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div className="life-cont">
          <p>{Life.des}</p>
          <img
            className="life-cont-img"
            src={Life.imgurl}
            alt="life at company"
          />
        </div>
      </div>
      <h1>Similar Jobs</h1>
      <ul>
        <Similar simm={similar} />
      </ul>
    </div>
  )
}

export default FullDetails
