import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, ProgressBar, Alert } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import * as client from "./client";
import { setQuiz } from "./reducer";
import "./preview.css";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<any>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState({ points: 0, total: 0 });

    const { quiz } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (currentUser && currentUser.role !== "FACULTY") {
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        }
    }, [currentUser]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            if (qid) {
                const data = await client.findQuizById(qid);
                dispatch(setQuiz(data));
            }
        } catch (error) {
            console.error("Failed to fetch quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        let points = 0;
        const total = quiz.questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

        quiz.questions.forEach((question: any) => {
            const userAnswer = userAnswers[question._id];
            if (!userAnswer) return;

            let isCorrect = false;

            switch (question.questionType) {
                case "MULTIPLE_CHOICE":
                case "TRUE_FALSE":
                    const correctAnswer = question.answers.find((a: any) => a.isCorrect);
                    if (correctAnswer && userAnswer === correctAnswer.text) {
                        isCorrect = true;
                    }
                    break;

                case "FILL_IN_BLANK":
                    const correctAnswers = question.answers.map((a: any) => a.text.toLowerCase());
                    if (correctAnswers.includes(userAnswer.toLowerCase())) {
                        isCorrect = true;
                    }
                    break;
            }

            if (isCorrect) {
                points += question.points || 0;
            }
        });

        setScore({ points, total });
        setQuizSubmitted(true);
    };

    const handleExitPreview = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    if (!quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="p-4">
                <Alert variant="warning">
                    <h5>No Questions</h5>
                    <p>This quiz doesn't have any questions yet. Please add questions before previewing.</p>
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
                    >
                        Edit Quiz
                    </Button>
                </Alert>
            </div>
        );
    }

    if (quizSubmitted) {
        return (
            <div className="p-4">
                <Card>
                    <Card.Header className="bg-primary text-white">
                        <h4>Quiz Preview Results</h4>
                    </Card.Header>
                    <Card.Body>
                        <h5 className="mb-4">Your Score: {score.points} / {score.total} points</h5>

                        {quiz.questions.map((question: any, index: number) => {
                            const userAnswer = userAnswers[question._id];
                            let isCorrect = false;
                            let correctAnswerText = "";

                            switch (question.questionType) {
                                case "MULTIPLE_CHOICE":
                                case "TRUE_FALSE":
                                    const correctAnswer = question.answers.find((a: any) => a.isCorrect);
                                    correctAnswerText = correctAnswer?.text || "";
                                    if (correctAnswer && userAnswer === correctAnswer.text) {
                                        isCorrect = true;
                                    }
                                    break;

                                case "FILL_IN_BLANK":
                                    const correctAnswers = question.answers.map((a: any) => a.text);
                                    correctAnswerText = correctAnswers.join(" or ");
                                    if (correctAnswers.map((a: string) => a.toLowerCase()).includes(userAnswer?.toLowerCase())) {
                                        isCorrect = true;
                                    }
                                    break;
                            }

                            return (
                                <Card key={question._id} className={`mb-3 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                                    <Card.Header className={isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}>
                                        <div className="d-flex justify-content-between">
                                            <span>Question {index + 1}</span>
                                            <span>{isCorrect ? 'Correct' : 'Incorrect'} ({question.points} pts)</span>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="mb-3">{question.question}</p>

                                        <div className="user-answer mb-2">
                                            <strong>Your Answer:</strong> {userAnswer || "Not answered"}
                                        </div>

                                        {!isCorrect && (
                                            <div className="correct-answer">
                                                <strong>Correct Answer:</strong> {correctAnswerText}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            );
                        })}

                        <div className="d-flex justify-content-center mt-4">
                            <Button variant="primary" onClick={handleExitPreview}>
                                Exit Preview
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="p-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Quiz Preview: {quiz.title}</h4>
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={handleExitPreview}
                        >
                            Exit Preview
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="mb-4">
                        <span className="text-muted">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                        <ProgressBar
                            now={(currentQuestionIndex + 1) / quiz.questions.length * 100}
                            className="mt-2"
                        />
                    </div>

                    <div className="question-display">
                        <h5>
                            {currentQuestion.title ? currentQuestion.title : `Question ${currentQuestionIndex + 1}`}
                            <span className="text-muted ms-2">({currentQuestion.points} pts)</span>
                        </h5>

                        <p className="my-4">{currentQuestion.question}</p>

                        {currentQuestion.questionType === "MULTIPLE_CHOICE" && (
                            <Form>
                                {currentQuestion.answers.map((answer: any, index: number) => (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        id={`answer-${index}`}
                                        label={answer.text}
                                        name="answer"
                                        checked={userAnswers[currentQuestion._id] === answer.text}
                                        onChange={() => handleAnswerChange(currentQuestion._id, answer.text)}
                                        className="mb-2"
                                    />
                                ))}
                            </Form>
                        )}

                        {currentQuestion.questionType === "TRUE_FALSE" && (
                            <Form>
                                <Form.Check
                                    type="radio"
                                    id="answer-true"
                                    label="True"
                                    name="answer"
                                    checked={userAnswers[currentQuestion._id] === "True"}
                                    onChange={() => handleAnswerChange(currentQuestion._id, "True")}
                                    className="mb-2"
                                />
                                <Form.Check
                                    type="radio"
                                    id="answer-false"
                                    label="False"
                                    name="answer"
                                    checked={userAnswers[currentQuestion._id] === "False"}
                                    onChange={() => handleAnswerChange(currentQuestion._id, "False")}
                                />
                            </Form>
                        )}

                        {currentQuestion.questionType === "FILL_IN_BLANK" && (
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Your answer"
                                    value={userAnswers[currentQuestion._id] || ""}
                                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                />
                            </Form.Group>
                        )}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <Button
                            variant="secondary"
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            <FaArrowLeft className="me-2" /> Previous
                        </Button>

                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <Button
                                variant="primary"
                                onClick={handleNextQuestion}
                            >
                                Next <FaArrowRight className="ms-2" />
                            </Button>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSubmitQuiz}
                            >
                                Submit Quiz <FaCheck className="ms-2" />
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
