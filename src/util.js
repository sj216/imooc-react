export function getRedirectPath({type, avatar}) {
  // 根据用户信息跳转地址
  // 1.user.type    boss/genius
  // 2.user.avatar    /bossinfo/geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info'
  }
  return url;
}