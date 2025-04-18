import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Dropdown } from "react-bootstrap";
import { FaPlus, FaCheck, FaBan, FaEllipsisV } from "react-icons/fa";
import * as client from "./client";
import { setQuizzes } from "./reducer";
import "./index.css";

export default function Quizzes() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState<string | null>(null);

    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const isFaculty = currentUser && currentUser.role === "FACULTY";

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            if (cid) {
                const data = await client.findQuizzesForCourse(cid);
                dispatch(setQuizzes(data));
            }
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    const handleCreateQuiz = async () => {
        try {
            if (!cid || !isFaculty) return;

            const newQuiz = {
                title: "New Quiz",
                description: "",
                course: cid,
                published: false,
                quizType: "GRADED_QUIZ",
                assignmentGroup: "QUIZZES",
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                attemptsAllowed: 1,
                showCorrectAnswers: true,
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestionsAfterAnswering: false,
                questions: []
            };

            const quiz = await client.createQuiz(cid, newQuiz);
            dispatch(setQuizzes([...quizzes, quiz]));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`);
        } catch (error) {
            console.error("Failed to create quiz:", error);
        }
    };

    const handleDeleteQuiz = async (quizId: string) => {
        setConfirming(quizId);
    };

    const confirmDelete = async () => {
        if (!confirming) return;

        try {
            await client.deleteQuiz(confirming);
            dispatch(setQuizzes(quizzes.filter((quiz: any) => quiz._id !== confirming)));
            setConfirming(null);
        } catch (error) {
            console.error("Failed to delete quiz:", error);
        }
    };

    const togglePublished = async (quiz: any) => {
        try {
            const updatedQuiz = { ...quiz, published: !quiz.published };
            await client.updateQuiz(updatedQuiz);
            dispatch(setQuizzes(
                quizzes.map((q: any) =>
                    q._id === quiz._id ? updatedQuiz : q
                )
            ));
        } catch (error) {
            console.error("Failed to update quiz:", error);
        }
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
        const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

        if (availableFrom && now < availableFrom) {
            return `Not available until ${availableFrom.toLocaleDateString()}`;
        } else if (availableUntil && now > availableUntil) {
            return "Closed";
        } else if (availableFrom && availableUntil) {
            return "Available";
        }

        return "Available";
    };

    const handleStartQuiz = async (quizId: string) => {
        try {
            const attempt = await client.startQuizAttempt(quizId);
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/take/${attempt._id}`);
        } catch (error) {
            console.error("Failed to start quiz:", error);
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    return (
        <div id="wd-quizzes" className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Quizzes</h3>
                {isFaculty && (
                    <Button
                        variant="danger"
                        className="px-3"
                        onClick={handleCreateQuiz}
                    >
                        <FaPlus className="me-2" /> Quiz
                    </Button>
                )}
            </div>

            {quizzes.length === 0 ? (
                <div className="text-center my-5">
                    <p className="text-muted">No quizzes found for this course</p>
                    {isFaculty && (
                        <p>Click the "+ Quiz" button to create a new quiz</p>
                    )}
                </div>
            ) : (
                <Table hover responsive className="quiz-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Availability</th>
                            <th>Due Date</th>
                            <th>Points</th>
                            <th>Questions</th>
                            {!isFaculty && <th>Score</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz: any) => (
                            <tr key={quiz._id}>
                                <td
                                    className="quiz-title"
                                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
                                >
                                    <div className="d-flex align-items-center">
                                        {quiz.published ? (
                                            <FaCheck className="text-success me-2" />
                                        ) : (
                                            <FaBan className="text-danger me-2" />
                                        )}
                                        {quiz.title}                                    </div>
                                </td>
                                <td>{getAvailabilityStatus(quiz)}</td>
                                <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : '-'}</td>
                                <td>
                                    {quiz.questions.reduce((total: number, q: any) => total + (q.points || 0), 0)}
                                </td>
                                <td>{quiz.questions.length}</td>
                                {!isFaculty && <td>-</td>}
                                <td>
                                    <div className="d-flex align-items-center">
                                        {isFaculty ? (
                                            <>
                                                <Button
                                                    variant="link"
                                                    className="p-0 me-3"
                                                    onClick={() => togglePublished(quiz)}
                                                >
                                                    {quiz.published ? 'Unpublish' : 'Publish'}
                                                </Button>

                                                <Dropdown>
                                                    <Dropdown.Toggle variant="link" className="p-0">
                                                        <FaEllipsisV />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}
                                                        >
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/preview`)}
                                                        >
                                                            Preview
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className="text-danger"
                                                            onClick={() => handleDeleteQuiz(quiz._id)}
                                                        >
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                disabled={!quiz.published || getAvailabilityStatus(quiz) !== "Available"}
                                                onClick={() => handleStartQuiz(quiz._id)}
                                            >
                                                Start Quiz
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* 删除确认对话框 */}
            {confirming && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setConfirming(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this quiz? This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setConfirming(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}