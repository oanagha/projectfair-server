const projects = require('../Models/projectModel')

exports.addProjects = async (req, res) => {
  console.log("Inside add project Controller");
  const { title, languages, github, website, overview } = req.body
  const userId = req.userId
  const projectImg = req.file.filename
  console.log(title, languages, github, website, overview, userId, projectImg);
  try {
    const existingProject = await projects.findOne({ github })
    if (existingProject) {
      res.status(406).json("Project Already Addedd !!")
    } else {
      const newProject = new projects({ title, languages, github, website, overview, projectImg, userId })
      await newProject.save()
      res.status(200).json(newProject)
    }
  } catch (err) {
    res.status(400).json(err)
  }

}

exports.getProjects = async (req, res) => {
  try {
    const getProjects = await projects.find().limit(3)
    res.status(200).json(getProjects)
  } catch (err) {
    res.status(401).json(err)
  }
}


exports.getAllProjects = async (req, res) => {
  const searchkey=req.query.search

  const query={
    languages:{
      $regex:searchkey,
      $options:"i"
    }
  }
  
  try {
    const allProjects = await projects.find(query)
    res.status(200).json(allProjects)
  } catch (err) {
    res.status(401).json(err)
  }
}



exports.getUserProjects = async (req, res) => {
  const userId = req.userId
  try {
    const userProjects = await projects.find({ userId })
    res.status(200).json(userProjects)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.updateproject = async (req, res) => {

  const { pid } = req.params
  const { title, languages, github, website, overview, projectImg } = req.body
  const uploadImg = req.file ? req.file.filename : projectImg
  const { userId } = req.userId
  try {
    const updatedProject = await projects.findByIdAndUpdate({ _id: pid }, {
      title, languages, github, website, overview, projectImg: uploadImg, userId
    })
    updatedProject.save()
    res.status(200).json(updatedProject)


  } catch (err) {
    res.status(401).json(err)
  }

}
exports.deleteproject = async (req, res) => {
  const { pid } = req.params
  try {
    const deleteProject = await projects.findByIdAndDelete({ _id: pid })
    res.status(200).json(deleteProject)
  } catch (err) {
    res.status(401).json(err)
  }
}