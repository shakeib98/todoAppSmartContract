pragma experimental ABIEncoderV2;

contract TodoTask{
    struct Task{
        uint256 timeStamp;
        string task;
        bool isCompleted;
    }
    mapping (address => Task[]) public taskToUser;
    Task[] private tasksAfterDeletion;
    
    function createTask(string memory _task) public {
        taskToUser[msg.sender].push(Task(now,_task,false));
    }
    
    function markTaskAsComplete(string memory _task) public {
        Task[] storage taskArrayTemp = taskToUser[msg.sender];
        Task memory taskTemp;
        uint32 counter = 0;
        for(counter; counter<taskArrayTemp.length;counter++){
            if(keccak256(abi.encodePacked(taskArrayTemp[counter].task)) == keccak256(abi.encodePacked(_task))){
                taskTemp = taskArrayTemp[counter];
                break;
            }
        }
        taskTemp.isCompleted = true;
        taskArrayTemp[counter] = taskTemp;
        taskToUser[msg.sender] = taskArrayTemp;
        
    }
    
    function deleteTask(string memory _task) public{
        Task[] memory taskArrayTemp = taskToUser[msg.sender];
        uint32 counter = 0;
        for(counter; counter<taskArrayTemp.length;counter++){
            if(keccak256(abi.encodePacked(taskArrayTemp[counter].task)) != keccak256(abi.encodePacked(_task))){
                tasksAfterDeletion.push(taskArrayTemp[counter]);
            }
        }
         taskToUser[msg.sender] = tasksAfterDeletion;
        
    }
    

}
