#pragma strict

var p_ : GameObject;
var pclass : player;

var score_ = 0;
var blocks = 0;

var weapon:String = "default";

function Awake(){
	if (!networkView.isMine)
        enabled = false;
        
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

function Start () {
	if(networkView.isMine){
		Screen.lockCursor = true;
		if(Network.isClient){
			p_ = GameObject.Find("player");
		}else if(Network.isServer){
			p_ = GameObject.Find("serverplayer");
		}
			
		pclass = new player();
		pclass.init(p_);
	
		/*for(var fooObj : GameObject in GameObject.FindGameObjectsWithTag("Player"))
		{
		    if(fooObj.networkView.isMine)
		    {
		        p_ = fooObj;
		    }else{
		    	Camera.mainCamera.GetComponent.<MouseLook>().enabled = false;
				GetComponent.<MouseLook>().enabled = false;
				GetComponent.<FPSInputController>().enabled = false;
				GetComponent.<main>().enabled = false;
				
				Debug.Log("removed player");
				
				fooObj.transform.Find("Main Camera").gameObject.camera.enabled = false;
				fooObj.networkView.camera.enabled = false;
		    }
		}*/
		
		p_.transform.Find("Main Camera").gameObject.camera.active = true;
        var viewid = p_.networkView.viewID;
        Debug.Log("me: " + viewid);
		
		Screen.showCursor = false;
		Screen.lockCursor = true;
		for(var x = 0; x < 10; x++){
			for(var y = 0; y < 10; y++){
				var cube : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				cube.transform.position = Vector3(x, y, 40);
				cube.transform.localScale = Vector3 (1, 1, 1);
			}
		}	
	}
	
}


function Update () {
	GameObject.Find("leg1").animation.Play();
	GameObject.Find("leg2").animation.Play();
	if(networkView.isMine){
		if(p_.transform.localPosition.y < -100){
			pclass.respawn();
			sendChat("Player died.");
		}
		if (Input.GetKeyDown (KeyCode.Escape)){
			if(showpause){
				showpause = false;
				Time.timeScale = 1.0;
				Camera.mainCamera.GetComponent.<MouseLook>().enabled = true;
				GetComponent.<MouseLook>().enabled = true;
				Screen.lockCursor = true;
				Screen.showCursor = false;
			}else{
				showpause = true;
				Time.timeScale = 0.0;
				Camera.mainCamera.GetComponent.<MouseLook>().enabled = false;
				GetComponent.<MouseLook>().enabled = false;
				Screen.lockCursor = false;
				Screen.showCursor = true;
			}
		}
		
		if(Input.GetMouseButton(0)){
			GameObject.Find("arm").animation.Play();
			
			var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			var hit : RaycastHit;
			if (Physics.Raycast (ray, hit, 100)) {
			    Debug.DrawLine (ray.origin, hit.point);
			    
			    
			    if(weapon == "laser"){
				    var lineRenderer : LineRenderer = GameObject.Find("line").GetComponent(LineRenderer);
				    lineRenderer.useWorldSpace = false;
				    lineRenderer.SetVertexCount(2);
	
				    lineRenderer.SetPosition(1,Vector3(0,0,hit.distance));
			    }
			    
			    
			    var cube:GameObject = Network.Instantiate(Resources.Load("Cube"), hit.point, Quaternion.identity, 0);
			    
			    
			    //var cube : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
				//cube.transform.position = hit.point;
				//cube.transform.localScale = Vector3 (1, 1, 1);
				cube.renderer.material.color = Color(Random.value,Random.value,Random.value);
				blocks += 1;
			}
		}
		
		score_ = p_.transform.position.y;
	}
	
	
}


function sendChat(msg){
	print(msg);
}









// pause:

var showpause : boolean = false;
var newSkin : GUISkin;
var logoTexture : Texture2D;
var impact : Font;

function pause() {
	var myStyle : GUIStyle = new GUIStyle();
    myStyle.font = impact;
    myStyle.fontSize = 40;
    myStyle.normal.textColor = Color.white;
    
    GUI.BeginGroup(Rect(Screen.width / 2 - 150, 50, 300, 200));
    GUI.Box(Rect(0, 0, 300, 200), "");
    GUI.Label(Rect(15, 10, 100, 70), logoTexture);
    GUI.Label(Rect(100, 20, 100, 70), "CraftKills", myStyle);
    
    if(GUI.Button(Rect(55, 100, 180, 40), "Resume")) {
	    showpause = false;
		Time.timeScale = 1.0;
		Camera.mainCamera.GetComponent.<MouseLook>().enabled = true;
		GetComponent.<MouseLook>().enabled = true;
		Screen.lockCursor = true;
		Screen.showCursor = false;
    }
    //quit button
    if(GUI.Button(Rect(55, 150, 180, 40), "Quit")) {
    	Application.Quit();
    }

    GUI.EndGroup(); 
}

function score() {
	var myStyle : GUIStyle = new GUIStyle();
    myStyle.font = impact;
    myStyle.fontSize = 40;
    myStyle.normal.textColor = Color.white;
    
    GUI.BeginGroup(Rect(10, 10, 300, 200));
    GUI.Label(Rect(10, 10, 300, 200), "Score: " + score_, myStyle);
    GUI.Label(Rect(10, 50, 300, 200), "Blocks: " + blocks, myStyle);
    if(Network.isClient){
    	GUI.Label(Rect(10, 100, 300, 200), "Connected", myStyle);
    }

    GUI.EndGroup(); 
}

function OnGUI () {
    GUI.skin = newSkin;
    //score();
    if(showpause){
    	pause();
    }else{
    	score();
    }
}