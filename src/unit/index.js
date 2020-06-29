import { AddGraph, getAllEntitiesByCourse, getPptPageByNameAndCourse, getEntitiesNumberByCourseExcept, setPptPageByEntity, getPptPageByCourseAndName, getAllLinksByCourse, updateEntityById, deleteEntityById, updateLinkById, deleteLinkById } from './fetch/graph'
import { findIsStuEntityExist, insertStuEntity, updateStuEntityByAccountAndEntity, updateKfByAccountAndEntity, getCountByAccountAndCourse, getAllStuEntityByAccountAndCourse, getAllKfByAccountAndCourse, getStuEntityByCourseAndEntity, getStuEntityByCourseAndStudent, getLevelNumber } from './fetch/stuentity'
import { insertTpaper, getTaperByAccount } from './fetch/tpaper'
import { insertPaperTag, getPaperTagByCourseAndAccount, getPaperTagByCourseAndPnumber } from './fetch/papertag'
// import { insertKf, updateKfByCourseAndAccount, getKfByCourseAndAccount } from './fetch/kf'

export {
  AddGraph, getAllEntitiesByCourse, getPptPageByNameAndCourse, getEntitiesNumberByCourseExcept, setPptPageByEntity, getPptPageByCourseAndName, getAllLinksByCourse, updateEntityById, deleteEntityById, updateLinkById, deleteLinkById,
  findIsStuEntityExist, insertStuEntity, updateStuEntityByAccountAndEntity, updateKfByAccountAndEntity, getCountByAccountAndCourse, getAllStuEntityByAccountAndCourse, getAllKfByAccountAndCourse, getStuEntityByCourseAndEntity, getStuEntityByCourseAndStudent, getLevelNumber,
  insertTpaper, getTaperByAccount,
  insertPaperTag, getPaperTagByCourseAndAccount, getPaperTagByCourseAndPnumber
}
