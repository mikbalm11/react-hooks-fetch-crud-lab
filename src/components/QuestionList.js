import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(questions => setQuestionsArray(questions));
  },  []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questionsArray.filter((question) => question.id !== id);
        setQuestionsArray(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questionsArray.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestionsArray(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsArray.map(question =>
        <QuestionItem
          key={question.id}
          question={question}
          onDelete={handleDeleteClick}
          onAnswer={handleAnswerChange}
        />)}
      </ul>
    </section>
  );
}

export default QuestionList;
