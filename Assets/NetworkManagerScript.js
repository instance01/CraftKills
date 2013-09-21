#pragma strict

var playerPrefab : GameObject;

function Start () {

}

function Update () {

}

function startServer(){
	Network.InitializeServer(8, 25565, !Network.HavePublicAddress);
}

function OnServerInitialized(){
	Debug.Log("server successfully started");
	var gm:GameObject = Network.Instantiate(playerPrefab, new Vector3(0.0f, 0.0f, 0.0f), Quaternion.identity, 0);
	gm.name = "serverplayer";
	
	for (var cam:Camera in Camera.FindSceneObjectsOfType(typeof(Camera)))
   	{
    	cam.enabled = false;
    	Debug.Log("Disabled Camera: " + cam.name);
    }
	
	
	Debug.Log("Enabled player cam");
	gm.transform.Find("Main Camera").gameObject.camera.enabled = true;
	gm.transform.Find("Main Camera").gameObject.camera.active = true;
	
	//NPE:: !
	//var gm_:GameObject = GameObject.Find("serverplayer");
	//Debug.Log("Found: " + gm_.name);
	//gm_.transform.Find("Main Camera").gameObject.camera.enabled = false;

}

function OnConnectedToServer(){
	spawnPlayer();
}

function OnNetworkInstantiate(info: NetworkMessageInfo) {
	Debug.Log(networkView.viewID + " spawned");
	
	if(Network.isClient){
		var gm:GameObject = GameObject.Find("player");
		for (var cam:Camera in Camera.FindSceneObjectsOfType(typeof(Camera)))
	   	{
	    	cam.enabled = false;
	    	Debug.Log("Disabled Camera: " + cam.name);
	    }
	    
		Debug.Log("Enabled player cam");
		gm.transform.Find("Main Camera").gameObject.camera.enabled = true;
		gm.transform.Find("Main Camera").gameObject.camera.active = true;
	}else if(Network.isServer){
		var gm_:GameObject = GameObject.Find("serverplayer");
		for (var cam:Camera in Camera.FindSceneObjectsOfType(typeof(Camera)))
	   	{
	    	cam.enabled = false;
	    	Debug.Log("Disabled Camera: " + cam.name);
	    }
			
		Debug.Log("Enabled server cam");
		gm_.transform.Find("Main Camera").gameObject.camera.enabled = true;
		gm_.transform.Find("Main Camera").gameObject.camera.active = true;
	}
	
}

function spawnPlayer(){
	var gm:GameObject = Network.Instantiate(playerPrefab, new Vector3(0.0f, 0.0f, 0.0f), Quaternion.identity, 0);
	gm.name = "player";
	
	for (var cam:Camera in Camera.FindSceneObjectsOfType(typeof(Camera)))
   	{
    	cam.enabled = false;
    	Debug.Log("Disabled Camera: " + cam.name);
    }
		
	Debug.Log("Enabled player cam");
	gm.transform.Find("Main Camera").gameObject.camera.enabled = true;
	gm.transform.Find("Main Camera").gameObject.camera.active = true;
	
	//NPE:: !
	//var gm_:GameObject = GameObject.Find("serverplayer");
	//Debug.Log("Found: " + gm_.name);
	//gm_.transform.Find("Main Camera").gameObject.camera.enabled = false;
	
	//Debug.Log(Camera.allCameras.ToString);
			
	//player.GetComponent("CharacterController").enabled = false;
	//GameObject.Find("player(Clone)").transform.Find("Main Camera").gameObject.camera.enabled = false;
}

function OnGUI(){
	if(!Network.isClient && !Network.isServer){
		if(GUI.Button(Rect(55, 100, 180, 40), "Start Server")) {
		    startServer();
	    }
	
	    if(GUI.Button(Rect(55, 150, 180, 40), "Connect")) {
	    	Network.Connect("127.0.0.1", 25565);
	    }
	}
}


