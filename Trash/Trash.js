
let canvas, gl;
let vpMatrix, mMatrix, nMatrix, mvpMatrix;
let model;
let rotateX = 0.0;
let rotateY = 0.0;
let userAngle = 8;
let zoom = -8.0;
let texLoaded = [];

//animate trash
let trash = false;
let moveRoombax = 0.0;
let moveRoombay = 0.0;
let moveRoombaz = 0.0;
let userMovement = true;
let count = 0;
let roombaR = 0;

let exists1 = 1;
let exists2 = 1;
let exists3 = 1;
let exists4 = 1;
let exists5 = 1;
let exists6 = 1;
let exists7 = 1;
let exists8 = 1;
let exists9 = 1;

function main() {
	canvas = document.getElementById('webgl');
	if (!(gl = canvas.getContext('webgl'))) {
		console.log('TERMINIATING: Failed to get the rendering context for WebGL');
		return;
	}

	if(!genShaderPrograms()){
		console.log('TERMINIATING: Failed to build all the shaders');
		return;
	}
	setAttribUniformLocations();
	addModels();
	if(!initVertexBuffers(gl)){
		console.log('TERMINATED: Failed to set the vertex information');
		return;
	}
	hud = document.getElementById('hud');
	ctx = hud.getContext('2d');

	initTextures();
	setDrawingDefaults()
	drawHUD();

	vpMatrix = new Matrix4();
	vpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
	vpMatrix.lookAt(2.5, 2.5, 8.75, 0, 0, 0, 0, 1, 0);
	mvpMatrix = new Matrix4();
	mMatrix   = new Matrix4();
	nMatrix   = new Matrix4();

	setProjection();

	function userRotate(e){
		switch(e.keyCode) {
			case 68:
					rotateX -= 2;
					rotateX %= 360;
					break;
			case 87:
					rotateY += 2;
      		rotateY %= 360; //up
					break;
			case 65:
					rotateX += 2;
					rotateX %= 360;
					break;
			case 83:
					rotateY -= 2;
					rotateY %= 360;
				 	break;

			setProjection();
		}
	}

	function setProjection() {
		var aspect = canvas.width / canvas.height;
		vpMatrix.setPerspective(30, aspect, 1, 100);
		vpMatrix.lookAt(0, userAngle, zoom, 0, 0, 0, 0, 1, 0);
		vpMatrix.rotate(rotateX, 0, 1, 0);
		vpMatrix.rotate(rotateY, 1, 0, 0);
	}

	function userZoom(e){
		switch(e.keyCode) {
			case 90: zoom = zoom--;
			break;
			case 88: zoom = zoom++;
			break;
		}
	}

	window.addEventListener("keydown" , userRotate, true);
	window.addEventListener("keydown", userZoom, true);
	window.addEventListener("keydown", MoveRoomba, true);

	var tick = function() {
		update();
		roombaR += 5;
    vpMatrix.rotate(0, 0, 1, 0);
		setProjection();
		drawScene();
		requestAnimationFrame(tick);
	}
	tick();
}
function MoveRoomba(e){
	switch(e.keyCode) {
		case 74: if(userMovement){
      moveRoombax = moveRoombax + 0.05;
    }
		break;

		case 76:if(userMovement){
      moveRoombax = moveRoombax - 0.05;
    }
		break;

		case 75: if(userMovement){
      moveRoombaz = moveRoombaz- 0.05;
    }
		break;

		case 73: if(userMovement){
      moveRoombaz = moveRoombaz + 0.05;
    }
		break;

		case 69: if(userMovement) {
			if((Math.abs(moveRoombax + 0.8) <= 0.2) &&
				 (Math.abs(moveRoombaz - 0.1) <= 0.2)) {
					 console.log("hit");
					 exists1 = 0.0;
					 drawScene();
				 }
				 if((Math.abs(moveRoombax - 1.4) <= 0.2) &&
	 				 (Math.abs(moveRoombaz + 0.9) <= 0.2)) {
	 					 console.log("hit");
	 					 exists2 = 0.0;
	 					 drawScene();
	 				 }
					 if((Math.abs(moveRoombax - 0.8) <= 0.2) &&
		 				 (Math.abs(moveRoombaz + 0.6) <= 0.2)) {
		 					 console.log("hit");
		 					 exists3 = 0.0;
		 					 drawScene();
		 				 }
						 if((Math.abs(moveRoombax + 0.8) <= 0.2) &&
			 				 (Math.abs(moveRoombaz + 0.9) <= 0.2)) {
			 					 console.log("hit");
			 					 exists4 = 0.0;
			 					 drawScene();
			 				 }
							 if((Math.abs(moveRoombax + 0.8) <= 0.2) &&
				 				 (Math.abs(moveRoombaz - 0.5) <= 0.2)) {
				 					 console.log("hit");
				 					 exists5 = 0.0;
				 					 drawScene();
				 				 }
								 if((Math.abs(moveRoombax + 0.9) <= 0.2) &&
					 				 (Math.abs(moveRoombaz + 0.1) <= 0.2)) {
					 					 console.log("hit");
					 					 exists6 = 0.0;
					 					 drawScene();
					 				 }
									 if((Math.abs(moveRoombax + 0.9) <= 0.2) &&
						 				 (Math.abs(moveRoombaz - 0.8) <= 0.2)) {
						 					 console.log("hit");
						 					 exists7 = 0.0;
						 					 drawScene();
						 				 }
										 if((Math.abs(moveRoombax - 1.0) <= 0.2) &&
							 				 (Math.abs(moveRoombaz - 0.6) <= 0.2)) {
							 					 console.log("hit");
							 					 exists8 = 0.0;
							 					 drawScene();
							 				 }
											 if((Math.abs(moveRoombax - 1.5) <= 0.2) &&
								 				 (Math.abs(moveRoombaz + 0.1) <= 0.2)) {
								 					 console.log("hit");
								 					 exists9 = 0.0;
								 					 drawScene();
								 				 }
		}
		break;
	}

}
function drawHUD() {
	ctx.clearRect(0, 0, 400, 400);
	ctx.font = '20px "Arial"';
	ctx.fillStyle = 'rgba(1, 1, 1, 1)';
	ctx.fillText('Roomba Simulator', 175, 25);
}

