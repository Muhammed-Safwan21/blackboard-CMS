import asyncHandler from '../middlewares/asyncHandler.js';
import Subject from '../models/subjectModel.js';


// Get a single lesson by ID
const getLessonById = asyncHandler(async(req,res)=>{
  const subject = await Subject.findById(req.params.subjectId)
  const lesson = subject.lessons.id(req.params.lessonId)
  if (!lesson) {
      res.status(404)
      throw new Error("Lesson not found")
      
    } else {
      res.json(lesson);
    }
})


// Create a new lesson
const createLesson = asyncHandler(async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
    const { title, image, description } = req.body;
    const createdBy = req.user._id;

    const lesson = { title, image, description,createdBy };

    subject.lessons.push(lesson);
    await subject.save();

    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Update a lesson
const updateLessonById = asyncHandler(async (req, res) => {
  try {
    const { subjectId, lessonId } = req.params; 

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const lesson = subject.lessons.id(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    lesson.title = req.body.title || lesson.title;
    lesson.image = req.body.image || lesson.image;
    lesson.description = req.body.description || lesson.description;

    const updatedSubject = await subject.save();

    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Delete a lesson by ID
const deleteLessonById = asyncHandler(async (req, res) => {
  try {
    const { subjectId, lessonId } = req.params;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const lesson = subject.lessons.id(lessonId);
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    subject.lessons.remove(lesson);
    await subject.save();
    res.status(204).json({message:"lesson deleted successfully"}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all lessons
const getAllLessons = asyncHandler(async (req, res) => {
    try {
      const { subjectId, lessonId } = req.params; 

      const subject = await Subject.findById(subjectId);
      const lessons = subject.lessons.id(lessonId);
      res.status(200).json(lessons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // updateLessonToBeRead
  const updateLessonToBeRead = asyncHandler(async (req, res) => {
    const { subjectId, lessonId } = req.params;
  
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
  
    const lesson = subject.lessons.id(lessonId);
  
    if (!lesson) {
      res.status(404);
      throw new Error('Lesson not found');
    }
  
    // Check if the user has already marked this lesson as read
    const userProgress = lesson.lessonProgress.find(progress => progress.readBy.toString() === req.user._id.toString());
  
    if (!userProgress) {
      lesson.lessonProgress.push({
        readBy: req.user._id,
        isRead: true,
        readAt: Date.now(),
      });
    } 
  
    const updatedSubject = await subject.save();
    res.status(200).json(updatedSubject);
  });
  


export {
  createLesson,
  getLessonById,
  updateLessonById,
  deleteLessonById,
  getAllLessons,
  updateLessonToBeRead
};
