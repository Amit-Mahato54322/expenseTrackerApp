import { firestore } from "../config/firebaseConfig";
import { collection, doc, addDoc, onSnapshot, query, orderBy, deleteDoc } from "firebase/firestore";

export const storeDataAction = (data) => {
  return (dispatch) => {
    const userExpensesCollection = collection(doc(collection(firestore, "users"), data.userId), "expenses");
    
    addDoc(userExpensesCollection, {
      amount: data.amount,
      date: new Date(),
      expenseName: data.name,
    })
    .then((docRef) => {
      dispatch({ type: "STORE_DATA", res: docRef });
    })
    .catch((err) => {
      dispatch({ type: "STORE_ERROR", err });
    });
  };
};

export const getDataAction = (userId) => {
  return (dispatch) => {
    const userExpensesCollection = collection(doc(collection(firestore, "users"), userId), "expenses");
    const expensesQuery = query(userExpensesCollection, orderBy("date", "desc"));
    
    onSnapshot(expensesQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      dispatch({ type: "GOT_DATA", data });
    });
  };
};

export const deleteCardAction = (docId) => {
  return (dispatch, getState) => {
    const userId = getState().auth.user.uid;
    const expenseDocRef = doc(collection(doc(collection(firestore, "users"), userId), "expenses"), docId);
    
    deleteDoc(expenseDocRef)
      .then(() => {
        dispatch({ type: "DELETE_DOC", docId });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
