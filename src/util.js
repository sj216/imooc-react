export function getRedirectPath(data) {
  // 根据用户信息跳转地址
  // 1.user.type    boss/genius
  // 2.user.avatar    /bossinfo/geniusinfo
  const {type, avatar} = data.data;
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info'
  }
  return url;
}