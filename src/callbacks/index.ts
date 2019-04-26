class Callbacks {
  checkAuth(cb) {
    console.log('check auth...');
    setTimeout(() => {
      cb(true)
    }, 2000)
  }

  getUser(cb) {
    console.log('get user...');
    setTimeout(() => {
      cb({ name: 'Max' })
    }, 2000)
  }
}

const callbacksSrv = new Callbacks();
callbacksSrv.checkAuth(auth => {
  if (auth) {
    callbacksSrv.getUser(user => {
      console.log(user.name)
    })
  }
})

