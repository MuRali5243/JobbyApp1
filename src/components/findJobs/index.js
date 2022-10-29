import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../findjobItem'
import ProfileItem from '../profile'
import Filter from '../filters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class FindJobs extends Component {
  state = {
    searchvalue: '',
    emptype: '',
    minpackage: '',
    list: [],
    statestatus: status.initial,
    profstatus: false,
    profiledata: {},
    salaryList: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.profile()
    this.jobsData()
  }

  profile = async () => {
    const token = Cookies.get('jwt_token')
    const option = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const pro = await fetch('https://apis.ccbp.in/profile', option)
    console.log(pro)
    if (pro.ok === true) {
      const prores = await pro.json()
      const pdetails = {
        name: prores.profile_details.name,
        pUrl: prores.profile_details.profile_image_url,
        bio: prores.profile_details.short_bio,
      }
      this.setState({profstatus: true, profiledata: pdetails})
    }
  }

  profilesuccess = succ => {
    const {profiledata} = this.state
    return <ProfileItem det={profiledata} />
  }

  profilefail = () => (
    <div className="pro-fail-cont">
      <button onClick={this.profile}>Retry</button>
    </div>
  )

  statusCheck = () => {
    const {statestatus} = this.state
    switch (statestatus) {
      case 'loading':
        return this.LoaderF()
      case 'success':
        return this.success()
      case 'failure':
        return this.failure()
      default:
        return null
    }
  }

  LoaderF = () => (
    <div>
      <Loader type="ThreeDots" width="65" height="65" />
    </div>
  )

  filterempFun = vale => {
    this.setState({emptype: vale}, this.jobsData)
  }

  filtersalFun = vale => {
    this.setState({minpackage: vale}, this.jobsData)
  }

  jobsData = async () => {
    const {searchvalue, salaryList, emptype, minpackage} = this.state
    const search = searchvalue
    this.setState({statestatus: status.loading})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${search}&minimum_package=${minpackage}&employment_type=${emptype}`
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const promise = await fetch(url, options)

    if (promise.ok === true) {
      const res = await promise.json()
      const newList = res.jobs.map(each => ({
        id: each.id,
        title: each.title,
        location: each.location,
        rating: each.rating,
        description: each.job_description,
        type: each.employment_type,
        companyUrl: each.company_logo_url,
        packaage: each.package_per_annum,
      }))

      this.setState({list: newList, statestatus: 'success'})
    } else {
      this.setState({statestatus: 'failure'})
    }
  }

  success = () => {
    const {list} = this.state
    const l = list.length

    if (l !== 0) {
      return (
        <ul className="list-item-cont">
          {list.map(item => (
            <JobItem key={item.id} det={item} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  failure = () => (
    <div className="no-jobs">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" onClick={this.jobsData}>
        Retry...
      </button>
    </div>
  )

  searchButton = () => {
    const element = document.getElementById('inputs')
    const val = element.value

    this.setState({searchvalue: val}, this.jobsData)
  }

  render() {
    const {searchvalue, profstatus} = this.state

    return (
      <div>
        <Header />
        <div className="findjobs-body-cont">
          <div className="findjobs-body-cont-left">
            {profstatus ? this.profilesuccess() : this.profilefail()}
            <div>
              <Filter
                empfun={this.filterempFun}
                salfun={this.filtersalFun}
                emp={employmentTypesList}
                sal={salaryRangesList}
              />
            </div>
          </div>
          <div className="findjobs-body-cont-right">
            <div className="search-btn-cont">
              <input
                placeholder="Search"
                type="search"
                id="inputs"
                className="main-input"
              />
              <button
                className="main-input-btn"
                type="button"
                id="searchButton"
                onClick={this.searchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="status-check-cont">{this.statusCheck()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default FindJobs
