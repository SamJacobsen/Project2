package serviceTests;

import org.ex.models.User;
import org.ex.models.UserType;
import org.ex.models.dto.LoginRequest;
import org.ex.models.dto.SessionUser;
import org.ex.models.dto.UpdateUser;
import org.ex.repositories.UserDao;
import org.ex.services.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {UserServiceImpl.class})
@ExtendWith(SpringExtension.class)
class UserServiceImplTest {
    @MockBean
    private UserDao userDao;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Test
    void testGetUserById() {
        User user = new User();
        user.setEmail("david.justice@example.org");
        user.setUser_password("yankees");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Justice");
        user.setFirst_name("David");
        user.setUser_name("dJustice");
        when(this.userDao.getUserById(1)).thenReturn(user); //<--return user of id 1
        assertSame(user, this.userServiceImpl.getUserById(1)); //asserting that user and getUserById(1) is the same
        verify(this.userDao).getUserById(1); // <-verifying this user exist with id 1
    }



    @Test
    void testGetUsersByGroup() {
        User user = new User();
        user.setEmail("john.doe@example.org");
        user.setUser_password("password");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Doe");
        user.setFirst_name("John");
        user.setUser_name("jDoe");

        ArrayList<User> userList = new ArrayList<User>();
        userList.add(user);
        when(this.userDao.getUsersByGroup(1)).thenReturn(userList);
        System.out.println(userList + " hellooooooooo");
        assertEquals(1, this.userServiceImpl.getUsersByGroup(1).size()); //userList size is of 1 element also getUserByGroup() is returning userList thus asserrtEquals 1
        verify(this.userDao).getUsersByGroup(1);
    }



    @Test
    void testRegisterNewUser() {
        User user = new User();
        user.setEmail("jane.doe@example.org");
        user.setUser_password("password");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Doe");
        user.setFirst_name("Jane");
        user.setUser_name("janeDoe");
        when(this.userDao.getUserByUserName("janeDoe")).thenReturn(user);

        User user1 = new User();
        user1.setEmail("jane.doe@example.org");
        user1.setUser_password("password");
        user1.setUser_type(UserType.MANAGER);
        user1.setId(1);
        user1.setLast_name("Doe");
        user1.setFirst_name("Jane");
        user1.setUser_name("janeDoe");
        assertFalse(this.userServiceImpl.registerNewUser(user1)); //asserting false because user janeDoe was already created
       verify(this.userDao).getUserByUserName("janeDoe"); //verify that a user off username janeDoe does indeed exist
    }

    @Test
    void testGetUserByUserName() {
        User user = new User();
        user.setEmail("super.man@example.org");
        user.setUser_password("kryptonite");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Kent");
        user.setFirst_name("Clark");
        user.setUser_name("SuperMan");
        when(this.userDao.getUserByUserName("SuperMan")).thenReturn(user);
        assertSame(user, this.userServiceImpl.getUserByUserName("SuperMan"));
        verify(this.userDao).getUserByUserName("SuperMan");
    }

    @Test
    void testUpdateUser() {
        assertTrue(this.userServiceImpl
                .updateUser(new UpdateUser(1, "Jane", "Doe", "SuperJane", "jane.doe@example.org", "iloveyou"))); //using assertTrue to validate funtionality of method updateUser
        verify(this.userDao).updateUserWithPass(1, "Jane", "Doe", "SuperJane", "jane.doe@example.org",
                "iloveyou"); //verification of updateUserWithPass from userDao
    }



    @Test
    void testValidateUser() {
        User user = new User();
        user.setEmail("jane.doe@example.org");
        user.setUser_password("hipToss");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Jackson");
        user.setFirst_name("Malik");
        user.setUser_name("theWrestler");
        SessionUser actualValidateUserResult = this.userServiceImpl.validateUser(user,
                new LoginRequest("theWrestler", "hipToss"));
        assertEquals("jane.doe@example.org", actualValidateUserResult.getEmail());
        assertEquals(UserType.MANAGER, actualValidateUserResult.getUser_type());
        assertEquals("theWrestler", actualValidateUserResult.getUser_name());
        assertEquals("Jackson", actualValidateUserResult.getLast_name());
        assertEquals(1, actualValidateUserResult.getId());
        assertEquals("Malik", actualValidateUserResult.getFirst_name());
    }


}

