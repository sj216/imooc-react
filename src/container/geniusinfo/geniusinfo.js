import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {(redirect && redirect!==path)? <Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imagename) => {
            this.setState({
              'avatar': imagename,
            })
          }}
        />
        <InputItem
          onChange={(v) => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          rows="3"
          autoHeight="true"
          title="个人简介"
          onChange={(v) => {
            this.onChange('desc', v)
          }}>
        </TextareaItem>
        <Button
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary">保存</Button>
      </div>
    )
  }
}

export default GeniusInfo;