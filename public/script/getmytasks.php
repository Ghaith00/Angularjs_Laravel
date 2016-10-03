<?php
class Task {
    public $Tid;
    public $Pname;
    public $Name ;
    public $Status ;
    public $Summary ;
    public $Deadline ;
    public $User;
    public $ExUser;
}
$task1 = new Task();
$task2 = new Task();


$task1->Tid ="454";
$task1->Pid = "*p";
$task1->Pname = "Python";
$task1->Name = "Clean the code please";
$task1->Status = 0;
$task1->Summary = "azfrefry";
$task1->Deadline = "2015-11-5";
$task1->User = "bo7a";
$task1->ExUser = "ddd";

$task2->Tid = "478";
$task2->Pid = "*p";
$task2->Pname = "Python";
$task2->Name = "debug the programme";
$task2->Status = 1;
$task2->Summary = "fff f f ukkyjy";
$task2->Deadline = "2016-11-5";
$task2->User = "7anafi";
$task2->ExUser = "Dalio";

$tasks = array($task1,$task2);
echo json_encode($tasks);