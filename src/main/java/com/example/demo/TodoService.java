package com.example.demo;

//public class TodoService {
//}
//package com.example.todolist.service;

//import com.example.todolist.model.Todo;
//import com.example.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // Fetch all to-do items
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Fetch a single to-do item by ID
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Add a new to-do item
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Update an existing to-do item
    public Todo updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTask(updatedTodo.getTask());
            todo.setCompleted(updatedTodo.isCompleted());
            todo.setPriority(updatedTodo.getPriority());
            return todoRepository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo not found with id " + id));
    }

    // Delete a to-do item
    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}

