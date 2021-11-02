package serviceTests;

import org.ex.models.Group;
import org.ex.models.dto.UserGroup;
import org.ex.repositories.GroupDao;
import org.ex.services.GroupServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {GroupServiceImpl.class})
@ExtendWith(SpringExtension.class)
class GroupServiceImplTest {
    @MockBean
    private GroupDao groupDao;

    @Autowired
    private GroupServiceImpl groupServiceImpl;

    @Test
    void testConstructor() {
        assertTrue((new GroupServiceImpl(mock(GroupDao.class))).getAllGroups().isEmpty());
    }

    @Test
    void testGetAllGroups() {
        ArrayList<Group> groupList = new ArrayList<Group>(); //groupList of type Group in ArrayList
        when(this.groupDao.getAllGroups()).thenReturn(groupList);
        List<Group> actualAllGroups = this.groupServiceImpl.getAllGroups(); //actualAllGroups of type Group in List
        assertSame(groupList, actualAllGroups); // Asserts that two objects refer to the same object of type Group
        verify(this.groupDao).getAllGroups(); //verifying getAllGroups method
    }

    @Test
    void testCreateGroup() {
        Group group = new Group();
        group.setId(1);
        group.setDescription("The characteristics of someone or something");
        group.setGroup_name("Group name");
        group.setCreated_by(1);
        assertTrue(this.groupServiceImpl.createGroup(group)); //assert that createGroup method is functioning
        verify(this.groupDao).insertGroup(group.getGroup_name(), group.getDescription(), group.getId()); //verify groupDao is working with group created in method

    }

    @Test
    void testAddUserToGroup() {
        assertTrue(this.groupServiceImpl.addUserToGroup(new UserGroup(1, 1, 1))); //assert addUserToGroup method is working by passing in id, userId and groupId
        verify(this.groupDao).userIntoGroup(1, 1); //verify groupDao is working by passing in appropriate id values
    }


    @Test
    void testAddUserToGroup3() {

        UserGroup userGroup = mock(UserGroup.class); //using mockito to create a UserGroup userGroup
        when(userGroup.getUser_id()).thenReturn(1);
        when(userGroup.getGroup_id()).thenReturn(1);
        assertTrue(this.groupServiceImpl.addUserToGroup(userGroup)); //assert addUserToGroup method is working by setting assert to true
        verify(this.groupDao).userIntoGroup(1, 1); // verifying groupDao.userIntoGroup by id's of 1 that were return earlier in the method
        verify(userGroup).getGroup_id(); //verify groupId is 1
        verify(userGroup).getUser_id(); //verify userId is 1

    }

    @Test
    void testGetAllGroupsByUser() {
        ArrayList<Group> groupList = new ArrayList<Group>();
        when(this.groupDao.getGroupsByUser(anyInt())).thenReturn(groupList); //mocking and checking functionality of getGroupsByUser
        List<Group> actualAllGroupsByUser = this.groupServiceImpl.getAllGroupsByUser(123);
        assertSame(groupList, actualAllGroupsByUser); // Asserts that two objects refer to the same object of type Group
        verify(this.groupDao).getGroupsByUser(anyInt()); //mocking and checking functionality of getGroupsByUser

    }
}

