package com.kanban.kanbantool.models;

import com.kanban.kanbantool.enums.Priority;
import com.kanban.kanbantool.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "TaskCollection")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    String taskId;
    String title;

    String description;

    Priority priority;

    String deadline;

    String lastUpdated;

    Status status;

    Project project;

    User developer;



}
