package com.example.backend.Service;

import com.example.backend.Entity.Test;
import com.example.backend.Repository.TestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class service  {
    private final TestRepository TestRepository;

    public List<Test> retrieveAllTests() {
        return TestRepository.findAll();
    }

    public Test addTest(Test test) {
        return TestRepository.save(test);
    }


    public Test updateTest(Test test) {
        return TestRepository.save(test);
    }


    public Test retrieveTest(Long numC) {
        return TestRepository.findById(numC).orElse(null);
    }
}
