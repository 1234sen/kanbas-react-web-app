import { IoEllipsisVertical } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";
import GreenCheckmark from "./GreenCheckmark";

interface LessonControlButtonsProps {
    lessonId?: string;
}

export default function LessonControlButtons({ lessonId }: LessonControlButtonsProps) {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <Dropdown className="d-inline">
                <Dropdown.Toggle
                    variant="link"
                    className="text-dark"
                    id={`lesson-options-${lessonId}`}
                >
                    <IoEllipsisVertical className="fs-4" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Move To...</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}