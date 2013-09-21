#pragma strict

function Start () {

}

function Update () {
	if(Camera.current != null)
    {
        Camera.current.transform.Translate(new Vector3(0.0f, 0.005f, 0.01f));
        if(Camera.current.transform.localPosition.z > 70){
        	Camera.current.transform.localPosition.z -= 70;
        }
    }
}


var newSkin : GUISkin;
var logoTexture : Texture2D;
var impact : Font;

function theFirstMenu() {
	var myStyle : GUIStyle = new GUIStyle();
    myStyle.font = impact;
    myStyle.fontSize = 40;
    myStyle.normal.textColor = Color.white;
    
    GUI.BeginGroup(Rect(Screen.width / 2 - 150, 50, 300, 200));
    GUI.Box(Rect(0, 0, 300, 200), "");
    GUI.Label(Rect(15, 10, 100, 70), logoTexture);
    GUI.Label(Rect(100, 20, 100, 70), "CraftKills", myStyle);
    
    if(GUI.Button(Rect(55, 100, 180, 40), "Start Game")) {
	    GetComponent.<Mainmenu>().enabled = false;
	    Application.LoadLevel(1);
    }
    //quit button
    if(GUI.Button(Rect(55, 150, 180, 40), "Quit")) {
    	Application.Quit();
    }

    GUI.EndGroup(); 
}

function OnGUI () {
    GUI.skin = newSkin;
    theFirstMenu();
}