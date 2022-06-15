// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract TodoList {
    struct MyStruct {
        string text;
        string detail;
        bool completed;
    }
    
    MyStruct[] public todos;

    function create(string memory _todo, string memory _detail) public {
        todos.push(MyStruct(_todo, _detail, false));
    }

    function update(uint _index, string memory _todo, string memory _detail) public {
        MyStruct storage t = todos[_index];
        t.text = _todo;
        t.detail = _detail;
    }

    function toggle(uint _index) public {
        MyStruct storage t = todos[_index];
        t.completed = !t.completed;
    }

    function get(uint _index) public view returns (string memory) {
        return todos[_index].detail;
    }

}