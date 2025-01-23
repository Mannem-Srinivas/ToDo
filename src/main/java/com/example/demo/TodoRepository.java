package com.example.demo;

//public interface TodoRepository {
//package com.example.Todolist.repository;
//import com.example.todolist.model.Todo;
//}

import org.springframework.data.jpa.repository.JpaRepository;
// Repository interface for Todo entity
public interface TodoRepository extends JpaRepository<Todo, Long> {
}