function drawScene(){
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// Draw the Bottom Platform
	mvpMatrix.set(vpMatrix);
	mMatrix.setIdentity();
	mMatrix.scale(1.7, 0.005, 1.7);
	mMatrix.translate(0.0, 0.05, -0.01);
	mvpMatrix.multiply(mMatrix);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	gl.useProgram(gl.program2);
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
	gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	gl.uniform4f(gl.program2.u_MatColor, 1, 1, 1, 0);
	drawCube();

	//Draw Roomba
	mvpMatrix.set(vpMatrix);
	mMatrix.setIdentity();
	mMatrix.translate(moveRoombax, 0.1, moveRoombaz);
	mMatrix.scale(0.3, 0.08, 0.3);
	mMatrix.rotate(roombaR, 0.0, 1.0, 0.0);
	mvpMatrix.multiply(mMatrix);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();

	if(texLoaded[2]){
 		gl.useProgram(gl.program3);
 		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 2);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  //RED
	}
  else {
	    gl.useProgram(gl.program1);
			gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
			gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
			gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCylinder();

	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(-0.8, 0.02, 0.1);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists1 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();
	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
	 mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	 mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(1.4, 0.02, -0.9);
	 mMatrix.scale(0.1, -0.009, 0.07);
	 mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	 nMatrix.setInverseOf(mMatrix);
	 nMatrix.transpose();
	 if(texLoaded[3] && exists2 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
	 drawCube();
	 //draw garbage(s) AND ALOT OF EM
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.8, 0.02, -0.6);
	mMatrix.scale(0.1, -0.009, 0.07);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
  gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[3] && exists3 == 1) {
 		gl.useProgram(gl.program3);
 		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
 		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
 		gl.uniform1i(gl.program3.u_Sampler, 3);
 		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
 	}
 	else {
 			 gl.useProgram(gl.program2);
 			 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
 			 gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
 			 gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
 			 gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
 	 }
	 drawCube();
	 //draw garbage(s) AND ALOT OF EM
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(-0.8, 0.02, -0.9);
	mMatrix.scale(0.1, -0.009, 0.07);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[3] && exists4 == 1) {
 		gl.useProgram(gl.program3);
 		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
 		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
 		gl.uniform1i(gl.program3.u_Sampler, 3);
 		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
 	}
 	else {
 			 gl.useProgram(gl.program2);
 			 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
 			 gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
 			 gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
 			 gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
 	 }
	 drawCube();

	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(-0.8, 0.02, 0.5);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists5 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();

   /* --------------------------------------------- */
	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(-0.9, 0.02, -0.1);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists6 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();

	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(-0.9, 0.02, 0.8);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists7 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();

	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(1.0, 0.02, 0.6);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists8 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();

	 //draw garbage(s) AND ALOT OF EM
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(1.5, 0.02, -0.1);
   mMatrix.scale(0.1, -0.009, 0.07);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[3] && exists9 == 1) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 3);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program2);
				gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
				gl.uniform4f(gl.program2.u_MatColor, 0.0, 0.0, 0.0, 0.0);
		}
   drawCube();

	 //Draw the top left lamp post
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(1.6, 0.65, 1.6);
   mMatrix.scale(0.05, 0.65, 0.05);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0, 0, 0, 1.0);
   drawCylinder();

	 //Draw the lamp post bottom right
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
	 mMatrix.translate(-1.6, 0.65, -1.6);
   mMatrix.scale(0.05, 0.65, 0.05);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0, 0, 0, 1.0);
   drawCylinder();

	 //Draw the lamp bottom left
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(1.6, 0.65, -1.6);
   mMatrix.scale(0.05, 0.65, 0.05);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0, 0, 0, 1.0);
   drawCylinder();

	 //Draw the lamp post bottom lefty
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(-1.6, 0.65, 1.6);
   mMatrix.scale(0.05, 0.65, 0.05);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
  if(texLoaded[2]){
 	gl.useProgram(gl.program3);
 	gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
 	gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
 	gl.uniform1i(gl.program3.u_Sampler, 2);
 	gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);  //RED
  }
  else {
 	gl.useProgram(gl.program1);
     gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
     gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
     gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
  }
  drawCylinder();

	 //Draw top left lamp light
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(1.6, 1.4, 1.6);
   mMatrix.scale(0.2, 0.2, 0.2);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0.941, 0.882, 0, 1.0);
   drawSphere20();


	 //Draw bottom right lamp light
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(-1.6, 1.4, -1.6);
   mMatrix.scale(0.2, 0.2, 0.2);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0.941, 0.882, 0, 1.0);
   drawSphere20();


	 //Draw bottom left lamp post
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(-1.6, 1.4, 1.6);
   mMatrix.scale(0.2, 0.2, 0.2);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);
	 gl.uniform4f(gl.program2.u_MatColor, 0.941, 0.882, 0, 1.0);
   drawSphere20();

	 //Draw top right lamp light
   mvpMatrix.set(vpMatrix);
   mMatrix.setIdentity();
   mMatrix.translate(1.6, 1.4, -1.6);
   mMatrix.scale(0.2, 0.2, 0.2);
   mvpMatrix.multiply(mMatrix);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();

	 gl.useProgram(gl.program2);
   gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_NormalMatrix, false, nMatrix.elements);
   gl.uniformMatrix4fv(gl.program2.u_ModelMatrix, false, mMatrix.elements);

	 gl.uniform4f(gl.program2.u_MatColor, 0.941, 0.882, 0, 1.0);
   drawSphere20();


	 //draw legs for chair
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.5, 0.15, 1.5);
   mMatrix.scale(0.04, 0.15, 0.04);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //draw legs for chair
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.8, 0.15, 1.5);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
  }
	else {
	  gl.useProgram(gl.program1);
		gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();

	 //draw legs for chair  USE THIS
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.8, 0.15, 1.2);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	 else {
		gl.useProgram(gl.program1);
		gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();

	 //draw legs for chair
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.5, 0.15, 1.2);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
  gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	else {
		gl.useProgram(gl.program1);
		gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();

	 //chair seat
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.65, 0.3, 1.35);
   mMatrix.scale(0.180, -0.009, 0.180);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //chair back
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.65, -1.55, 0.53);
   mMatrix.scale(0.180, -0.009, 0.24);
	 mvpMatrix.rotate(-90, 1, 0, 0);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //second chair
	 //draw legs for chair
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.0, 0.15, 1.5);
   mMatrix.scale(0.04, 0.15, 0.04);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //draw legs for chair
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.3, 0.15, 1.5);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	 else {
		gl.useProgram(gl.program1);
		gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
	  gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();

	 //draw legs for chair  USE THIS
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.3, 0.15, 1.2);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
  nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	else {
		gl.useProgram(gl.program1);
		gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
  drawCube();

	 //draw legs for chair
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(0.0, 0.15, 1.2);
	mMatrix.scale(0.04, 0.15, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[0]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 0);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	 else {
			 gl.useProgram(gl.program1);
			 gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
			 gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
			 gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();

	 //chair seat
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.15, 0.3, 1.35);
   mMatrix.scale(0.180, -0.009, 0.180);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //chair back
	 gl.useProgram(gl.program2);
   mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
   mMatrix.setIdentity();				//reset model and add transformations
	 mMatrix.translate(0.15, -1.55, 0.53);
   mMatrix.scale(0.180, -0.009, 0.24);
	 mvpMatrix.rotate(-90, 1, 0, 0);
   mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
 	 gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
   nMatrix.setInverseOf(mMatrix);
   nMatrix.transpose();
	 if(texLoaded[0]) {
		 gl.useProgram(gl.program3);
		 gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		 gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		 gl.uniform1i(gl.program3.u_Sampler, 0);
		 gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
		}
		else {
		  	gl.useProgram(gl.program1);
				gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
				gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
		}
   drawCube();

	 //draw table for chair
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(-0.5, 0.45, 1.15);
	mMatrix.scale(0.25, 0.05, 0.25);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[4]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 4);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	else {
	  gl.useProgram(gl.program1);
	  gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
		gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
  drawCube();

	 //draw stem for table
	gl.useProgram(gl.program2);
	mvpMatrix.set(vpMatrix);				//mvp starts with copy of vpMatrix
	mMatrix.setIdentity();				//reset model and add transformations
	mMatrix.translate(-0.5, 0.23, 1.2);
	mMatrix.scale(0.04, 0.20, 0.04);
	mvpMatrix.multiply(mMatrix);			//combine with vpMatrix
	gl.uniformMatrix4fv(gl.program2.u_MvpMatrix, false, mvpMatrix.elements);
	nMatrix.setInverseOf(mMatrix);
	nMatrix.transpose();
	if(texLoaded[4]) {
		gl.useProgram(gl.program3);
		gl.uniformMatrix4fv(gl.program3.u_MvpMatrix, false, mvpMatrix.elements);
		gl.uniformMatrix4fv(gl.program3.u_NormalMatrix, false, nMatrix.elements);
		gl.uniform1i(gl.program3.u_Sampler, 4);
		gl.uniform4f(gl.program3.u_MatColor, 1.0, 1.0, 1.0, 1.0);
	}
	 else {
			 gl.useProgram(gl.program1);
			 gl.uniformMatrix4fv(gl.program1.u_MvpMatrix, false, mvpMatrix.elements);
			 gl.uniformMatrix4fv(gl.program1.u_NormalMatrix, false, nMatrix.elements);
			 gl.uniformMatrix4fv(gl.program1.u_ModelMatrix, false, mMatrix.elements);
	}
	drawCube();
}
function update(){
	return;
}

