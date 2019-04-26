interface User {
  name: string;
}

class Service {
  checkAuth(): Promise<boolean> {
    console.log("check auth...");
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), 2000)
    );
  }

  getUser(): Promise<User> {
    console.log("get user...");
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({name: 'Max'}), 2000)
    );
  }
}

const promisesSrv = new Service();

promisesSrv
  .checkAuth()
  .then(auth => {
    if (auth) {
      return promisesSrv.getUser();
    } else {
      return Promise.reject('Unexpected error');
    }
  })
  .then(user => {
    console.log(user.name);
  })
  .catch(reason => console.log(reason));

// const runAsync = async () => {
//   try {
//     const auth = await promisesSrv.checkAuth();
//     if (auth) {
//       const user = await promisesSrv.getUser();
//       console.log(user.name);
//     } else {
//       console.log('Unexpected error.');
//     }
//   } catch(reason) {
//     console.log(reason);
//   }
// };
// runAsync();
