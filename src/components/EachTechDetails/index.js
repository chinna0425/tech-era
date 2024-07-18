import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'

const dataStatus = {success: 'SUCCESS', initial: 'INITIAL', failure: 'FAILURE'}

class EachTechDetails extends Component {
  state = {techItem: [], status: dataStatus.initial}

  componentDidMount() {
    this.onGetTheData()
  }

  onGetTheData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const data = await fetch(`https://apis.ccbp.in/te/courses/${id}`, {
      methods: 'GET',
    })
    if (data.ok) {
      const re = await data.json()
      const converted = {
        id: re.course_details.id,
        name: re.course_details.name,
        imageUrl: re.course_details.image_url,
        description: re.course_details.description,
      }
      this.setState({techItem: converted, status: dataStatus.success})
    } else {
      this.setState({status: dataStatus.failure})
    }
  }

  onGetTheSuccessData = () => {
    const {techItem} = this.state
    const {name, imageUrl, description} = techItem
    return (
      <div className="each-tech-details-image-text">
        <img src={imageUrl} alt={name} className="imageSettings" />
        <div className="text-image-container">
          <h1 className="each-tech-title-name">{name}</h1>
          <p className="each-tech-description">{description}</p>
        </div>
      </div>
    )
  }

  onShowTheLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
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
      case dataStatus.initial:
        return this.onShowTheLoading()
      default:
        return this.onFailureView()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="each-tech-details-main-container">
          {this.onRenderTheData()}
        </div>
      </>
    )
  }
}
export default EachTechDetails
