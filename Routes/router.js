const express=require('express')

const router=new express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerMiddlware=require('../Middlewares/multerMiddleware')


router.post('/reg',userController.userRegister)
router.post('/log',userController.userLogin)
router.post('/addproject',jwtMiddleware,multerMiddlware.single('projectImg'),projectController.addProjects)
router.get('/getproject',projectController.getProjects)
router.get('/getallproject',jwtMiddleware,projectController.getAllProjects)
router.get('/getuserproject',jwtMiddleware,projectController.getUserProjects)
router.put('/editproject/:pid',jwtMiddleware,multerMiddlware.single('projectImg'),projectController.updateproject)
router.delete('/deleteproject/:pid',jwtMiddleware,projectController.deleteproject)
router.put('/editprofile',jwtMiddleware,multerMiddlware.single('profile'),userController.userProfile)

module.exports=router