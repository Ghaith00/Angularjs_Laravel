<?php
class Task {
    public $Tid ;
    public $Pid ;
    public $Pname;
    public $Name ;
    public $uid ;
    public $Status ;
    public $Summary ;
    public $Deadline ;
    public $User;
    public $ExUser;
}
$Tlist = new Task();
$Tlist->Tid = array("4cd54","47cd8","decddd","decdde","d5cdde","4dce54");
$Tlist->Pid = array("*p","*p","*aze-rty","*aze-rty","*aze-rty","*r");
$Tlist->Pname = array("Python","Python","c++","c++","c++","Ruby");
$Tlist->Name = array("Clean the code please","debug the programme","comment the facebook","ideas never come","free your mind","wat a.k.a what a shi't'");
$Tlist->uid = array("group1","group2","3","0","4","5");
$Tlist->Status = array(0,1,2,3,2,1);
$Tlist->Summary = array("azfrefry",",ukkyjy","k,u,ku","gegrthy0","frh(t(y","sddssdsds");
$Tlist->Deadline = array("2015","2016","2014","2014","2018","8015");
$Tlist->User = array("Ghaith","Ghaith","Ghaith","Ghaith","Ghaith","Ghaith");
$Tlist->ExUser = array("chambarlan","3imad","na7noulaha","sama7","najd","3sila");
echo json_encode($Tlist);