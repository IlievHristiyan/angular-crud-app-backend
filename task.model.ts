import mongoose, { Schema, Document } from 'mongoose';

const TasksSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

// Check if the model already exists before defining it
const TaskModel =
  mongoose.models.tasks || mongoose.model<ITaskDbModel>('tasks', TasksSchema);

export interface ITaskDbModel extends Document {}

export default TaskModel;
