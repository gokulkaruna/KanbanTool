package com.kanban.kanbantool.controller;

import com.kanban.kanbantool.models.Project;
import com.kanban.kanbantool.models.Task;
import com.kanban.kanbantool.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    ProjectService projectService;

    Project proj;

    @PostMapping("/add")
    public ResponseEntity<Project> addProject(@RequestBody Project project){
        proj = projectService.createProject(project);
        if(proj != null)
            return new ResponseEntity<Project>(proj, HttpStatus.OK);
        else
            return new ResponseEntity<Project>(proj, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/viewall")
    public List<Project> viewProjects(){
        return projectService.viewProjects();
    }

}
