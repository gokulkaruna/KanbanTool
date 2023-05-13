package com.kanban.kanbantool.controller;

import com.kanban.kanbantool.models.Project;
import com.kanban.kanbantool.models.Task;
import com.kanban.kanbantool.models.User;
import com.kanban.kanbantool.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    Task tsk;
    @PostMapping("/add/{projectid}/{devId}")
    public ResponseEntity<Task> addTask(@RequestBody Task task, @PathVariable("projectid") String projectId, @PathVariable("devId") String devId){
        tsk = taskService.addTask(task,projectId, devId);
        if(tsk!=null)
            return new ResponseEntity<Task>(tsk, HttpStatus.OK);
        else
            return new ResponseEntity<Task>(tsk, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{projectid}/{devId}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task, @PathVariable("projectid") String projectId, @PathVariable("devId") String devId){
        tsk = taskService.updateTask(task,projectId, devId);
        if(tsk!= null)
            return new ResponseEntity<Task>(tsk, HttpStatus.OK);
        else
            return new ResponseEntity<Task>(tsk, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("delete/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable("taskId") String taskId){
        tsk = taskService.deleteTask(taskId);
        if(tsk!= null)
            return new ResponseEntity<Task>(tsk, HttpStatus.OK);
        else
            return new ResponseEntity<Task>(tsk, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/viewall/{projectid}")
    public List<Task> viewTasks(@PathVariable("projectid") String projectId){
        return taskService.viewTasks(projectId);
    }

    @GetMapping("/viewtodo/{projectid}")
    public List<Task> viewTodoTasks(@PathVariable("projectid") String projectId){
        return taskService.viewTodoTasks(projectId);
    }
    @GetMapping("/viewinprog/{projectid}")
    public List<Task> viewInprogTasks(@PathVariable("projectid") String projectId){
        return taskService.viewInprogTasks(projectId);
    }
    @GetMapping("/viewdone/{projectid}")
    public List<Task> viewDoneTasks(@PathVariable("projectid") String projectId){
        return taskService.viewDoneTasks(projectId);
    }

    @GetMapping("/viewtaskproject/{projectid}")
    public Project viewTaskProject(@PathVariable("projectid") String projectId){
        return taskService.viewTaskProject(projectId);
    }

    @GetMapping("/view/{projectid}")
    public List<Task> viewProjTasks( @PathVariable("projectid") String projectId){
        List<Task> lst = taskService.viewProjectTasks(projectId);
//        if(lst.isEmpty())
            return lst;
    }
}
