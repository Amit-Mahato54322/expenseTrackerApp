import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteCardAction } from "../actionCreators/databaseActions";
import { motion } from "framer-motion";

function Card({ id, amount, expenseName, date }) {
  const dispatch = useDispatch();
  const isExpense = amount[0] === "-";

  const handleDelete = () => {
    dispatch(deleteCardAction(id));
  };
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween", delay: 0.2 }}
      id="card"
      className={`flex w-full mb-3 justify-between items-center p-4 font-Nunito rounded-lg border-l-4 hover:shadow-md transition-all duration-300 ${
        isExpense ? "border-l-red-500 bg-red-50" : "border-l-green-500 bg-green-50"
      }`}
    >
      <div className="flex flex-col justify-evenly items-start">
        <h1 className="font-semibold text-lg text-gray-800">{expenseName}</h1>
        <p className="font-medium text-sm text-gray-500">
          {moment(date.toDate()).calendar()}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className={`font-Nunito font-bold text-lg ${
          isExpense ? "text-red-600" : "text-green-600"
        } mr-3 flex items-center`}>
          <span className="mr-1">{isExpense ? "-" : "+"}</span>
          <span>${Math.abs(amount)}</span>
        </div>
        <button
          onClick={handleDelete}
          className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Delete transaction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 hover:text-red-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default Card;
