package org.ex.controllers;

import org.ex.models.Group;
import org.ex.models.dto.UserGroup;
import org.ex.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "group")
@CrossOrigin(origins = "${angular.url}")
public class GroupController {

    private GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = this.groupService.getAllGroups();

        if(groups != null) {
            if(groups.size() > 0) {
                return ResponseEntity.ok().body(groups);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping(path = "/new")
    @Transactional
    public ResponseEntity createGroup(@RequestBody Group group) {
        System.out.println(group);

        boolean status = this.groupService.createGroup(group);

        if(status) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(path = "/user/add")
    @Transactional
    public ResponseEntity addUserToGroup(@RequestBody UserGroup userGroup) {

        boolean status = this.groupService.addUserToGroup(userGroup);

        if(status) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "/user/{id}")
    public ResponseEntity<List<Group>> getUsersGroups(@PathVariable int id) {
        List<Group> groups = this.groupService.getAllGroupsByUser(id);

        if(groups != null) {
            if(groups.size() > 0) {
                return ResponseEntity.ok().body(groups);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping(path = "/update")
    @Transactional
    public ResponseEntity updateGroup(@RequestBody Group group) {

        boolean status = this.groupService.updateGroup(group);

        if(status) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping(path = "/delete/{id}")
    @Transactional()
    public ResponseEntity deleteGroup(@PathVariable int id) {

        boolean status = this.groupService.deleteGroup(id);

        if(status) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(409).build();
    }

}
