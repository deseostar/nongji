pragma solidity ^0.5.0;

contract NongJi {
    struct Inbox {
        uint id;
        bytes32 name;
        string message;
        bool exists;
    }
    mapping (uint => Inbox) public inboxInfo;

    address public owner;
    string public message;

    event LogSetMessage(
        uint _id,
        bytes32 _name,
        string _message
    );
    
    constructor() public {
        owner = msg.sender;
    }

    function getMessage(uint _id) public view returns(uint, bytes32, string memory, bool) {
        Inbox memory inbox = inboxInfo[_id];
        return (inbox.id, inbox.name, inbox.message, inbox.exists);
    }

    function setMessage(uint _id, bytes32 _name, string memory _message) public {
        require(_id >=0);
        require(!inboxInfo[_id].exists);
        
        inboxInfo[_id] = Inbox(_id, _name, _message, true);

        message = _message;
        emit LogSetMessage(_id, _name, message);
    }
}