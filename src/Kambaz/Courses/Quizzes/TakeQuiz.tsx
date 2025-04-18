import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, ProgressBar, Alert, Modal } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaCheck, FaClock } from "react-icons/fa";
import * as client from "./client";
import { setQuiz, setQuizAttempt } from "./reducer";
import "./takeQuiz.css";

export default function TakeQuiz() {
    const { cid, qid, attemptId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<any>({});
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { quiz, quizAttempt } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchQuizAndAttempt = async () => {
        try {
            setLoading(true);
            if (qid && attemptId) {
                const quizData = await client.findQuizById(qid);
                dispatch(setQuiz(quizData));

                const attemptData = await client.findQuizAttemptById(attemptId);
                dispatch(setQuizAttempt(attemptData));

                if (quizData.timeLimit) {
                    const startTime = new Date(attemptData.startedAt).getTime();
                    const endTime = startTime + (quizData.timeLimit * 60 * 1000);
                    const now = Date.now();
                    const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
                    setTimeLeft(remaining);
                }

                const savedAnswers: any = {};
                attemptData.answers.forEach((answer: any) => {
                    savedAnswers[answer.questionId] = answer.answer;
                });
                setUserAnswers(savedAnswers);
            }
        } catch (error) {
            console.error("Failed to fetch quiz or attempt:", error);
            setErrorMessage("Failed to load quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizAndAttempt();
    }, [qid, attemptId]);

    useEffect(() => {
        if (timeLeft === null) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null || prev <= 0) {
                    clearInterval(timer);
                    handleSubmitQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTimeLeft = () => {
        if (timeLeft === null) return "";

        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // 处理答案变更
    const handleAnswerChange = async (questionId: string, answer: any) => {
        try {
            setUserAnswers({
                ...userAnswers,
                [questionId]: answer
            });

            await client.saveQuizAnswer(attemptId || "", questionId, answer);
        } catch (error) {
            console.error("Failed to save answer:", error);
        }
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

    const confirmSubmit = () => {
        setShowConfirmSubmit(true);
    };

    const handleSubmitQuiz = async () => {
        try {
            setShowConfirmSubmit(false);

            for (const questionId in userAnswers) {
                await client.saveQuizAnswer(attemptId || "", questionId, userAnswers[questionId]);
            }

            await client.submitQuizAttempt(attemptId || "");

            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results/${attemptId}`);
        } catch (error) {
            console.error("Failed to submit quiz:", error);
            setErrorMessage("Failed to submit quiz. Please try again.");
        }
    };

    useEffect(() => {
        if (quizAttempt && quizAttempt.completed) {
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results/${attemptId}`);
        }
    }, [quizAttempt]);

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    if (errorMessage) {
        return (
            <div className="p-4">
                <Alert variant="danger">
                    <h5>Error</h5>
                    <p>{errorMessage}</p>
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
                    >
                        Back to Quiz
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="p-4">
                <Alert variant="warning">
                    <h5>No Questions</h5>
                    <p>This quiz doesn't have any questions. Please contact your instructor.</p>
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                    >
                        Back to Quizzes
                    </Button>
                </Alert>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="p-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>{quiz.title}</h4>
                        {timeLeft !== null && (
                            <div className="d-flex align-items-center">
                                <FaClock className="me-2" />
                                <span>{formatTimeLeft()}</span>
                            </div>
                        )}
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
                            disabled={currentQuestionIndex === 0 || quiz.lockQuestionsAfterAnswering}
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
                                onClick={confirmSubmit}
                            >
                                Submit Quiz <FaCheck className="ms-2" />
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* 提交确认对话框 */}
            <Modal show={showConfirmSubmit} onHide={() => setShowConfirmSubmit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to submit this quiz? You cannot change your answers after submission.</p>

                    {Object.keys(userAnswers).length < quiz.questions.length && (
                        <Alert variant="warning">
                            <p className="mb-0">You have not answered all questions. Unanswered questions will be marked as incorrect.</p>
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmSubmit(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitQuiz}>
                        Submit Quiz
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}