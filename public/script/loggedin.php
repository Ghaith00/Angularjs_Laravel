<?php
/**
 * Created by PhpStorm.
 * User: Ghaith
 * Date: 10/08/2016
 * Time: 16:23
 */
class User {
    public $username;
    public $email;
    public $lastname;
    public $name;
    public $onAuth ;
}
$user = new User();
$user->username = 'Ghaith007';
$user->email = 'me@me.com';
$user->name = 'Ghaith';
$user->lastname = 'Tabib';
$user->onAuth = true ;
echo json_encode($user);
?>