//add shapes here
function addModels(){
	model = modelCollection_EmptyModel();
	modelCollection_AddModel(model, modelCollection_Cube);
	modelCollection_AddModel(model, modelCollection_Sphere20);
	modelCollection_AddModel(model, modelCollection_Cylinder20);

}

function drawCube(){
	//draw base
	var base = 0;  //offset to cube indices
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, base*2);
}
function drawSphere20(){
	var base = 36;
	gl.drawElements(gl.TRIANGLES, 2400, gl.UNSIGNED_SHORT, base*2);		  //sphere
}
function drawCylinder() {
	var base = 2436;
	gl.drawElements(gl.TRIANGLES, 2400, gl.UNSIGNED_SHORT, base*2);
}
function drawHalfSphere20() {
	var base = 36;
	gl.drawElements(gl.TRIANGLES, 1200, gl.UNSIGNED_SHORT, base*2);
}

//Initiliaze vertex buffers
function initVertexBuffers(gl) {
  // Indices of the vertices
  var indices = new Uint16Array(model.indices);

  gl.useProgram(gl.program1);
  if (!(gl.program1.vboVertices = util_InitArrayBuffer(gl, gl.program1.a_Position, model.vertices, 3))) return -1;
  if (!(gl.program1.vboColors   = util_InitArrayBuffer(gl, gl.program1.a_Color,    model.colors,   3))) return -1;
  if (!(gl.program1.vboNormals  = util_InitArrayBuffer(gl, gl.program1.a_Normal,   model.normals,  3))) return -1;

  gl.useProgram(gl.program3);
  gl.program2.vboVertices = util_AttachAttribToVBO(gl, gl.program2.a_Position, gl.program1.vboVertices, 3);
  gl.program2.vboVertices = util_AttachAttribToVBO(gl, gl.program2.a_Normal, gl.program1.vboNormals, 3);

  gl.useProgram(gl.program3);
  gl.program3.vboVertices      = util_AttachAttribToVBO(gl, gl.program2.a_Position, gl.program1.vboVertices, 3);
  gl.program3.vboVertices      = util_AttachAttribToVBO(gl, gl.program2.a_Normal, gl.program1.vboNormals, 3);
  if (!(gl.program3.vboTexels  = util_InitArrayBuffer(gl, gl.program3.a_TexCoord, model.texels,   2))){
	console.log("issue with texel loading");
	return -1;
  }

  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return indices.length;
}


