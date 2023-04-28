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
            else MoveShapeLocally(key);
            break;
        case 'ArrowDown':
            if(cameraSelected)MoveCameraWithArrows(key);
            else MoveShapeLocally(key);
            break;
        case 'ArrowRight':
            if(cameraSelected)MoveCameraWithArrows(key);
            else MoveShapeLocally(key);
            break;
        case 'ArrowLeft':
            if(cameraSelected)MoveCameraWithArrows(key);
            else MoveShapeLocally(key);
            break;
        case ',':
            MoveShapeLocally(key);
            break;
        case '.':
            MoveShapeLocally(key);
            break;
        case 'i':
            rotateShape(key);
            break;
        case 'k':
            rotateShape(key);
            break;
        case 'o':
            rotateShape(key);
            break;
        case 'u':
            rotateShape(key);
            break;
        case 'l':
            rotateShape(key);
            break;
        case 'j':
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
            console.log("Default Shader enabled");
            break;
        case 'w':
            shaderPrograms.gouraudDiffuseProgram.enable();
            console.log("Gouraud Diffuse Shader enabled");
            break;
        case 'e':
            shaderPrograms.gouraudSpecularProgram.enable();
            console.log("Gouraud Specular Shader enabled");
            break;
        case 'r':
            shaderPrograms.phongDiffuseProgram.enable();
            console.log("Phong Diffuse Shader enabled");
            break;
        case 't':
            shaderPrograms.phongSpecularProgram.enable();
            console.log("Phong Specular Shader enabled");
            break;
    }
}
