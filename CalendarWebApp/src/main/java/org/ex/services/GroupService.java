package org.ex.services;

import org.ex.models.Group;
import org.ex.models.dto.UserGroup;

import java.util.List;

public interface GroupService {

    List<Group> getAllGroups();

    boolean createGroup(Group group);

    boolean addUserToGroup(UserGroup userGroup);

    List<Group> getAllGroupsByUser(int userId);

    boolean deleteGroup(int groupId);

    boolean updateGroup(Group group);

}
