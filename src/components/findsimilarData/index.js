import './index.css'

const SimilarData = props => {
  const {simm} = props
  console.log(simm)
  console.log('simm')

  return (
    <ul className="ul-sim-cont">
      {simm.map(each => {
        const {title, rating, location, des, Url, etype} = each
        return (
          <li className="similar-item-cont">
            <div className="img-cont">
              <img
                className="item-img"
                src={Url}
                alt="similar job company logo"
              />
              <div className="title-cont">
                <h1 className="item-h1">{title}</h1>
                <p className="item-p">{rating}</p>
              </div>
            </div>
            <div className="type-cont">
              <div className="type-content">
                <p className="item-p">{location}</p>
                <p className="item-p">{etype}</p>
              </div>
            </div>
            <hr className="line" />
            <p className="item-h">{des}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default SimilarData
