import React from 'react';
import {connect} from 'react-redux';
import {Result} from 'antd-mobile'

@connect(
  state => state.user,
)
class User extends React.Component {
  render() {
    const props = this.props;
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}}/>}
          title={this.props.user}
          message={props.type === 'boss'? props.company: null}
        />
      </div>
    ) : null
  }
};

export default User;