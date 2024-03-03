<?php
  
//require 'vendor/autoload.php' ;
  
class db {
    private $user = "1witkowski" ;
    private $pass = "pass";
    private $host = "172.20.44.25";
    private $base = "1witkowski";
    private $coll = "projekt";
    private $conn;
    private $dbase;
    private $collection;
  
  
  
    function __construct() {
      $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");    
      $this->collection = $this->conn->{$this->base}->{$this->coll};
    }
  
    function select_user_settings($userName) {
           $cursor = $this->collection->find(['user' => $userName]);
         $table = iterator_to_array($cursor);
         return $table ;
       }

    function user_exists($userName) {
        $cursor = $this->collection->find(['email' => $userName]);//wynik obejmuje wszystkie atrybuty oprócz _id    
        $table = iterator_to_array($cursor);
        return (count($table)>0);
    } 

    function auth_pass($userName, $pass) {
        $record = $this->collection->findOne(['email' => $userName]);//wynik obejmuje wszystkie atrybuty oprócz _id    
        $passInDB = $record['pass'];
        return password_verify($pass, $passInDB);
    } 
  
    function insert($user) {
      $ret = $this->collection->insertOne($user) ;
      return $ret;
    }
}
?>