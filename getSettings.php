<?php
function my_autoloader($class) {
    include  $class . '.php';
}
  
spl_autoload_register('my_autoloader');
    
$reg = new Register_new ;

echo $reg->_get_settings();
?>