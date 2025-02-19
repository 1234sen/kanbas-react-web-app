import { useParams } from "react-router";
import  { modules } from "../../Database";
import ModulesControls from './ModulesControls'
import LessonControlButtons from './LessonControlButtons'
import ModuleControlButtons from './ModuleControlButtons'
import ListGroup from 'react-bootstrap/ListGroup'
import { BsGripVertical } from 'react-icons/bs';

export default function Modules() {

  const {  cid } = useParams();
  console.log(modules);
  const module = modules.find((modules) => modules.course === cid);
  // const { pathname } = useLocation();

    console.log("Modules component rendering...");
      
      return (
        <div>
      <ModulesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
      
        {module && (
          <ListGroup.Item key={module._id} className={`wd-module p-0 mb-5 fs-5 border-gray`}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
           
            {module.lessons ? (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson, lessonIndex) => (
                  <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="p-3">No lessons available for this module.</div>
            )}
          </ListGroup.Item>
        )}
       
        {!module && (
          <div className="p-3">Module not found.</div>
        )}
      </ListGroup>
    </div>
      );
    }
  
  
  