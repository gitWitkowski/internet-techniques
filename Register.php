<?php
class Register {
protected $data = array() ; //nie jest widoczna na zewnątrz klasy i może być dziedziczona
function __construct () { //Wywoływana automatycznie podczas inicjalizacji obiektu
}
 
function _read () {
$this->data['fname'] = $_POST['fname'] ;//$_POST tablica superglobalna przechowująca dane przesłane metoda POST
$this->data['lname'] = $_POST['lname'] ;
$this->data['email'] = $_POST['email'] ;
$this->data['pass'] = $_POST['pass'] ;
}
 
function _write () {
echo "Wprowadzone dane (obiektowo) <br/>" ;
echo "Imię: ". $this->data['fname'] ." <br/>" ;
echo "Nazwisko: ". $this->data['lname'] ." <br/>" ;
echo "E-mail: ". $this->data['email'] ." <br/>" ;
echo "Hasło: ". $this->data['pass'] ." <br/>" ;
}
}
?>