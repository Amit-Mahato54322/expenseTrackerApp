import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  storeDataAction,
  getDataAction,
} from "../actionCreators/databaseActions";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";


function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.database.docs);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (user) {
      dispatch(getDataAction(user.uid));
    } else {
      console.log("rip");
    }
  }, [user]);

  useEffect(() => {
    setExpense(0);
    setIncome(0);
    if (docs) {
      const amounts = docs.map((doc) => parseInt(doc.amount));
      setTotal(amounts.reduce((acc, item) => (acc += item), 0).toFixed(2));
      setIncome(
        amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0)
      );
      setExpense(
        amounts
          .filter((item) => item < 0)
          .reduce((acc, item) => acc + item, 0) * -(1).toFixed(2)
      );
    }
  }, [docs]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  if (isFetching)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
      </div>
    );
  if (user == null) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(storeDataAction({ userId: user.uid, name, amount }));
    setName("");
    setAmount("");
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      id="dashboard"
      className="container lg:px-6 max-w-full grid lg:grid-cols-3 gap-6 overflow-y-auto lg:overflow-hidden bg-gray-50 pb-6"
    >
      <div
        id="left"
        className="container flex lg:py-5 mx-auto w-full flex-col justify-between items-center gap-6"
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7, type: "tween" }}
          id="info"
          className="container bg-white p-8 lg:w-3/4 w-full rounded-xl shadow-lg font-Nunito flex flex-col"
        >
          <div
            id="total-balance"
            className="mb-6 bg-gradient-to-r from-primary to-indigo-500 p-4 rounded-lg text-white"
          >
            <h2 className="text-3xl font-bold">${total}</h2>
            <p className="text-white opacity-80 text-sm">Total Balance</p>
          </div>
          <div
            id="top-info"
            className="flex justify-between max-w-full items-center"
          >
            <div className="flex flex-col bg-green-50 rounded-lg p-4 w-full mr-2">
              <h1 className="font-semibold text-lg uppercase text-gray-700">Income</h1>
              <p className="text-green-500 font-bold text-2xl">${income}</p>
            </div>
            <div className="flex flex-col bg-red-50 rounded-lg p-4 w-full ml-2">
              <h1 className="font-semibold text-lg uppercase text-gray-700">Expense</h1>
              <p className="text-red-500 font-bold text-2xl">${expense}</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7, type: "tween" }}
          id="add-transaction"
          className="lg:w-3/4 w-full lg:mb-0 mb-8 bg-white p-8 rounded-xl border-0 shadow-lg"
        >
          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            <div>
              <h1 className="font-Nunito font-bold text-2xl mb-4 text-gray-800">
                New Transaction
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    autoComplete="off"
                    required
                    placeholder="Transaction name"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount (use "<span className="font-bold text-black">-</span>"
                for expenses)
              </label>
              <div className="mt-1">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="text"
                  id="amount"
                  autoComplete="off"
                  required
                  placeholder="100 or -100"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border-0 shadow-lg bg-primary hover:bg-indigo-600 font-Roboto font-medium text-white text-center text-lg rounded-lg focus:outline-none transition-all duration-200 hover:scale-[1.02]"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7, type: "tween" }}
        id="right"
        className="lg:col-span-2 container bg-white flex flex-col justify-start lg:py-6 lg:px-8 px-4 py-6 shadow-lg mx-auto items-stretch w-full rounded-xl"
      >
        <div>
          <h1 className="font-Nunito font-bold text-3xl mb-4 flex items-center">
            <span className="mr-2">Transaction History</span>
            <span role="img" aria-label="eyes">👀</span>
          </h1>
          
          {docs && docs.length > 0 ? (
            docs.map((doc) => (
              <Card
                key={doc.id}
                id={doc.id}
                expenseName={doc.expenseName}
                amount={doc.amount}
                date={doc.date}
                setExpense={setExpense}
                setIncome={setIncome}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">
              No transactions yet. Add your first one!
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
