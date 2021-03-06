// 中间件
const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {pwd: 0, __v: 0}

Router.get('/list', function (req, res) {
  // 获取参数type
  const {type} = req.query;
  // User.remove({}, function (e, d) {})
  User.find({type}, function (err, doc) {
    return res.json({code: 0, data: doc})
  })
});

Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.user
  // '$or': [{from: user, to: user}]
  Chat.find({}, function (err, doc) {
    if (!err) {
      return res.json({code: 0, msgs: doc})
    }
  })
})

Router.post('/update', function (req, res) {
  // 先获取一下cookie
  const userid = req.cookies.userid
  if (!userid) {
    return res.json.dumps({code: 1})
  }
  const body = req.body;
  // 两个过程一个是查找id是否存在
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type,
    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body;
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc})
  })
});

Router.post('/register', function (req, res) {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  User.findOne({user: user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d;
      res.cookie('userid', _id);
      return res.json({code: 0, data: {user, type, _id}})
    });
  })
});

Router.get('/info', function (req, res) {
  const {userid} = req.cookies;
  if (!userid) {
    // 用户有没有cookie校验
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了！'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
});

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_24234fsdsfsd!!!@$@#$#@$';
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router;