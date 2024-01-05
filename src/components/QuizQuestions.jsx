import React, { forwardRef } from "react";

const QuizQuestions = forwardRef(
  (
    {
      questionsData,
      questionRefs,
      onAnswerChange,
      selectedAnswers,
      correctAnswers,
      showCorrectAnswers,
      isAnswerCorrect,
    },
    ref
  ) => {
    const printQuestionsAndAnswers = () => {
      return (
        <div>
          {questionsData?.questions?.map((quest, index) => (
            <div
              key={index}
              className={`mb-4 ${
                showCorrectAnswers && isAnswerCorrect[index] !== undefined
              }`}
            >
              <h2 className="text-lg font-bold mb-2 text-gray-600">
                Q {index + 1}: {quest.questionText}
              </h2>
              <p>
                Correct Answer:{" "}
                {quest.questionOptions.find((option) => option.isCorrect)
                  ?.questionOptionText || "No correct answer"}
              </p>
            </div>
          ))}
        </div>
      );
    };
    return (
      <div className="p-4 rounded-md" ref={ref}>
        <div className="text-center mb-10">
          <h1 className="text-blue-700 text-2xl font-bold mb-4">
            {questionsData?.quizName || "No Title"}
          </h1>
          <h2 className="text-gray-500 text-lg ">
            {questionsData?.ex_description || "No Description"}
          </h2>
        </div>
        <div>
          {questionsData?.questions?.map((quest, index) => (
            <div
              className={`mb-4 ${
                showCorrectAnswers && isAnswerCorrect[index] !== undefined
                  ? isAnswerCorrect[index]
                    ? "bg-green-100" // Correct Answer
                    : "bg-red-100" // Incorrect Answer
                  : ""
              }`}
              key={index}
              ref={(element) => (questionRefs.current[index] = element)}
            >
              <h2 className="text-lg font-bold mb-2 text-gray-600">
                Q {index + 1}: {quest.questionText}
              </h2>
              <div>
                {quest.questionOptions?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`q${index + 1}_option${optionIndex + 1}`}
                      name={`q${index + 1}`}
                      className="mr-2"
                      onChange={() => onAnswerChange(index, optionIndex)}
                      disabled={showCorrectAnswers}
                    />
                    <label
                      htmlFor={`q${index + 1}_option${optionIndex + 1}`}
                      className={`max-w-xs break-words ${
                        showCorrectAnswers &&
                        isAnswerCorrect[index] !== undefined &&
                        optionIndex === correctAnswers[index]
                          ? "text-green-500 font-semibold"
                          : selectedAnswers &&
                            correctAnswers &&
                            selectedAnswers[index] === optionIndex
                          ? selectedAnswers[index] === correctAnswers[index]
                            ? "text-green-500 font-semibold"
                            : "text-red-500 font-semibold"
                          : ""
                      }`}
                    >
                      {option.questionOptionText}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>{printQuestionsAndAnswers()}</div>
      </div>
    );
  }
);

export default QuizQuestions;
