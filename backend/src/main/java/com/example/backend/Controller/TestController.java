package com.example.backend.Controller;

import com.example.backend.Entity.Test;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.backend.Service.service;

import java.util.List;

@RestController
@RequiredArgsConstructor

public class TestController {
    private final service service;

    @PostMapping("/test/add")
    public Test addCourse(@RequestBody Test test){
        return  service.addTest(test);
    }
    @GetMapping("/course/all")
    public List<Test> getAllCourses(){
        return service.retrieveAllTests();
    }
    @PutMapping("/course/update")
    public Test updateCourse(@RequestBody Test course){
        return  service.updateTest(course);
    }
    @GetMapping("/course/get/{id-course}")
    public Test getById(@PathVariable("num") Long num){
        return service.retrieveTest(num);
    }
}
