import ModulesControls from './ModulesControls'
import LessonControlButtons from './LessonControlButtons'
import ModuleControlButtons from './ModuleControlButtons'
import ListGroup from 'react-bootstrap/ListGroup'
import { BsGripVertical } from 'react-icons/bs';

export default function Modules() {
    console.log("Modules component rendering...");

    return (
      <div>
 <ModulesControls /><br /><br /><br /><br />
 <ListGroup className="rounded-0" id="wd-modules">
 <ListGroup.Item className="wd-module p-0 mb-5
fs-5 border-gray">
 <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons /> </div>
 <ListGroup className="wd-lessons rounded-0">
 <ListGroup.Item className="wd-lesson p-3
ps-1">
 <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons /> </ListGroup.Item>
 <ListGroup.Item className="wd-lesson p-3
ps-1">
 <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
</ListGroup.Item>
 <ListGroup.Item className="wd-lesson p-3
ps-1">
 <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development<LessonControlButtons />
</ListGroup.Item>
 </ListGroup>
 </ListGroup.Item>
 <ListGroup.Item className="wd-module p-0 mb-5
fs-5 border-gray">
  <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 2<ModuleControlButtons /> </div>
 <ListGroup className="wd-lessons rounded-0">
 <ListGroup.Item className="wd-lesson p-3
ps-1">
 <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons /></ListGroup.Item>
 <ListGroup.Item className="wd-lesson p-3
ps-1">
<BsGripVertical className="me-2 fs-3" />  LESSON 2 <LessonControlButtons /></ListGroup.Item>
 </ListGroup>
 </ListGroup.Item>
 </ListGroup>
</div>
    );
  }
  
  
  