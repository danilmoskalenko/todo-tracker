package com.example.backend.controller

import com.example.backend.entity.Task
import com.example.backend.repository.TaskRepository
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:5174"])
@RestController
@RequestMapping("/tasks")
class TaskController(private val repository: TaskRepository) {

    @GetMapping
    fun getAllTasks(): List<Task> = repository.findAll()

    @PostMapping
    fun createTask(@RequestBody task: Task): Task = repository.save(task)

    @GetMapping("/{id}")
    fun getTask(@PathVariable id: Long): Task = repository.findById(id).orElseThrow()

    @PutMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody updated: Task): Task {
        val task = repository.findById(id).orElseThrow()
        val newTask = task.copy(
            title = updated.title,
            description = updated.description,
            done = updated.done
        )
        return repository.save(newTask)
    }

    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long) = repository.deleteById(id)
}