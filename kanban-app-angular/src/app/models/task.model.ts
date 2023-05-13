import { Priority } from "../enums/priority.enums";
import { Status } from "../enums/status.enums";
import { Project } from "./project.model";
import { User } from "./user.model";

export class Task {

    taskId: string;
    title: string;
    description: string;
    priority: Priority;
    deadline: string; //date
    lastUpdated: string; //date
    status: Status;
    project: Project;
    developer: User;





}
