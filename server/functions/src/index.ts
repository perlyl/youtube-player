import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
admin.firestore()._timestampsInSnapshotsEnabled = true;
const db = admin.firestore();

export const login = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    console.log(request.query)
    const userName = request.query.userName;
    const password = request.query.password;
    db.collection("users")
      .where("userName", "==", userName)
      .where("password", "==", password)
      .get()
      .then((usersRes: any) => {
        if (usersRes._size === 0) {
          response.status(401).send({ message: "Unauthorized" });
        }
        console.log("usersRes",usersRes)
        let user = usersRes._docs()[0].data();
        user['userId'] =  usersRes._docs()[0].id;
        console.log("user", user)
        response.status(200).send(user)
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});

export const register = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const newUserDetails = request.body
    db.collection("users").add(newUserDetails)
      .then((res: any) => {
        console.log("res", res)
        newUserDetails['userId'] = res.id
        console.log("newUserDetails", newUserDetails)
        response.status(200).send(newUserDetails)
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});

export const addActionLog = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    let actionDetails = request.body
    actionDetails["date"] = new Date()
    db.collection("actions").add(actionDetails)
      .then(() => {
        response.status(200).send({})
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});

export const getActionsLog = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // const queryParams = request.query.userId
    // let query = db.collection("actions");
    // queryParams.conditions.forEach((q:any) => {
    //   query = query.where(q.key, q.operator, q.value)
    // });
    db.collection("actions").get()
      .then((actionsRes:any) => {
        let actions:any[] = [];
        actionsRes.forEach((doc: any) => {
          let action = doc.data();
          action['actionId'] = doc.id;
          actions.push(action)
        })
        response.status(200).send(actions)
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});

export const getUsers = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    db.collection("users").get()
      .then((usersRes:any) => {
        let users:any[] = [];
        usersRes.forEach((doc: any) => {
          let user = doc.data();
          user['userId'] = doc.id;
          console.log("user", user)
          users.push(user)
        })
        response.status(200).send(users)
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});
