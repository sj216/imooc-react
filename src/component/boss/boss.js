import React from 'react';
import axios from 'axios';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class Boss extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    axios.get('/user/list?type=genius').then((res) => {
      if (res.data.code === 0) {
        this.setState({data: res.data.data})
      }
    })
  }
  render() {
    console.log(this.state)
    return (
      <WingBlank>
      </WingBlank>
    )
  }
}

export default Boss;