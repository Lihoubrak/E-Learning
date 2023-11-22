import React, { useEffect, useRef, useState } from "react";
import { QuizInfo, QuizQuestions, SubjectDetail } from "../../components";
import { IoIosArrowBack } from "react-icons/io";
import clock from "../../assets/images/clock.png";
import { AiOutlinePrinter } from "react-icons/ai";
import useScroll from "../../../hook/useScroll";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../RequestMethod/Request";

const SCROLL_THRESHOLD = 82;
const SCROLL_OFFSET = 150;

const Quiz = () => {
  const scrollY = useScroll();
  const { exam } = useParams();
  const questionRefs = useRef([]);
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (exam) {
          const response = await publicRequest.get(`/exams/${exam}`);
          setQuiz(response.data);
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [exam]);

  const scrollToQuestion = (questionNumber) => {
    const questionRef = questionRefs.current[questionNumber - 1];
    const offsetTop = questionRef.offsetTop;

    window.scrollTo({
      top: offsetTop - SCROLL_OFFSET,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const onAnswerChange = async (questionIndex, optionIndex) => {
    const questionId = quiz?.exam.Quiz.Questions[questionIndex].question_id;
    const optionId =
      quiz?.exam.Quiz.Questions[questionIndex].QuizOptions[optionIndex]
        .quizoption_id;
    const updatedAnswers = [...selectedAnswers];
    console.log(updatedAnswers);
    updatedAnswers[questionIndex] = {
      questionId,
      optionId,
    };
    setSelectedAnswers(updatedAnswers);
  };
  const submitAnswers = async () => {
    try {
      // Ensure that the quiz and question data exist
      if (!quiz || !quiz.exam || !quiz.exam.Quiz) {
        console.error("Quiz data is missing or invalid.");
        return;
      }

      // Prepare the data for submission
      const answersToSubmit = selectedAnswers.map((selectedAnswer, index) => {
        const questionId = quiz?.exam.Quiz.Questions[index]?.question_id;
        const optionId = selectedAnswer?.optionId;

        if (!questionId || !optionId) {
          console.error("Question or option data is missing or invalid.");
          return null;
        }

        return {
          quiz_user_question: questionId,
          quiz_user_option: optionId,
          quiz_user: "4e74e025-4492-4a1d-b490-da7e9f1796d7",
        };
      });

      // Remove any null values (invalid questions or options)
      const validAnswers = answersToSubmit.filter((answer) => answer !== null);

      // Submit all valid answers
      const responses = await Promise.all(
        validAnswers.map((answer) => publicRequest.post("/quizanswers", answer))
      );
      //     const totalScore = responses
      //       .map((response) => response.data)
      //       .reduce((acc, score) => parseInt(acc) + parseInt(score), 0);
      // console.log(totalScore);
      //     setScore(totalScore);
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  return (
    <SubjectDetail
      scrollY={scrollY <= SCROLL_THRESHOLD}
      quiz={true}
      examTime={quiz?.exam.ex_dutation}
      submitAnswers={submitAnswers}
    >
      <div className="mt-44">
        <div className="flex justify-around gap-1 ">
          <div className="w-[15%] px-4 rounded-md relative">
            <div className="flex items-center bg-[#2a70b8] rounded-lg p-2 text-white cursor-pointer fixed">
              <AiOutlinePrinter className="mr-2" size={25} />
              <span className="font-bold">Tải đề + đáp án</span>
            </div>
          </div>

          <div className="flex-1 bg-white border px-6 py-4 rounded-md">
            <div className="text-center">
              <h1 className="text-blue-700 text-2xl font-bold mb-4">
                {quiz?.exam.ex_title || "No Title"}
              </h1>
              <h2 className="text-gray-500 text-lg mb-2">
                {quiz?.exam.ex_description || "No Description"}
              </h2>
              <div className="border-b-2 border-white mb-4"></div>
              <p className="text-white mb-4">Ngữ văn</p>
            </div>
            <QuizQuestions
              questionsData={quiz?.exam.Quiz}
              questionRefs={questionRefs}
              onAnswerChange={onAnswerChange}
            />
          </div>

          <div className="w-1/5 relative px-4">
            <div className="fixed border bg-white shadow-md rounded-md px-11">
              <h1 className="font-bold text-blue-500 text-lg mb-4 text-center py-2 underline">
                Tổng số câu hỏi: {quiz?.count}
              </h1>
              <div className="grid grid-cols-5 gap-2 cursor-pointer">
                {quiz?.exam?.Quiz.Questions.map((_, index) => (
                  <div
                    key={index + 1}
                    className="text-center font-bold text-gray-900 border p-3 rounded-lg"
                    onClick={() => scrollToQuestion(index + 1)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 bg-[#e1e1e1] p-2 rounded-b-md">
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
