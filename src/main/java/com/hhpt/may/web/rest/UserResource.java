package com.hhpt.may.web.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserResource {
	
	@RequestMapping("/home")
	public ResponseEntity<String> home(){
		return new ResponseEntity<String>("Hello Hien Duc Vo",HttpStatus.OK);
	}

}
