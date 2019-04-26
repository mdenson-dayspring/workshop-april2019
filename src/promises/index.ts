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
    }
  })
  .then(user => {
    console.log(user.name);
  });

// const runAsync = async () => {
//   const auth = await promisesSrv.checkAuth();
//   if (auth) {
//     const user = await promisesSrv.getUser();
//     console.log(user.name);
//   }
// };
// runAsync();
