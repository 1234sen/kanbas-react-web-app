import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import * as client from "./client";
import { setQuiz, setQuizAttempt } from "./reducer";
import "./details.css";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [latestAttempt, setLatestAttempt] = useState<any>(null);

    const { quiz } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const isFaculty = currentUser && currentUser.role === "FACULTY";

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            if (qid) {
                const data = await client.findQuizById(qid);
                dispatch(setQuiz(data));

                if (currentUser && currentUser.role !== "FACULTY") {
                    try {
                        const attempt = await client.findLatestQuizAttempt(currentUser._id, qid);
                        setLatestAttempt(attempt);
                    } catch (error) {
                        console.error("Failed to fetch latest attempt:", error);
                    }
                }
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

    const handleStartQuiz = async () => {
        try {
            if (!qid) return;

            const attempt = await client.startQuizAttempt(qid);
            dispatch(setQuizAttempt(attempt));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take/${attempt._id}`);
        } catch (error) {
            console.error("Failed to start quiz:", error);
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    return (
        <div id="wd-quiz-details" className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>{quiz.title}</h3>
                <div>
                    {isFaculty ? (
                        <>
                            <Button
                                variant="secondary"
                                className="me-2"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)}
                            >
                                <FaEye className="me-2" /> Preview
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
                            >
                                <FaEdit className="me-2" /> Edit
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="primary"
                            disabled={!quiz.published || latestAttempt?.completed}
                            onClick={handleStartQuiz}
                        >
                            {latestAttempt?.completed ? 'Quiz Completed' : 'Start Quiz'}
                        </Button>
                    )}
                </div>
            </div>

            <Card className="mb-4">
                <Card.Header>
                    <h5 className="mb-0">Quiz Information</h5>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <div className="quiz-detail-item">
                                <span className="property">Quiz Type:</span>
                                <span className="value">{quiz.quizType.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Points:</span>
                                <span className="value">
                                    {quiz.questions.reduce((total: number, q: any) => total + (q.points || 0), 0)}
                                </span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Assignment Group:</span>
                                <span className="value">{quiz.assignmentGroup}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Shuffle Answers:</span>
                                <span className="value">{quiz.shuffleAnswers ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Time Limit:</span>
                                <span className="value">{quiz.timeLimit} Minutes</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Multiple Attempts:</span>
                                <span className="value">{quiz.multipleAttempts ? 'Yes' : 'No'}</span>
                            </div>
                            {quiz.multipleAttempts && (
                                <div className="quiz-detail-item">
                                    <span className="property">Attempts Allowed:</span>
                                    <span className="value">{quiz.attemptsAllowed}</span>
                                </div>
                            )}
                        </Col>
                        <Col md={6}>
                            <div className="quiz-detail-item">
                                <span className="property">Show Correct Answers:</span>
                                <span className="value">{quiz.showCorrectAnswers ? 'Immediately' : 'No'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Access Code:</span>
                                <span className="value">{quiz.accessCode || 'None'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">One Question at a Time:</span>
                                <span className="value">{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Webcam Required:</span>
                                <span className="value">{quiz.webcamRequired ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Lock Questions After Answering:</span>
                                <span className="value">{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Due:</span>
                                <span className="value">
                                    {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : 'No due date'}
                                </span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Available From:</span>
                                <span className="value">
                                    {quiz.availableFrom ? new Date(quiz.availableFrom).toLocaleString() : 'Always'}
                                </span>
                            </div>
                            <div className="quiz-detail-item">
                                <span className="property">Available Until:</span>
                                <span className="value">
                                    {quiz.availableUntil ? new Date(quiz.availableUntil).toLocaleString() : 'No end date'}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {!isFaculty && latestAttempt && (
                <Card className="mt-4">
                    <Card.Header>
                        <h5 className="mb-0">Your Last Attempt</h5>
                    </Card.Header>
                    <Card.Body>
                        {latestAttempt.completed ? (
                            <div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Score:</span>
                                    <Badge bg="primary" className="fs-5">
                                        {latestAttempt.score} / {latestAttempt.maxScore} points
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Completed on:</span>
                                    <span>{new Date(latestAttempt.completedAt).toLocaleString()}</span>
                                </div>
                                <Button
                                    variant="outline-primary"
                                    className="w-100 mt-3"
                                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results/${latestAttempt._id}`)}
                                >
                                    View Results
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <p>You have an incomplete attempt that was started on {new Date(latestAttempt.startedAt).toLocaleString()}</p>
                                <Button
                                    variant="primary"
                                    className="w-100"
                                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take/${latestAttempt._id}`)}
                                >
                                    Resume Quiz
                                </Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}