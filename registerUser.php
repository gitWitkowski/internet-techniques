<?php
function my_autoloader($class) {
    include  $class . '.php';
}
  
spl_autoload_register('my_autoloader');
    
$reg = new Register_new ;
$reg->_read();
echo $reg->_save();
?>