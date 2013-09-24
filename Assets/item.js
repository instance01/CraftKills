#pragma strict

function Update () {
	transform.Rotate(Vector3.up * Time.deltaTime * 40);
}