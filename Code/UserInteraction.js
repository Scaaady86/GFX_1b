//Switchcase to handle every Userinputted keyboard command

function checkKey(key){
    switch(key){
        case ' ':
            SelectCamera();
            break;
        case '0':
            SelectAllShapes();
            break; 
        case '1':
            SelectShape(1);
            break;
        case '2':
            SelectShape(2);
            break;
        case '3':
            SelectShape(3);
            break;
        case '4':
            SelectShape(4);
            break;
        case '5':
            SelectShape(5);
            break;
        case '6':
            SelectShape(6);
            break;
        case '7':
            SelectShape(7);
            break;
        case '8':
            SelectShape(8);
            break;
        case '9':
            SelectShape(9);
            break;
        case 'ArrowUp':
            if(cameraSelected)MoveCameraWithArrows(key);
            else if(lightSelected) MoveLightWithArrows(key); 
            else MoveShapeLocally(key);
            break;
        case 'ArrowDown':
            if(cameraSelected)MoveCameraWithArrows(key);
            else if(lightSelected) MoveLightWithArrows(key); 
            else MoveShapeLocally(key);
            break;
        case 'ArrowRight':
            if(cameraSelected)MoveCameraWithArrows(key);
            else if(lightSelected) MoveLightWithArrows(key); 
            else MoveShapeLocally(key);
            break;
        case 'ArrowLeft':
            if(cameraSelected)MoveCameraWithArrows(key);
            else if(lightSelected) MoveLightWithArrows(key); 
            else MoveShapeLocally(key);
            break;
        case ',':
            MoveShapeLocally(key);
            break;
        case '.':
            MoveShapeLocally(key);
            break;
        case 'i':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'k':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'o':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'u':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'l':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'j':
            if(lightSelected) rotateLight(key);
            rotateShape(key);
            break;
        case 'a':
            scaleShape(key);
            break;
        case 'A':
            scaleShape(key);
            break;
        case 'b':
            scaleShape(key);
            break;
        case 'B':
            scaleShape(key);
            break;
        case 'c':
            scaleShape(key);
            break;
        case 'C':
            scaleShape(key);
            break;
        case 'd':
            shaderPrograms.defaultProgram.enable();
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            console.log("Default Shader enabled");
            break;
        case 'w':
            shaderPrograms.gouraudDiffuseProgram.enable();
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            console.log("Gouraud Diffuse Shader enabled");
            break;
        case 'e':
            shaderPrograms.gouraudSpecularProgram.enable();
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            console.log("Gouraud Specular Shader enabled");
            break;
        case 'r':
            shaderPrograms.phongDiffuseProgram.enable();
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            console.log("Phong Diffuse Shader enabled");
            break;
        case 't':
            shaderPrograms.phongSpecularProgram.enable();
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            console.log("Phong Specular Shader enabled");
            break;
        case 'L':
            if(lightSelected) SelectCamera();
            else selectLight();
            console.log("Light selected");
            break;
    }
}
