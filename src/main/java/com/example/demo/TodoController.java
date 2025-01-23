package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/todos")
//@CrossOrigin(origins = "*")


//@CrossOrigin(origins = "http://todo-frontend-1:5500")

//@CrossOrigin(origins = "http://frontend:5500")
//@CrossOrigin(origins = "http://127.0.0.1:5501") // Allow requests from your frontend
@CrossOrigin(origins = "https://todo-frontend-jh1x.onrender.com/")
//@CrossOrigin(origins = "http://localhost:5500")
//@CrossOrigin(origins = "http://localhost:5501")
//@CrossOrigin(origins = "http://localhost:5500", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })

public class TodoController {

    @Autowired
    private TodoService todoService;

    // Fetch all to-dos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    // Fetch a specific to-do by ID
    @GetMapping("/{id}")
    public Optional<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }

    // Create a new to-do
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    // Update an existing to-do
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoService.updateTodo(id, updatedTodo);
    }

    // Delete a to-do
    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable Long id) {
        todoService.deleteTodoById(id);
    }
}

