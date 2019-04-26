import { timer, Observable } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';

interface User {
  name: string;
}

class Observables {
  checkAuth() {
    console.log("check auth...");
    return timer(2000).pipe(
      map(() => true)
    );
  }

  getUser(): Observable<User> {
    console.log("get user...");
    return timer(2000).pipe(
      map(() => { return { name: "Max" }; })
    );
  }
}

const srv = new Observables();
srv.checkAuth().pipe(
  filter(auth => auth),
  switchMap(() => srv.getUser()),
  tap(user => console.log(user.name))
).subscribe();
