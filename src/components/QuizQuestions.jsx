import React from "react";

const QuizQuestions = ({ questionsData, questionRefs, onAnswerChange }) => {
  return (
    <div className="p-4 rounded-md">
      <div>
        <h1 className="font-bold text-lg mb-4">{questionsData?.quiz_title}</h1>
        {questionsData?.Questions.map((quest, index) => (
          <div
            className="mb-4"
            key={index}
            ref={(ref) => (questionRefs.current[index] = ref)}
          >
            <h2 className="text-lg font-bold mb-2">
              Question {index + 1}: {quest.question}
            </h2>
            <div>
              {quest.QuizOptions.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`q${index + 1}_option${optionIndex + 1}`}
                    name={`q${index + 1}`}
                    className="mr-2"
                    onChange={() => onAnswerChange(index, optionIndex)}
                  />
                  <label
                    htmlFor={`q${index + 1}_option${optionIndex + 1}`}
                    className="max-w-xs break-words"
                  >
                    {option.quizoption_text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestions;
