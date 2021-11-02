package serviceTests;

import org.ex.models.*;
import org.ex.repositories.GroupDao;
import org.ex.repositories.TaskDao;
import org.ex.repositories.UserDao;
import org.ex.services.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {TaskServiceImpl.class})
@ExtendWith(SpringExtension.class)
class TaskServiceImplTest {
    @MockBean
    private GroupDao groupDao;

    @MockBean
    private TaskDao taskDao;

    @Autowired
    private TaskServiceImpl taskServiceImpl;

    @MockBean
    private UserDao userDao;

    @Test
    void testConstructor() {
        assertTrue(
                (new TaskServiceImpl(mock(UserDao.class), mock(TaskDao.class), mock(GroupDao.class))).getAllTasks().isEmpty());
    }

    @Test
    void testGetAllTasks() {
        ArrayList<Task> taskList = new ArrayList<Task>();// <-taskList is arraylist
        when(this.taskDao.getAllTasks()).thenReturn(taskList); // <--returning tasklist
        List<Task> actualAllTasks = this.taskServiceImpl.getAllTasks(); //actualAllTask now a List
        assertSame(taskList, actualAllTasks); //taskList and getALLTask are of type List
        assertTrue(actualAllTasks.isEmpty()); //actualAllTask should be empty at the moment
        verify(this.taskDao).getAllTasks(); //can technically retrieve getAllTasks even though its empty
    }

    @Test
    void testGetTaskById() {
        Task task = new Task();
        task.setMinutes_worked(20);
        task.setStatus(TaskStatus.COMPLETED);
        task.setUser_id(1);
        task.setTask_name("The cool task");
        task.setId(1);
        task.setGroup_id(1);
        task.setDescription("lets do cool stuff today");
        task.setStart_date(mock(Timestamp.class));
        task.setEnd_date(mock(Timestamp.class));
        when(this.taskDao.getTaskById(1)).thenReturn(task); // <-- returning task with id of 1
        assertSame(task, this.taskServiceImpl.getTaskById(1)); //asserting validation with task of id 1
        verify(this.taskDao).getTaskById(1); // verifying we can get task by id 1
       // assertTrue(this.taskServiceImpl.getAllTasks().isEmpty());
    }

    @Test
    void testGetTasksByUserId() {
        ArrayList<Task> taskList = new ArrayList<Task>();
        when(this.taskDao.getTasksByUserId(anyInt())).thenReturn(taskList);
        List<Task> actualTasksByUserId = this.taskServiceImpl.getTasksByUserId(1);
        assertSame(taskList, actualTasksByUserId); //<-asserting same are of type Task and are in list
        //assertTrue(actualTasksByUserId.isEmpty());
        verify(this.taskDao).getTasksByUserId(anyInt()); //<-verifying we can get task by user id of 1
        //assertTrue(this.taskServiceImpl.getAllTasks().isEmpty());
    }

    @Test
    void testGetTasksByGroupId() {
        ArrayList<Task> taskList = new ArrayList<Task>();
        when(this.taskDao.getTasksByGroupId(1)).thenReturn(taskList);
        List<Task> actualTasksByGroupId = this.taskServiceImpl.getTasksByGroupId(1);
        assertSame(taskList, actualTasksByGroupId); //both group id's are the same both list are technically identical
        assertTrue(actualTasksByGroupId.isEmpty()); //list is actually empty at the moment
        verify(this.taskDao).getTasksByGroupId(1); //can verify through groupId which was set at 1
        assertTrue(this.taskServiceImpl.getAllTasks().isEmpty()); //no tasks are actually in getAllTasks at the moment
    }

    @Test
    void testCreateTask() {
        User user = new User();
        user.setEmail("joe.torre@yankee.org");
        user.setUser_password("yankees");
        user.setUser_type(UserType.MANAGER);
        user.setId(1);
        user.setLast_name("Torre");
        user.setFirst_name("Joe");
        user.setUser_name("ManagerofYankees");
        when(this.userDao.getUserById(1)).thenReturn(user); // should return user Joe Torre, id set to 1
        doNothing().when(this.taskDao)
                .insertNewUserTask((Integer) any(), (String) any(), (String) any(), (Timestamp) any(), (Timestamp) any());

        Task task = new Task();
        task.setMinutes_worked(1);
        task.setStatus(TaskStatus.COMPLETED);
        task.setUser_id(1);
        task.setTask_name("Task name");
        task.setId(1);
        task.setGroup_id(1);
        task.setDescription("The characteristics of someone or something");
        task.setStart_date(mock(Timestamp.class));
        task.setEnd_date(mock(Timestamp.class));
        assertTrue(this.taskServiceImpl.createTask(task)); //asserting that task was created
        verify(this.userDao).getUserById(1); // verification we can get user by id of 1
    }


    @Test
    void testUpdateTask() {

        Task task = new Task();
        task.setMinutes_worked(1);
        task.setStatus(TaskStatus.COMPLETED);
        task.setUser_id(1);
        task.setTask_name("taskName");
        task.setId(1);
        task.setGroup_id(1);
        task.setDescription("The characteristics of someone or something");
        task.setStart_date(mock(Timestamp.class));
        task.setEnd_date(mock(Timestamp.class));
        assertTrue(this.taskServiceImpl.updateTask(task)); //true neither group id or user id is null therefore task exist and can be updated
    }

    @Test
    void testUpdateTask2() {

        Task task = new Task();
        task.setMinutes_worked(1);
        task.setStatus(TaskStatus.COMPLETED);
        task.setUser_id(null);
        task.setTask_name("Task name");
        task.setId(1);
        task.setGroup_id(null);
        task.setDescription("The characteristics of someone or something");
        task.setStart_date(mock(Timestamp.class));
        task.setEnd_date(mock(Timestamp.class));
        assertFalse(this.taskServiceImpl.updateTask(task)); //asserting false because both user_id and group_id are null indicating its a new task and not an existing task that can be updated
    }

    @Test
    void testDeleteTask() { //deleting task by id
        assertTrue(this.taskServiceImpl.deleteTask(1));
        verify(this.taskDao).deleteTask(1);
        assertTrue(this.taskServiceImpl.getAllTasks().isEmpty());
    }

}

