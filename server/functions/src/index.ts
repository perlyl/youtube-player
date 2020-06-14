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
      .then((users: any) => {
        if (users._size === 0) {
          response.status(401).send({ message: "Unauthorized" });
        }
        let user;
        users.forEach((doc: any) => {
          user = doc.data();
          user['userId'] = doc.id;
          console.log("user", user)
        })
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
    const queryParams = request.body
    let query = db.collection("actions");
    queryParams.forEach((q:any) => {
      query = query.where(q.key, q.operator, q.value)
    });
    query.get()
      .then(() => {
        response.status(200).send({})
      })
      .catch((err: any) => {
        response.status(500).send({ message: err });
      })
  })
});
