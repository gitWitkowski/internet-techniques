<?php

function my_autoloader($class) {
    include  $class . '.php';
}
  
spl_autoload_register('my_autoloader');
  
$user = new Register_new;

echo json_encode($user->_is_logged());
?>