/****************************************************************************************************/
//INITIALIZE TEXTURES
/****************************************************************************************************/

function initTextures() {
	//Texture 0 - do for each texture
	texLoaded[0] = false;
	var textureObject0 = gl.createTexture();			//create texture object

	var image0 = new Image();						//create image object
	image0.onload 									//register handler for when loaded
		= function() { loadTexture(textureObject0, image0, gl.TEXTURE0, 0); };
	image0.src = 'Resources/darkwood.jpg';				//set the image source to start load

		//Texture 1 - do for each texture
	texLoaded[1] = false;
	var textureObject1 = gl.createTexture();			//create texture object

	var image1 = new Image();						//create image object
	image1.onload 									//register handler for when loaded
		= function() { loadTexture(textureObject1, image1, gl.TEXTURE1, 1); };
	image1.src = 'Resources/wood.jpg';				//set the image source to start load

	//Texture 2 - do for each texture
	texLoaded[2] = false;
	var textureObject2 = gl.createTexture();			//create texture object

	var image2 = new Image();						//create image object
	image2.onload 									//register handler for when loaded
	   = function() { loadTexture(textureObject2, image2, gl.TEXTURE2, 2); };
	image2.src = 'Resources/roomba.jpg';				//set the image source to start load
	//Texture 3 - do for each texture
	texLoaded[3] = false;
	var textureObject3 = gl.createTexture();			//create texture object

	var image3 = new Image();						//create image object
	image3.onload 									//register handler for when loaded
	  = function() { loadTexture(textureObject3, image3, gl.TEXTURE3, 3); };
	image3.src = 'Resources/garbage1.jpg';				//set the image source to start load
	//Texture 4 - do for each texture
	texLoaded[4] = false;
	var textureObject4 = gl.createTexture();			//create texture object

	var image4 = new Image();						//create image object
	image4.onload 									//register handler for when loaded
	  = function() { loadTexture(textureObject4, image4, gl.TEXTURE4, 4); };
	image4.src = 'Resources/gray.jpeg';				//set the image source to start load
	  	return;
}

