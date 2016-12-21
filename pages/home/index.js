import React, { Component } from 'react'
import R from 'ramda'

// import local css as s.
import s from './normalize.css'
import s from './styles.css'
// import global css as gs
import gs from './../../styles/grid.css'
import Ship from '../../components/Ship/Ship'

class CarSpot extends Component {
  render() {
    const left = `${this.props.left}px`
    const top = `${this.props.top}px`
    const theClass = (this.props.isFree)? s.spotFree : s.spotTaken
    return (
        <div>
          <center><h4><strong>What is the state of <a>Apple Inc.</a> today?</strong></h4></center>
         
          <p>As of <a><span id="time">{this.props.timing}</span></a>, 
          Apple is doing <a><span id="health">{this.props.doing}</span></a>. 
          APPL Stocks are currently worth <a><span id="stockvalue">{this.props.LastTrade}</span></a>.
          Stocks have <a><span id="stockchange">{this.props.stockChange}</span></a> by <a>{this.props.change} </a>
          since the latest news article about Apple titled <a><span id="articletitle">{this.props.articleList[0].title}</span></a>.</p>
        </div>
        // <div>
        //   <div className={theClass} style={{left: left, top: top}}>
        //     <div style={{left: '50px', top: '300px'}} className={s.label}>{this.props.price}</div>
        //     <div style={{left: '50px', top: '450px'}} className={s.timeLabel}>{this.props.chargeTime}</div>
        //   </div>
        // </div>
      )
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {state: 
      { time: '', ask: '', bid: '', change: '', changeinPercent: '', LastTradePriceOnly: '', articles: [{title: "NA"}]}
    }
  }

  componentDidMount() {
    const _this = this
    setInterval(() => {
      _this.updateState()
    }, 5000)
  }

  updateState() {
    let _this = this
    fetch('http://localhost:9000')
    .then(res => res.json())
    .then(json => {
      // const state = [
      //   {available: true, price: 1},
      //   {available: false, price: 2},
      // ]
      console.log(json)
      const parsed = JSON.parse(json)
      // const state = R.map(value => {
      //   return {
          // time: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['time'],
          // ask: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Ask'],
          // bid: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Bid'],
          // change: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Change'], 
          // changeinPercent: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['ChangeinPercent'],
          // LastTradePriceOnly: value['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['LastTradePriceOnly'],
          // articles: value['QmergwJPmTCEnUyR4gLrjzfKgeBixUbemqoFC78k6sbEZq']['apple']
      //   }
      // }, R.values(parsed))
      debugger
      const state = {
          time: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['time'],
          ask: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Ask'],
          bid: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Bid'],
          change: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['Change'], 
          changeinPercent: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['ChangeinPercent'],
          LastTradePriceOnly: parsed['QmcWzGjo1Zu4yE9NtzBKXNJgEFcVWvgz1ipxtAhwWrvxX5']['apple']['LastTradePriceOnly'],
          articles: parsed['QmergwJPmTCEnUyR4gLrjzfKgeBixUbemqoFC78k6sbEZq']['apple']
      }

      _this.setState({state})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const doing = (this.state.state.changeinPercent.includes('-')) ? 'poorly' : 'well'
    const stockchange = (this.state.state.changeinPercent.includes('+')) ? 'increased' : 'decreased'
    // const price0 = (this.state.state.price)? `$${this.state.state.price}` : ''
    // const price1 = (this.state.state[1].price)? `$${this.state.state[1].price}` : ''
    // const chargeTime0 = (this.state.state.timeCharging)? `Been charging for ${this.state.state.timeCharging.substring(0,6)} minutes` : ''
    // const chargeTime1 = (this.state.state[1].timeCharging)? `Been charging for ${this.state.state[1].timeCharging.substring(0,6)} minutes` : ''
    return (
      <div>
        <CarSpot doing={doing} stockChange={stockchange} timing={this.state.state.time} left="100" top="100" ask={this.state.state.ask} bid={this.state.state.bid} change={this.state.state.change} changePercent={this.state.state.changeinPercent} LastTrade={this.state.state.LastTradePriceOnly} articleList={this.state.state.articles}/>
      </div>
    )
  }
}



export default HomePage
