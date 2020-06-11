import { AddGraph, getAllEntitiesByCourse, getEntitiesNumberByCourseExcept, setPptPageByEntity, getPptPageByCourseAndName, getAllLinksByCourse, updateEntityById, deleteEntityById, updateLinkById, deleteLinkById } from './fetch/graph'
import { findIsStuEntityExist, insertStuEntity, updateStuEntityByAccountAndEntity, getCountByAccountAndCourse, getAllStuEntityByAccountAndCourse, getStuEntityByCourseAndEntity, getStuEntityByCourseAndStudent, getLevelNumber } from './fetch/stuentity'

export {
  AddGraph, getAllEntitiesByCourse, getEntitiesNumberByCourseExcept, setPptPageByEntity, getPptPageByCourseAndName, getAllLinksByCourse, updateEntityById, deleteEntityById, updateLinkById, deleteLinkById,
  findIsStuEntityExist, insertStuEntity, updateStuEntityByAccountAndEntity, getCountByAccountAndCourse, getAllStuEntityByAccountAndCourse, getStuEntityByCourseAndEntity, getStuEntityByCourseAndStudent, getLevelNumber
}
