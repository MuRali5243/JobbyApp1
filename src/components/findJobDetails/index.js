import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import RenderDetails from '../findJobFullDetails'
import Header from '../Header'
import Failure from '../failure'
import './index.css'

class JobDetails extends Component {
  state = {data: {}, similarData: [], status: 'rest'}

  componentDidMount() {
    this.jobDetails()
  }

  faildetails = () => {
    this.setState({status: 'failure'})
  }

  jobDetails = async () => {
    this.setState({status: 'loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const d = data.job_details

      const jobDet = {
        id: d.id,
        des: d.job_description,
        life: d.life_at_company,
        location: d.location,
        paackage: d.package_per_annum,
        rating: d.rating,
        title: d.title,
        skills: d.skills,
        compurl: d.company_logo_url,
        weburl: d.company_website_url,
        etype: d.employment_type,
      }
      console.log(jobDet)
      const sim = data.similar_jobs

      const s = sim.map(item => ({
        id: item.id,
        title: item.title,
        rating: item.rating,
        location: item.location,
        des: item.job_description,
        type: item.employment_type,
        Url: item.company_logo_url,
      }))
      console.log(s)
      this.setState({data: jobDet, similarData: s, status: 'success'})
    } else {
      this.faildetails()
    }
  }

  LoaderF = () => (
    <div>
      <Loader type="ThreeDots" width="65" height="65" />
    </div>
  )

  failure = () => <Failure func={this.jobDetails} />

  renderItem = () => {
    const {data, similarData} = this.state
    return <RenderDetails jobdata={data} similar={similarData} />
  }

  statusCheckk = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.LoaderF()
      case 'success':
        return this.renderItem()
      case 'failure':
        return this.failure()
      default:
        return null
    }
  }

  render() {
    const {status} = this.state
    return (
      <div>
        <Header />
        <div>{this.statusCheckk()}</div>
      </div>
    )
  }
}
export default JobDetails
