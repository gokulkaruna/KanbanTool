package com.kanban.kanbantool.service;

import com.kanban.kanbantool.dao.ProjectRepository;
import com.kanban.kanbantool.models.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    List<Project> projectList;

    public Project createProject(Project project){
        projectList = new ArrayList<>();
        projectList = projectRepository.findAll().stream().filter(a->a.getTitle().equalsIgnoreCase(project.getTitle())).collect(Collectors.toList());
        if(projectList.isEmpty()) {
            return projectRepository.save(project);

        }
        return null;
    }


    public List<Project> viewProjects(){
        projectList = new ArrayList<>();
        projectList = projectRepository.findAll();
        return  projectList;
    }

}
