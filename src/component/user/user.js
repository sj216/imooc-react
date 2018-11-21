import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';

@connect(
  state => state.user,
)
class User extends React.Component {
  logout() {
    const alert = Modal.alert;
    alert('注销', '确认退出登陆吗？', [
      {
        text: '取消', onPress: () => {
          return false;
        }, style: 'default'
      },
      {
        text: '确定', onPress: () => {
          browserCookie.erase('userid');
          window.location.href = window.location.href;
        }
      },
    ]);
  };

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
          title={this.props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List
          renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map((v) => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief>{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={() => this.logout()}>退出登陆</Item>
        </List>
      </div>
    ) : null
  }
}
;

export default User;