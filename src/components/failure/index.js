import './index.css'

const Failure = props => {
  const {func} = props

  return (
    <div className="no-jobs">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn">Retry...</button>
    </div>
  )
}
export default Failure
