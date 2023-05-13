package com.kanban.kanbantool.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "ProjectCollection")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    String id;
    String title;
    String description;

}
