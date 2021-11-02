package org.ex.controllers;

import org.ex.models.Task;
import org.ex.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "task")
@CrossOrigin(origins = "${angular.url}")
public class TaskController {

    private TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = this.service.getAllTasks();

        if(tasks != null) {
            if(tasks.size() > 0) {
                return ResponseEntity.ok().body(tasks);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(path = "/new")
    @Transactional
    public ResponseEntity createUserTask(@RequestBody Task task) {

        boolean status = this.service.createTask(task);

        if(status) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "/user/{id}")
    public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable int id) {
        List<Task> tasks = this.service.getTasksByUserId(id);

        if(tasks != null) {
            if(tasks.size() > 0) {
                return ResponseEntity.ok().body(tasks);
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "/group/{id}")
    public ResponseEntity<List<Task>> getTasksByGroupId(@PathVariable int id) {
        List<Task> tasks = this.service.getTasksByGroupId(id);

        if(tasks != null) {
            if(tasks.size() > 0) {
                return ResponseEntity.ok().body(tasks);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping(path = "/update")
    @Transactional
    public ResponseEntity updateTask(@RequestBody Task task) {

        boolean status = this.service.updateTask(task);

        if(status) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping(path = "/delete/{id}")
    @Transactional
    public ResponseEntity deleteTask(@PathVariable int id) {

        boolean status = this.service.deleteTask(id);

        //todo: get response from query, instead of this
        Task task = this.service.getTaskById(id); //Shouldn't do this

        if(status && task != null) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(410).build();
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        Task task = this.service.getTaskById(id);
        if(task != null) {
            System.out.println(task);
            return ResponseEntity.ok().body(task);
        }
        return ResponseEntity.notFound().build();
    }

}
