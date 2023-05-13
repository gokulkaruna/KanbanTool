import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  project: Project = new Project();
  msg: string = "";
  err: boolean = false;
  noerr: boolean = false;

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddProjectComponent>) {

  }


  ngOnInit(): void {
    this.addProjectForm = new FormGroup({
      'projectTitle': new FormControl('', [Validators.required]),
      'projectDescription': new FormControl('', Validators.required),
    })
  }



  addProject(): void {
    this.projectService.addProject(this.project).subscribe({
      next: (value) => {
        this.msg = "Project added successfully";
        this.noerr = true;
        this.err = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.msg = "Project with that title exists already";
        this.err = true;
      },
    });

  }

}











