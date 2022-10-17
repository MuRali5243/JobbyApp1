import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {pwd: '', name: '', showError: false, errmsg: ''}

  onchangePwd = event => {
    this.setState({pwd: event.target.value})
  }

  onchangeUser = event => {
    this.setState({name: event.target.value})
  }

  success = async data => {
    const {history} = this.props
    const res = await data.json()
    const jwttoken = res.jwt_token
    Cookie.set('jwt_token', jwttoken, {expires: 30})
    console.log('CCC')
    history.replace('/')
  }

  fail = async promise => {
    const res = await promise.json()
    const errmsg = res.error_msg
    this.setState({errmsg, showError: true})
  }

  onsubmit = async event => {
    event.preventDefault()
    const {pwd, name} = this.state
    const details = {username: name, password: pwd}
    console.log('sub')
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(details)}
    const promise = await fetch(url, options)
    console.log(promise)

    if (promise.ok === true) {
      this.success(promise)
    } else {
      this.fail(promise)
    }
  }

  pwdelement = () => {
    const {pwd} = this.state

    return (
      <div>
        <label htmlFor="pwd">PASSWORD</label>
        <br />

        <input
          id="pwd"
          onChange={this.onchangePwd}
          type="password"
          value={pwd}
        />
        <br />
      </div>
    )
  }

  userelement = () => {
    const {name} = this.state

    return (
      <div>
        <label htmlFor="usr">USERNAME</label>

        <br />
        <input
          placeholder="Username"
          id="usr"
          onChange={this.onchangeUser}
          type="text"
          value={name}
        />
        <br />
        <br />
      </div>
    )
  }

  render() {
    const {pwd, showError, errmsg} = this.state
    return (
      <div className="form-main-cont">
        <div className="form-cont">
          <div className="form-img-cont">
            <img
              className="form-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </div>

          <form onSubmit={this.onsubmit}>
            {this.userelement()}
            {this.pwdelement()}
            <br />
            <button className="login-button" type="submit">
              Login
            </button>
            {showError && <p className="err-msg">{errmsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
