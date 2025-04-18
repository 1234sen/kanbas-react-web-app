import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Alert, Badge } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import * as client from "./client";
import "./results.css";

export default function QuizResults() {
    const { cid, qid, attemptId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState<any>(null);
    const [attemptData, setAttemptData] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const quizData = await client.findQuizById(qid);
                setQuizData(quizData);

                const attemptData = await client.findQuizAttemptById(attemptId);
                setAttemptData(attemptData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("Failed to load quiz results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [qid, attemptId]);

    const handleBackToQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    if (error) {
        return (
            <div className="p-4">
                <Alert variant="danger">
                    <h5>Error</h5>
                    <p>{error}</p>
                    <Button
                        variant="primary"
                        onClick={handleBackToQuiz}
                    >
                        Back to Quiz
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!quizData || !attemptData) {
        return (
            <div className="p-4">
                <Alert variant="warning">
                    <h5>Data Not Found</h5>
                    <p>The quiz or attempt data could not be found.</p>
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

    return (
        <div className="p-4">
            <Card className="mb-4">
                <Card.Header className="bg-primary text-white">
                    <h4>Quiz Results: {quizData.title}</h4>
                </Card.Header>
                <Card.Body>
                    <div className="result-summary mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Your Score</h5>
                            <h5>
                                <Badge bg="primary" className="fs-5">
                                    {attemptData.score} / {attemptData.maxScore} points
                                </Badge>
                            </h5>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Percentage</span>
                            <span>
                                {attemptData.maxScore > 0
                                    ? Math.round((attemptData.score / attemptData.maxScore) * 100)
                                    : 0}%
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Submitted</span>
                            <span>{new Date(attemptData.completedAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <h5 className="mb-3">Answers</h5>

                    {quizData.questions.map((question: any, index: number) => {
                        const userAnswer = attemptData.answers.find((a: any) => a.questionId === question._id);
                        const answer = userAnswer ? userAnswer.answer : null;

                        let isCorrect = false;
                        let correctAnswerText = "";

                        switch (question.questionType) {
                            case "MULTIPLE_CHOICE":
                            case "TRUE_FALSE":
                                const correctAnswer = question.answers.find((a: any) => a.isCorrect);
                                correctAnswerText = correctAnswer?.text || "";
                                if (correctAnswer && answer === correctAnswer.text) {
                                    isCorrect = true;
                                } break;

                            case "FILL_IN_BLANK":
                                const correctAnswers = question.answers.map((a: any) => a.text);
                                correctAnswerText = correctAnswers.join(" or ");
                                if (correctAnswers.map(a => a.toLowerCase()).includes(answer?.toLowerCase())) {
                                    isCorrect = true;
                                }
                                break;
                        }

                        return (
                            <Card key={question._id} className={`mb-3 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                                <Card.Header className={isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}>
                                    <div className="d-flex justify-content-between">
                                        <span>Question {index + 1}</span>
                                        <div>
                                            {isCorrect
                                                ? <><FaCheck className="me-1" /> Correct</>
                                                : <><FaTimes className="me-1" /> Incorrect</>
                                            }
                                            <span className="ms-2">({question.points} pts)</span>
                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <p className="mb-3">{question.question}</p>

                                    <div className="user-answer mb-2">
                                        <strong>Your Answer:</strong> {answer || "Not answered"}
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
                        <Button variant="primary" onClick={handleBackToQuiz}>
                            <FaArrowLeft className="me-2" /> Back to Quiz
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}