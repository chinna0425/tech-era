import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachTech from '../EachTech'

import './index.css'

const dataStatus = {success: 'SUCCESS', initial: 'INITIAL', failure: 'FAILURE'}

class HomePage extends Component {
  state = {courses: [], status: dataStatus.initial}

  componentDidMount() {
    this.getTheCourses()
  }

  getTheCourses = async () => {
    const data = await fetch(`https://apis.ccbp.in/te/courses`, {
      methods: 'GET',
    })
    if (data.ok) {
      const res = await data.json()
      const converted = res.courses.map(eachSet => ({
        id: eachSet.id,
        name: eachSet.name,
        logoUrl: eachSet.logo_url,
      }))
      this.setState({courses: converted, status: dataStatus.success})
    } else {
      console.log('Hi')
      this.setState({status: dataStatus.failure})
    }
  }

  onGetTheSuccessData = () => {
    const {courses} = this.state
    return (
      <div className="home-page-main-container">
        <h1 className="home-page-title-heading">Courses</h1>
        <ul className="unorderd-list-tech-items">
          {courses.map(eachTech => (
            <EachTech eachTech={eachTech} key={eachTech.id} />
          ))}
        </ul>
      </div>
    )
  }

  onShowTheLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Bars" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <div>
        <h1>Oops! Something Went Wrong</h1>
        <p>We Cannot seem to find the page you are looking for.</p>
        <button type="button">Retry</button>
      </div>
    </div>
  )

  onRenderTheData = () => {
    const {status} = this.state
    switch (status) {
      case dataStatus.success:
        return this.onGetTheSuccessData()
      case dataStatus.failure:
        return this.onFailureView()
      default:
        return this.onShowTheLoading()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.onRenderTheData()}
      </>
    )
  }
}
export default HomePage
