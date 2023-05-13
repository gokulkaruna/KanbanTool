import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Task } from 'src/app/models/task.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../landing/landing.component';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/models/project.model';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],

})
export class AddtaskComponent implements OnInit {

  project: Project;
  addTaskForm: FormGroup;
  task: Task = new Task();
  selectedDeveloper: string = "";
  devList: User[] = [];
  isNotEditMode: boolean = true;
  isDev: boolean = false;

  msg: string = "";
  adderr: boolean = false;
  addnoerr: boolean = true;

  userType: any;


  constructor(private dateAdapter: DateAdapter<Date>,
    private userService: LoginService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddtaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: Router
  ) {
    this.userType = sessionStorage.getItem("userType")?.toString()
    this.dateAdapter.setLocale('en-GB');
    this.loadAllDevs();
    this.isNotEditMode = true;
    this.taskService.viewTaskProject(this.data.projectId).subscribe((u) => this.project = u);
    if (this.data.tsk != null) {
      this.task = this.data.tsk
      this.selectedDeveloper = this.data.tsk.developer.userId;
      console.log(this.selectedDeveloper)
      this.isNotEditMode = false;
    }



  }


  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      'taskTitle': new FormControl('', [Validators.required]),
      'taskPriority': new FormControl('', Validators.required),
      'taskStatus': new FormControl('', Validators.required),
      'taskDeadline': new FormControl('', Validators.required),
      'taskDescription': new FormControl('', Validators.required),
      'taskAssignee': new FormControl('', Validators.required),

    });

    if (this.userType == "DEV") {
      this.isDev = true;
      // this.addTaskForm.controls['taskTitle'].disable;
      // this.addTaskForm.controls['taskPriority'].disable;
      // this.addTaskForm.controls['taskDeadline'].disable;
      // this.addTaskForm.controls['taskDescription'].disable;
      // this.addTaskForm.controls['taskAsignee'].disable;
    }
  }




  addNewTask(): void {
    this.taskService.addTask(this.task, this.project.id, this.selectedDeveloper).subscribe({
      next: (value) => {
        this.msg = "Task added successfully!";
        this.adderr = false;
        this.addnoerr = true;
        this.addTaskForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.msg = "Task with that title exists already";
        this.adderr = true;
      },
    }
    );
  }


  updateTask(): void {
    this.taskService.updateTask(this.task, this.project.id, this.selectedDeveloper).subscribe({
      next: (value) => {
        this.msg = "Task updated successfully!";
        this.adderr = false;
        this.addnoerr = true;
        this.addTaskForm.reset();
        this.dialogRef.close();
        //close dialog and display data
      },
      error: (err) => {
        this.msg = "Error updating task";
        this.adderr = true;
      },
    })
  }

  updateTaskDev(): void {
    this.taskService.updateTask(this.task, this.project.id, this.selectedDeveloper).subscribe({
      next: (value) => {
        // this.msg = "Task updated successfully!";
        // this.adderr = false;
        // this.addnoerr = true;
        // this.addTaskForm.reset();
        this.dialogRef.close();
        //close dialog and display data
      },
      error: (err) => {
        // this.msg = "Error updating task";
        // this.adderr = true;
      },
    })
  }

  loadAllDevs(): void {
    this.userService.viewDevs().subscribe((u) => this.devList = u);
  }


  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };


}
