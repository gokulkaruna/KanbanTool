import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';

import { LoginService } from 'src/app/services/login.service';
import { AddtaskComponent } from '../dialogComp/addtask/addtask.component';
import { AddProjectComponent } from '../dialogComp/addproject/add-project.component';
import { DeletetaskComponent } from '../dialogComp/deletetask/deletetask.component';


export interface DialogData {
  projectId: string;
  tsk: Task;
}


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],

})


export class LandingComponent implements OnInit {

  //session vars
  userName: any;
  userType: any;
  userEmail: any;
  userId: any;

  projectList: Project[] = [];
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  inprogTasks: Task[] = [];
  doneTasks: Task[] = [];

  selectedProject: string = "";

  constructor(
    private loginService: LoginService,
    private taskService: TaskService,
    private projectService: ProjectService,
    public dialog: MatDialog) {

    this.setSessionData();
    this.updateProjects();

  }

  ngOnInit(): void {

  }



  setSessionData(): void {
    if (sessionStorage.getItem("userName") != null) {
      this.userId = sessionStorage.getItem("userId")?.toString();
      this.userType = sessionStorage.getItem("userType")?.toString();
      this.userName = sessionStorage.getItem("userName")?.toString();
      this.userEmail = sessionStorage.getItem("userEmail")?.toString();
    }
  }

  logoutUser(): void {
    this.loginService.logoutUser();
  }

  updateProjects(): void {
    this.projectService.getProjectList().subscribe((projectList) => {
      this.projectList = projectList;
      this.selectedProject = this.projectList[0].id;
      this.displayTasks();
    });
  }


  updateToCurrentProject(): void {
    this.projectService.getProjectList().subscribe((projectList) => {
      // this.projectList = projectList;
      this.displayTasks();
    });
  }

  displayTasks() {
    this.updateAllTasks();
    this.updateTodoTasks();
    this.updateInprogasks();
    this.updateDoneTasks();
  }

  updateAllTasks(): void {
    this.taskService.viewAllTasks(this.selectedProject.toString()).subscribe((tasks) => this.tasks = tasks);
  }

  updateTodoTasks(): void {
    this.taskService.viewTodoTasks(this.selectedProject.toString()).subscribe((tasks) => this.todoTasks = tasks);
  }

  updateInprogasks(): void {
    this.taskService.viewInprogTasks(this.selectedProject.toString()).subscribe((tasks) => this.inprogTasks = tasks);
  }

  updateDoneTasks(): void {
    this.taskService.viewDoneTasks(this.selectedProject.toString()).subscribe((tasks) => this.doneTasks = tasks);
  }


  //add task
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddtaskComponent, {
      data: {
        projectId: this.selectedProject
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.displayTasks();
    });
  }


  //view task
  openDialogViewTask(task: Task): void {
    const dialogRef = this.dialog.open(AddtaskComponent, {
      data: {
        projectId: this.selectedProject,
        tsk: task
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.displayTasks();
      console.log('The dialog was closed');
    });
  }


  //add project
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updateProjects();
      this.displayTasks();
    });
  }


  deleteConfirmDialog(task: Task): void {
    const dialogRef = this.dialog.open(DeletetaskComponent, {
      data: {
        projectId: this.selectedProject,
        tsk: task
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updateProjects();
      this.displayTasks();
    });
  }




}
