import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, getAllJobsController, updateJobController, deleteJobController, jobStatsController} from '../controllers/jobsController.js'

const router= express.Router()

//routes
//create job || post
router.post('/create-job',userAuth,createJobController)

//get jobs || get
router.get('/get-job',userAuth,getAllJobsController);

//update jobs || put || patch
router.patch("/update-job/:id",userAuth, updateJobController);

//delete jobs || delete
router.delete("/delete-job/:id",userAuth, deleteJobController);

//jobs stats filter || get
router.get("/job-stats", userAuth, jobStatsController);

export default router