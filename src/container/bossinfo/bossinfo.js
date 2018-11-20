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
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
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
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <div style={{marginTop: 45}}/>
        <AvatarSelector
          selectAvatar={(imagename) => {
            this.setState({
              'avatar': imagename,
            })
          }}
        />
        <InputItem
          onChange={(v) => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem
          onChange={(v) => {
            this.onChange('company', v)
          }}>
          公司名称
        </InputItem>
        <InputItem
          onChange={(v) => {
            this.onChange('money', v)
          }}>
          职位薪资
        </InputItem>
        <TextareaItem
          rows="3"
          autoHeight="true"
          title="职位要求"
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

export default BossInfo;