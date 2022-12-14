import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onclickk = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="head-main-cont">
      <Link to="/">
        <img
          className="header-img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
      </Link>

      <li className="header-list-cont">
        <Link to="/">
          <li className="li-item">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="li-item">Jobs</li>
        </Link>
      </li>
      <li>
        <button className="head-btn" type="button" onClick={onclickk}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
