var p : GameObject;

public function init(player_ : GameObject){
	this.p = player_;
}



public function die(){

}

public function respawn(){
	p.transform.position = new Vector3(0.0f, 0.0f, 0.0f);
	clearInventory();
}

public function clearInventory(){

}