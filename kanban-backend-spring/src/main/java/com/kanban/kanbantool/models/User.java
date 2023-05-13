package com.kanban.kanbantool.models;


import com.kanban.kanbantool.enums.UserType;;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserCollection")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    String userId;
    String email;
    String name;
    String password;
    UserType userType;
}
