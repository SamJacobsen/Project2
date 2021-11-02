package org.ex.services;

import org.ex.models.Group;
import org.ex.models.dto.UserGroup;
import org.ex.repositories.GroupDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("GroupServiceImpl")
public class GroupServiceImpl implements GroupService{

    private GroupDao groupDao;

    @Autowired
    public GroupServiceImpl(GroupDao groupDao) {
        this.groupDao = groupDao;
    }

    @Override
    public List<Group> getAllGroups() {
        return this.groupDao.getAllGroups();
    }

    @Override
    public boolean createGroup(Group group) {
        try {
            String name = group.getGroup_name();
            String description = group.getDescription();
            int userId = group.getCreated_by();
            this.groupDao.insertGroup(name, description, userId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addUserToGroup(UserGroup userGroup) {
        try {
            int groupId = userGroup.getGroup_id();
            int userId = userGroup.getUser_id();
            this.groupDao.userIntoGroup(groupId, userId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Group> getAllGroupsByUser(int userId) {
        return this.groupDao.getGroupsByUser(userId);
    }

    @Override
    public boolean deleteGroup(int groupId) {
        Group g = this.groupDao.getGroupId(groupId);

        if(g != null) {
            try {
                this.groupDao.deleteUserGroupAssociation(groupId);
                this.groupDao.deleteGroup(groupId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean updateGroup(Group group) {
        Group g = this.groupDao.getGroupId(group.getId());

        if(g != null) {
            try {
                int id = group.getId();
                String name = group.getGroup_name();
                String description = group.getDescription();
                this.groupDao.updateGroup(id, name, description);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return false;
    }
}
