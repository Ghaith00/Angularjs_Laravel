<?php
class project {
    public $Name ;
    public $Pid ;
    public $User ;
    public $Tasks ;
    public $Status ;
    public $Deadline ;
}
class task {
    public $Name;
    public $Tid;
    public $ExUser;
    public $Status;
    public $Summary;
    public $Deadline;
}
$project1 = new project();
$project2 = new project();

$project1->Pid = "POCK1";
$project1->Name = "C++";
$project1->User = "Ghaith007";
$project1->Status = 0;
$project1->Deadline = "13-11-1884";
    $task1 = new task();
    $task2 = new task();
    $task3 = new task();
    $task4 = new task();

    $task4->Name = "clean the code";
    $task4->Tid = "54578";
    $task4->Status = 0;
    $task4->Summary = "fff jlk lklds";
    $task4->ExUser = "Ali";
    $task4->Deadline = "2015";

$task3->Name = "debug";
$task3->Tid = "45435";
$task3->Status = 1;
$task3->Summary = "deede efe";
$task3->ExUser = "azzza";
$task3->Deadline = "2018";

$task2->Name = "compile";
$task2->Tid = "54545";
$task2->Status = 2;
$task2->Summary = "effre";
$task2->ExUser = "guts";
$task2->Deadline = "2087";

$task1->Name = "wat";
$task1->Tid = "73868";
$task1->Status = 3;
$task1->Summary = "ededed";
$task1->ExUser = "bicha";
$task1->Deadline = "1993";

$project1->Tasks = array($task1,$task2,$task3,$task4) ;


$project2->Pid = "4dd56ee";
$project2->Name = "angularjs";
$project2->User = "Ghaith007";
$project2->Status = 1;
$project2->Deadline = "16-07-1578";
$task1 = new task();
$task2 = new task();
$task2->Name = "auth";
$task2->Tid = "454fer564fe";
$task2->Status = 1;
$task2->Summary = "dmllfemlfe";
$task2->ExUser = "ghj";
$task2->Deadline = "";

$task1->Name = "delete code";
$task1->Tid = "dds";
$task1->Status = 2;
$task1->Summary = "";
$task1->ExUser = "";
$task1->Deadline = "";

$project2->Tasks = array($task1,$task2) ;
$projects = array($project1,$project2);

echo json_encode($projects);