function loadTexture(texObj, image, texUnit, num) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);				//Flip the image's y axis
	gl.activeTexture(texUnit);								//select texture unit
	gl.bindTexture(gl.TEXTURE_2D, texObj);  				//bind object to target
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	texLoaded[num] = true;
	drawScene();
}

function setAttribUniformLocations(){
	//////  PROGRAM 1   //////
	gl.useProgram(gl.program1)
	// Get the storage locations of the attribute variables
	gl.program1.a_Position   = util_AddAttribute(gl, gl.program1, 'a_Position');
	gl.program1.a_Color      = util_AddAttribute(gl, gl.program1, 'a_Color');
	gl.program1.a_Normal     = util_AddAttribute(gl, gl.program1, 'a_Normal');

	// Get the storage locations of uniform variables and so on
	gl.program1.u_MvpMatrix     = util_AddUniform(gl, gl.program1, 'u_MvpMatrix');
	gl.program1.u_NormalMatrix  = util_AddUniform(gl, gl.program1, 'u_NormalMatrix');
	gl.program2.u_ModelMatrix   = util_AddUniform(gl, gl.program1, 'u_ModelMatrix');
	gl.program1.u_LightColor    = util_AddUniform(gl, gl.program1, 'u_LightColor');
	gl.program1.u_LightPosition = util_AddUniform(gl, gl.program1, 'u_LightPosition');
	gl.program1.u_AmbientLight  = util_AddUniform(gl, gl.program1, 'u_AmbientLight');

	gl.useProgram(gl.program2)
	// Get the storage locations of the attribute variables
	gl.program2.a_Position   = util_AddAttribute(gl, gl.program2, 'a_Position');
	gl.program2.a_Normal     = util_AddAttribute(gl, gl.program2, 'a_Normal');

	// Get the storage locations of uniform variables and so on
	gl.program2.u_MvpMatrix     = util_AddUniform(gl, gl.program2, 'u_MvpMatrix');
	gl.program2.u_NormalMatrix  = util_AddUniform(gl, gl.program2, 'u_NormalMatrix');
	gl.program2.u_ModelMatrix   = util_AddUniform(gl, gl.program2, 'u_ModelMatrix');
	gl.program2.u_MatColor      = util_AddUniform(gl, gl.program2, 'u_MatColor');
	gl.program2.u_LightColor    = util_AddUniform(gl, gl.program2, 'u_LightColor');
	gl.program2.u_LightPosition = util_AddUniform(gl, gl.program2, 'u_LightPosition');
	gl.program2.u_AmbientLight  = util_AddUniform(gl, gl.program2, 'u_AmbientLight');

	gl.useProgram(gl.program3)
	// Get the storage locations of the attribute variables
	gl.program3.a_Position   = util_AddAttribute(gl, gl.program3, 'a_Position');
	gl.program3.a_Normal     = util_AddAttribute(gl, gl.program3, 'a_Normal');
	gl.program3.a_TexCoord   = util_AddAttribute(gl, gl.program3, 'a_TexCoord');

	// Get the storage locations of uniform variables and so on
	gl.program3.u_MvpMatrix      = util_AddUniform(gl, gl.program3, 'u_MvpMatrix');
	gl.program3.u_NormalMatrix   = util_AddUniform(gl, gl.program3, 'u_NormalMatrix');
	gl.program3.u_MatColor       = util_AddUniform(gl, gl.program3, 'u_MatColor');
	gl.program3.u_LightColor     = util_AddUniform(gl, gl.program3, 'u_LightColor');
	gl.program3.u_LightDirection = util_AddUniform(gl, gl.program3, 'u_LightDirection');
	gl.program3.u_AmbientLight   = util_AddUniform(gl, gl.program3, 'u_AmbientLight');
	gl.program3.u_Sampler        = util_AddUniform(gl, gl.program3, 'u_Sampler');
}


