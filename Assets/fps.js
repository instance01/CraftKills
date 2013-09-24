public var startRect : Rect = Rect( 10, 100, 75, 50 );
var updateColor : boolean = true;
var allowDrag : boolean = true;
var frequency : float = 0.5;
var nbDecimal : int = 1;
 
private var accum : float = 0;
private var frames : int = 0;
private var color : Color = Color.white;
private var sFPS : String= "";
private var style : GUIStyle;
 
function Start()
{
	accum = 0f;
	frame = 1;

    while( Application.isPlaying )
    {
        var fps : float = accum / (frames > 0 ? frame : 1);
        sFPS = fps.ToString( "f" + Mathf.Clamp( nbDecimal, 0, 10 ) );
 
        color = (fps >= 30) ? Color.green : ((fps > 10) ? Color.red : Color.yellow);
 
        accum = 0;
        frames = 0;
 
        yield WaitForSeconds( frequency );
    }
}
 
function Update()
{
    accum += Time.timeScale/ Time.deltaTime;
    ++frames;
}
 
function OnGUI()
{
    if( style == null ){
        style = GUIStyle( GUI.skin.label );
        style.normal.textColor = Color.white;
        style.alignment = TextAnchor.MiddleCenter;
    }
 
    GUI.color = updateColor ? color : Color.white;
    startRect = GUI.Window(0, startRect, DoMyWindow, "");
}
 
function DoMyWindow( windowID : int )
{
    GUI.Label( Rect(0, 0, startRect.width, startRect.height), sFPS + " FPS", style );
    if( allowDrag ) GUI.DragWindow(Rect(0, 0, Screen.width, Screen.height));
}