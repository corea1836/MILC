package com.jpmp.api.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@Api(tags = {"HelloController API"})
@RequiredArgsConstructor
public class HelloController {

    @GetMapping(value = "/api/test")
    public ResponseEntity<?> test(HttpServletRequest request) throws Exception {
        String reqUrl = "test";
        return ResponseEntity.ok().body(reqUrl);
    }




}
