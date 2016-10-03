<?php 
class notification {
	public $title ;
	public $details;
	public $type ;
}
$notif1 = new notification();
$notif1->title = 'modification';
$notif1->details = 'none';
$notif1->type = 'hello';
$notifs = array($notif1);
echo json_encode($notifs);

?>