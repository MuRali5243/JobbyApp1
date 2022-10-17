import './index.css'

const ProfileItem = props => {
  const {det} = props
  const {name, bio, pUrl} = det
  console.log(pUrl)

  return (
    <div className="pro-cont">
      <img className="pro-img" src={pUrl} alt="profile" />
      <div className="pro-content">
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    </div>
  )
}
export default ProfileItem