function setDrawingDefaults() {
	// Set the clear color, enable the depth test, set default material color
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	gl.enable(gl.DEPTH_TEST);
	var lightPosition = new Vector3([500.0, 800.0, 700.0]);  //also used as direction
	lightPosition.normalize();     // Normalize

	//Program 1 specific defaults / initial settings
	gl.useProgram(gl.program1);
	gl.uniform3f(gl.program1.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program1.u_LightPosition, lightPosition.elements);
	gl.uniform3f(gl.program1.u_AmbientLight, 0.2, 0.2, 0.2);

	//Program 2 specific defaults / initial settings
	gl.useProgram(gl.program2);
	gl.uniform4f(gl.program2.u_MatColor, 1.0, 0.0, 0.0, 1.0);  //RED
	gl.uniform3f(gl.program2.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program2.u_LightPosition, lightPosition.elements);
	gl.uniform3f(gl.program2.u_AmbientLight, 0.2, 0.2, 0.2);

	//Program 3 specific defaults / initial settings
	gl.useProgram(gl.program3);
	gl.uniform3f(gl.program3.u_LightColor, 1.0, 1.0, 1.0);
	gl.uniform3fv(gl.program3.u_LightDirection, lightPosition.elements);
	gl.uniform3f(gl.program3.u_AmbientLight, 0.2, 0.2, 0.2);

	return;
}

