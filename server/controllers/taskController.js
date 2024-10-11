import taskModel from "../models/tasks.js";


class TaskController {
    static createTask = async (req, res)=>{
        try {
            const {title}= req.body;
            if(title===""){
                return res
                        .status(400)
                        .json({Message: "Please Provide Title"})
            } else {
                const task= new taskModel({title: title});
    
                const savedTask= await task.save();
                if(savedTask){
                    return res 
                            .status(201)
                            .json({id: task._id,
                                    Message: "Task Saved Successfully."
                                 })
                } else {
                    return res
                            .status(400)
                            .json({Message: "Task Not Saved."})
                }
            }
            
        } catch (error) {
            return res
                     .staus(500)
                     .json({Error : error})
        }
    }

    static getAllTasks = async (req, res) =>{
        try {
            const tasks= await taskModel.find();
            if(tasks){
                return res
                        .status(200)
                        .json({tasks})
            } else {
                return res
                        .status(400)
                        .json({Message: "Task Not fetched from database"})
            }
        } catch (error) {
            return res
                    .status(400)
                    .json({Error: error})
        }
    }

    static getTask = async (req, res) =>{
        try {
            const task= await taskModel.findById(req.params.id);
            if(task){
                return res
                        .status(200)
                        .json(task)
            } else {
                return res
                        .status(404)
                        .json( {error: "There is no task at this id"});
            }
        } catch (error) {
            return res
                    .status(400)
                    .json(error)
        }
    }

    static updateTask= async (req, res) =>{
        try {
            const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if(task){
                return res
                        .status(202)
                        .json("Task Upadated Succesfully.")
            } else {
                return res
                        .status(404)
                        .json({error: "There is no task at this id"})
            }
        } catch (error) {
            return res
                    .status(400)
                    .json(error)
        }
    }

    static deleteTask= async (req, res) =>{
        try {
            const task= await taskModel.findByIdAndDelete(req.params.id);
            if(task){
                return res
                        .status(202)
                        .json("Task Deleted Succesfully.")
            } else {
                return res
                        .status(404)
                        .json({error: "There is no task at this id"})
            }
        } catch (error) {
            return res
                    .status(400)
                    .json(error)
        }
    }

    static bulkAddTasks= async (req, res) =>{
        try {
            const tasks = req.body.tasks;

            if (!Array.isArray(tasks) || tasks.length === 0) {
                return res
                        .status(400)
                        .json({ Message: "Please provide an array of tasks" });
            }

            const newTasks= await taskModel.insertMany(tasks);
            if(newTasks){
                return res
                        .status(201)
                        .json({ tasks: newTasks.map(task => ({ id: task._id })),
                                Message: "Tasks Added Successfully"
                        });
            } else {
                return res
                    .status(400)
                    .json("Tasks not created")
            }
        } catch (error) {
            return res
                    .status(400)
                    .json(error)
        }
    }

    static bulkDelete = async (req, res) => {
        try {
            if (!req.body.tasks || !Array.isArray(req.body.tasks)) {
                return res
                    .status(400)
                    .json({ Message: "Please provide an array of tasks with their IDs." });
            }
    
            const tasks = req.body.tasks.map(task => task.id);
            if (tasks.length === 0) {
                return res
                    .status(400)
                    .json({ Message: "No task IDs provided." });
            }
    
            const deleteTasks = await taskModel.deleteMany({ _id: { $in: tasks } });
            
            if (deleteTasks.deletedCount > 0) {
                return res
                    .status(200)
                    .json({ Message: "Tasks Deleted Successfully" });
            } else {
                return res
                    .status(400)
                    .json({ Message: "No tasks found with the provided IDs" });
            }
        } catch (error) {
            return res
                .status(400) 
                .json({ Error: error.message });
        }
    }
    
    
}

export default TaskController; 