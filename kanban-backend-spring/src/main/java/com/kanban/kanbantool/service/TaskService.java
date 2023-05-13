package com.kanban.kanbantool.service;

import com.kanban.kanbantool.dao.ProjectRepository;
import com.kanban.kanbantool.dao.TaskRepository;
import com.kanban.kanbantool.dao.UserRepository;
import com.kanban.kanbantool.models.Project;
import com.kanban.kanbantool.models.Task;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;



    private String nowSystemTime(){
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formatDateTime = now.format(format);
        return formatDateTime;
    }

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    List<Task> taskList;

    Project project;

    public Task addTask(Task task, String projectId, String devId) {
        //if project is present with that id
        if (projectRepository.findById(projectId).isPresent())
            project = projectRepository.findById(projectId).get();

        if (project != null) {
            //no task with same title on that project
            taskList = taskRepository.findAll().stream().filter(t -> t.getProject().getId().equalsIgnoreCase(projectId) && t.getTitle().equalsIgnoreCase(task.getTitle())).collect(Collectors.toList());
            if (taskList.isEmpty()) {
                task.setProject(project);
                task.setDeadline(task.getDeadline().substring(0,10));
                task.setLastUpdated(nowSystemTime());
                task.setDeveloper(userRepository.findById(devId).get());
                return taskRepository.save(task);
            }
        }
        return null;
    }


    public Task updateTask(Task task, String projectId, String devId){
        if (projectRepository.findById(projectId).isPresent())
            project = projectRepository.findById(projectId).get();
        if (project != null) {
            //no task with same title on that project
            if (taskRepository.existsById(task.getTaskId())) {
                task.setDeadline(task.getDeadline().substring(0,10));
                task.setLastUpdated(nowSystemTime());
                task.setDeveloper(userRepository.findById(devId).get());
                return taskRepository.save(task);
            }
        }
        return null;
    }
    public List<Task> viewTasks(String projectId){
        return taskRepository.findAll();
    }

    public List<Task> viewTodoTasks(String projectId){
        return taskRepository.findAll().stream().filter((task)->task.getStatus().name().equalsIgnoreCase("TODO") && task.getProject().getId().equalsIgnoreCase(projectId)).collect(Collectors.toList());
    }

    public List<Task> viewInprogTasks(String projectId){
        return  taskRepository.findAll().stream().filter((task)->task.getStatus().name().equalsIgnoreCase("INPROG") && task.getProject().getId().equalsIgnoreCase(projectId)).collect(Collectors.toList());

    }

    public List<Task> viewDoneTasks(String projectId){
        return taskRepository.findAll().stream().filter((task)->task.getStatus().name().equalsIgnoreCase("DONE") && task.getProject().getId().equalsIgnoreCase(projectId)).collect(Collectors.toList());
    }


    public List<Task> viewProjectTasks(String projectId){
        if(projectRepository.existsById(projectId))
            return taskRepository.findAll().stream().filter(t -> t.getProject().getId().equalsIgnoreCase(projectId)).collect(Collectors.toList());
        else
            return null;
    }

    public Project viewTaskProject(String projectId){
        if(projectRepository.existsById(projectId))
            return projectRepository.findById(projectId).get();
        else
            return null;
    }

    public Task deleteTask(String taskId){
        if(taskRepository.existsById(taskId)){
            Task tsk = taskRepository.findById(taskId).get();
            taskRepository.deleteById(taskId);
            return tsk;
        }
       return null;
    }

}