function genShaderPrograms(){

	if(!(gl.program1 = util_InitShaders(gl, VSHADER_SOURCE1, FSHADER_SOURCE1))) {
		console.log("Error building program 1");
		return false;
	}

	if(!(gl.program2 = util_InitShaders(gl, VSHADER_SOURCE2, FSHADER_SOURCE2))) {
		console.log("Error building program 2");
		return false;
	}

	if(!(gl.program3 = util_InitShaders(gl, VSHADER_SOURCE3, FSHADER_SOURCE3))) {
		console.log("Error building program 3");
		return false;
	}

	return true;
}


var VSHADER_SOURCE1 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec4 a_Color;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +

  'varying vec4 v_Color;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  vec4 color = a_Color;\n' +
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  '  vec3 LightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
//  '  vec3 normal = normalize(a_Normal.xyz);\n' +
  '  float nDotL = max(dot(LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  v_Color = vec4((diffuse+ambient), color.a);\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE1 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying   vec4 v_Color;\n' +
  'void main() {\n' +
 '  gl_FragColor = v_Color;\n' +
  '}\n';


//SET 2:  Uses material colour for shading, Phong-Phong shading, point lighting
var VSHADER_SOURCE2 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightPosition;\n' +

  'varying vec4 v_Normal;\n' +
  'varying vec3 v_LightDirection;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  v_Normal = vec4(normalize(vec3(u_NormalMatrix * a_Normal)), 1.0);\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  '  v_LightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
  '}\n';


var FSHADER_SOURCE2 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +

  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec4 u_MatColor;\n' +

  'varying vec4 v_Normal;\n' +
  'varying vec3 v_LightDirection;\n' +

  'void main() {\n' +
  '  vec4 color = u_MatColor;\n' +
  '  vec3 normal = normalize(v_Normal.xyz);\n' +
  '  float nDotL = max(dot(v_LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  gl_FragColor = vec4((diffuse+ambient), color.a);\n' +
  '}\n';


//SET 3:  Uses material colour for shading plus texture, Gourand-Phong shading, directional lighting
var VSHADER_SOURCE3 =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightDirection;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec4 u_MatColor;\n' +   		//typically white

  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position ;\n' +
  '  vec4 color = u_MatColor;\n' +
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * color.rgb * nDotL ;\n' +
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +

  '  v_Color = vec4((diffuse+ambient), color.a);\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

var FSHADER_SOURCE3 =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +

  'void main() {\n' +
  '  vec4 texelColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '  gl_FragColor = texelColor * v_Color;\n' +
  '}\n';
