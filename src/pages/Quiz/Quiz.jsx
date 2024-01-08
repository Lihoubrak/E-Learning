import React, { useEffect, useRef, useState } from "react";
import { QuizInfo, QuizQuestions, SubjectDetail } from "../../components";
import { AiOutlinePrinter } from "react-icons/ai";
import useScroll from "../../../hook/useScroll";
import { useParams } from "react-router-dom";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import ReactToPrint from "react-to-print";

const SCROLL_THRESHOLD = 82;
const SCROLL_OFFSET = 150;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} phút ${remainingSeconds} giây`;
};

const Quiz = () => {
  const { quizId } = useParams();
  const scrollY = useScroll();
  const questionRefs = useRef([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState([]);
  const componentRef = useRef(null);
  const [isQuizPaused, setIsQuizPaused] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quizId) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await publicRequest.get(`/quizs/${quizId}`);
          setQuiz(response.data);
          setRemainingTime(response.data.quizDuration * 60 || 0);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!answersSubmitted && !isQuizPaused) {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);

    // Clear the interval when answers are submitted or quiz is paused
    return () => clearInterval(intervalId);
  }, [answersSubmitted, isQuizPaused]);

  const scrollToQuestion = (questionNumber) => {
    const questionRef = questionRefs.current[questionNumber - 1];
    const offsetTop = questionRef.offsetTop;

    window.scrollTo({
      top: offsetTop - SCROLL_OFFSET,
      behavior: "smooth",
    });
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const questionId = quiz?.questions[questionIndex]?.id;
    const optionId =
      quiz?.questions[questionIndex]?.questionOptions[optionIndex]?.id;

    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = { questionId, optionId };
      console.log("Updated Answers:", updatedAnswers);
      return updatedAnswers;
    });
  };

  const submitAnswers = async () => {
    try {
      if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        console.error("Quiz data is missing or invalid.");
        return;
      }

      const answersToSubmit = selectedAnswers.map((selectedAnswer, index) => {
        const question = quiz.questions[index];
        const optionId = selectedAnswer?.optionId;

        if (!question || !optionId) {
          console.error("Question or option data is missing or invalid.");
          return null;
        }

        const selectedOption = question.questionOptions.find(
          (option) => option.id === optionId
        );

        return {
          userResponse: optionId.toString(),
          questionOptionId: optionId,
          isCorrect: selectedOption?.isCorrect,
          questionPoint: selectedOption?.isCorrect ? question.questionPoint : 0,
        };
      });

      const validAnswers = answersToSubmit.filter((answer) => answer !== null);
      const responses = await Promise.all(
        validAnswers.map((answer) =>
          TokenRequest.post("/useranswers/create", answer)
        )
      );
      const totalMarks = validAnswers.reduce(
        (total, answer) => total + answer.questionPoint,
        0
      );

      const numCorrectAnswers = validAnswers.reduce(
        (total, answer) => total + (answer.isCorrect ? 1 : 0),
        0
      );
      setCorrectAnswers(numCorrectAnswers);
      setTotalMarks(totalMarks);
      setAnswersSubmitted(true);

      const isAnswerCorrectArray = validAnswers.map(
        (answer) => answer.isCorrect
      );
      setIsAnswerCorrect(isAnswerCorrectArray);
      setShowCorrectAnswers(true);
    } catch (error) {
      console.error("Error submitting user answers:", error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center absolute w-full h-full">
        <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 border-solid rounded-full"></div>
      </div>
    );
  }
  const handleQuizPaused = async () => {
    try {
      setIsQuizPaused(true);
      // Submit answers when pausing
      await submitAnswers();
    } catch (error) {
      console.error("Error pausing quiz:", error);
    }
  };
  return (
    <SubjectDetail
      scrollY={scrollY <= SCROLL_THRESHOLD}
      quiz={true}
      examTime={formatTime(remainingTime)}
      submitAnswers={submitAnswers}
      setIsQuizPaused={handleQuizPaused}
    >
      <div className="pt-40">
        <div className="flex justify-around gap-1 ">
          <div className="w-[15%] px-4 rounded-md relative">
            <ReactToPrint
              content={() => {
                const content = componentRef.current;
                return content;
              }}
              trigger={() => (
                <div className="flex items-center bg-[#2a70b8] rounded-lg p-2 text-white cursor-pointer fixed">
                  <AiOutlinePrinter className="mr-2" size={25} />
                  <span className="font-bold">Tải đề + đáp án</span>
                </div>
              )}
              pageStyle={`@page {
                size: A4;
                margin: 20mm 10mm;
              }
              @media print {
                body {
                  font-size: 12px;
                  color: #333;
                }
                h1, h2, h3, h4, h5, h6 {
                  color: #000; /* Ensure heading colors are black in print */
                }
                p {
                  margin: 0; /* Remove default margins for paragraphs */
                }
              }`}
            />
          </div>
          <div className="flex-1 bg-white border px-6 py-4 rounded-md">
            {answersSubmitted && (
              <QuizInfo
                correctAnswers={correctAnswers}
                totalMarks={totalMarks}
                totalQuestions={quiz?.questions.length || 0}
                remainingTime={remainingTime}
              />
            )}
            <QuizQuestions
              ref={componentRef}
              questionsData={quiz}
              questionRefs={questionRefs}
              onAnswerChange={handleAnswerChange}
              selectedAnswers={selectedAnswers}
              correctAnswers={correctAnswers}
              showCorrectAnswers={showCorrectAnswers}
              isAnswerCorrect={isAnswerCorrect}
            />
          </div>

          <div className="w-1/5  relative px-4">
            <div className="fixed border bg-white shadow-md rounded-md px-11 min-h-[220px]">
              <h1 className="font-bold text-blue-500 text-lg mb-4 text-center py-2 underline">
                Tổng số câu hỏi:
                {quiz?.questions.reduce((total, question) => total + 1, 0)}
              </h1>
              <div className="grid grid-cols-5 gap-2 cursor-pointer">
                {quiz?.questions.map((_, index) => (
                  <div
                    key={index + 1}
                    className={`flex items-center justify-center font-bold text-gray-900 border p-3 rounded-lg ${
                      showCorrectAnswers && isAnswerCorrect[index]
                        ? "bg-green-300"
                        : isAnswerCorrect[index] === false
                        ? "bg-red-300"
                        : ""
                    }`}
                    onClick={() => scrollToQuestion(index + 1)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 bg-[#e1e1e1] p-2 rounded-b-md ">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-blue-800 rounded-full mr-2"></div>
                  <span className="text-green-500">Đúng</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-red-500">Sai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubjectDetail>
  );
};

export default Quiz;
