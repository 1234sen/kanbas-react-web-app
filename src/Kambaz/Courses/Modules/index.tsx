import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup } from "react-bootstrap";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";
import { FormControl } from "react-bootstrap"; 

import { addModule,editModule,  updateModule, deleteModule,setModules  } from "./reducer";
import * as courseClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModulesForCourse = async () => {
    const modules = await courseClient.findModulesForCourse(cid!);
    dispatch(setModules(modules));
  };


  const addModuleHandler = async () => {
    const newModule = await courseClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
    fetchModulesForCourse(); 
  };

  const deleteModuleHandler = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
    fetchModulesForCourse(); 
  };
  const updateModuleHandler = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
    fetchModulesForCourse();
  };
 

  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);
 

  return (
    <div>
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
        addModule={addModuleHandler} />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
      { module.editing && (
         <FormControl className="w-50 d-inline-block"
         onChange={(e) =>
          updateModuleHandler({ ...module, name: e.target.value })
           
         }
         onKeyDown={(e) => {
           if (e.key === "Enter") {
            updateModuleHandler({ ...module, editing: false });
           }
         }}
         defaultValue={module.name} />

      )}

<ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => deleteModuleHandler(moduleId)}

                  editModule={(moduleId) => updateModuleHandler(moduleId)} />

            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}


