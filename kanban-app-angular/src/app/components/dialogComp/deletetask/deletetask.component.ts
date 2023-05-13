import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../landing/landing.component';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-deletetask',
  templateUrl: './deletetask.component.html',
  styleUrls: ['./deletetask.component.css']
})
export class DeletetaskComponent {

  delTask: Task = new Task();

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeletetaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.delTask = this.data.tsk;
  }


  deleteTask(): void {
    this.taskService.deleteTask(this.delTask.taskId).subscribe({
      next: (value) => {
        this.dialogRef.close();
      },
      error: (err) => {

      },
    });
  }

}
