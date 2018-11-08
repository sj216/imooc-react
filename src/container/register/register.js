import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '', // 用户
      pwd: '', // 密码
      repeatpwd: '', // 确认密码
      type: 'genius', //牛人或者boss
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            onChange={v => this.handleChange('pwd', v)}
            type="password"
          >密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            onChange={v => this.handleChange('repeatpwd', v)}
            type="password"
          >确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            onChange={() => this.handleChange('type', 'genius')}
            checked={this.state.type == 'genius'}>
            牛人
          </RadioItem>
          <RadioItem
            onChange={() => this.handleChange('type', 'boss')}
            checked={this.state.type == 'boss'}>
            Boss
          </RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register;