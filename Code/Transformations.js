/* --------- File to Handle Transformations and Selections --------- */

function MoveCameraWithArrows(key){
    switch(key){
        case 'ArrowUp':
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0,-0.1,0]);
            globalLightPosition[1] -= 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'ArrowDown':
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0,0.1,0]);
            globalLightPosition[1] += 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'ArrowRight':
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [-0.1,0,0]);
            globalLightPosition[0] -= 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'ArrowLeft':
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0.1,0,0]);
            globalLightPosition[0] += 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;

    }   
}

function MoveCameraWithMouse(x, y, mousedown){
    window.addEventListener("mousemove", (action) =>{
        if(mousedown) {
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [(x-action.offsetX)*-0.0001, (y-action.offsetY)*0.0001, 0]);
            globalLightPosition[0] += (x-action.offsetX)*-0.0001;
            globalLightPosition[1] += (y-action.offsetY)*0.0001;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
        }
    });

    window.addEventListener("mouseup", (action) =>{
        mousedown = false;
    })
}

function MoveShapeLocally(key){
    if(selectedAll) {
        MoveShapeGlobally(key);
    }else{
        for(i=1; i<11; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'ArrowUp':
                        shapes[i].translateLocally([0,0.1,0]);
                        objectCoordSystems[i].translateLocally([0,0.1,0]);
                        break;
                    case 'ArrowDown':
                        shapes[i].translateLocally([0,-0.1,0]);
                        objectCoordSystems[i].translateLocally([0,-0.1,0]);
                        break;
                    case 'ArrowRight':
                        shapes[i].translateLocally([0.1,0,0]);
                        objectCoordSystems[i].translateLocally([0.1,0,0]);
                        break;
                    case 'ArrowLeft':
                        shapes[i].translateLocally([-0.1,0,0]);
                        objectCoordSystems[i].translateLocally([-0.1,0,0]);
                        break;
                    case ',':
                        shapes[i].translateLocally([0,0,-0.1]);
                        objectCoordSystems[i].translateLocally([0,0,-0.1]);
                        break;
                    case '.':
                        shapes[i].translateLocally([0,0,0.1]);
                        objectCoordSystems[i].translateLocally([0,0,0.1]);
                        break;
                }
            }
        }
    }
}

function MoveShapeGlobally(key){
    for(i=1; i<10; i++) {
        if(shapes[i].selected == true){
            switch(key){
                case 'ArrowUp':
                    shapes[i].translateGlobally([0,0.1,0]);
                    objectCoordSystems[i].translateGlobally([0,0.1,0]);
                    break;
                case 'ArrowDown':
                    shapes[i].translateGlobally([0,-0.1,0]);
                    objectCoordSystems[i].translateGlobally([0,-0.1,0]);
                    break;
                case 'ArrowRight':
                    shapes[i].translateGlobally([0.1,0,0]);
                    objectCoordSystems[i].translateGlobally([0.1,0,0]);
                    break;
                case 'ArrowLeft':
                    shapes[i].translateGlobally([-0.1,0,0]);
                    objectCoordSystems[i].translateGlobally([-0.1,0,0]);
                    break;
                case ',':
                    shapes[i].translateGlobally([0,0,-0.1]);
                    objectCoordSystems[i].translateGlobally([0,0,-0.1]);
                    break;
                case '.':
                    shapes[i].translateGlobally([0,0,0.1]);
                    objectCoordSystems[i].translateGlobally([0,0,0.1]);
                    break;
            }
        }
    }
}

function rotateAllShapes(key){
    for(i=1; i<11; i++) {
        if(shapes[i].selected == true){
            switch(key){
                case 'i':
                    shapes[i].rotateGlobally(0.1, [-1,0,0]);
                    objectCoordSystems[i].rotateGlobally(0.1, [-1,0,0]);
                    break;
                case 'k':
                    shapes[i].rotateGlobally(0.1, [1,0,0]);
                    objectCoordSystems[i].rotateGlobally(0.1, [1,0,0]);
                    break;
                case 'o':
                    shapes[i].rotateGlobally(0.1, [0,-1,0]);
                    objectCoordSystems[i].rotateGlobally(0.1, [0,-1,0]);
                    break;
                case 'u':
                    shapes[i].rotateGlobally(0.1, [0,1,0]);
                    objectCoordSystems[i].rotateGlobally(0.1, [0,1,0]);
                    break;
                case 'l':
                    shapes[i].rotateGlobally(0.1, [0,0,-1]);
                    objectCoordSystems[i].rotateGlobally(0.1, [0,0,-1]);
                    break;
                case 'j':
                    shapes[i].rotateGlobally(0.1, [0,0,1]);
                    objectCoordSystems[i].rotateGlobally(0.1, [0,0,1]);
                    break;
            }
        }
    }
}

function rotateShape(key){
    if(selectedAll){
        rotateAllShapes(key); 
    } else{
        for(i=1; i<11; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'i':
                        shapes[i].rotateLocally(0.1, [-1,0,0]);
                        objectCoordSystems[i].rotateLocally(0.1, [-1,0,0]);
                        break;
                    case 'k':
                        shapes[i].rotateLocally(0.1, [1,0,0]);
                        objectCoordSystems[i].rotateLocally(0.1, [1,0,0]);
                        break;
                    case 'o':
                        shapes[i].rotateLocally(0.1, [0,-1,0]);
                        objectCoordSystems[i].rotateLocally(0.1, [0,-1,0]);
                        break;
                    case 'u':
                        shapes[i].rotateLocally(0.1, [0,1,0]);
                        objectCoordSystems[i].rotateLocally(0.1, [0,1,0]);
                        break;
                    case 'l':
                        shapes[i].rotateLocally(0.1, [0,0,-1]);
                        objectCoordSystems[i].rotateLocally(0.1, [0,0,-1]);
                        break;
                    case 'j':
                        shapes[i].rotateLocally(0.1, [0,0,1]);
                        objectCoordSystems[i].rotateLocally(0.1, [0,0,1]);
                        break;
                }
            }
        }
    }
}

function scaleShape(key){
    if(selectedAll){
        scaleAllShapes(key);
    }else{
        for(i=1; i<11; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'a':
                        shapes[i].scaleLocally([0.9,1,1]);
                        objectCoordSystems[i].scaleLocally([0.9,1,1]);
                        break;
                    case 'A':
                        shapes[i].scaleLocally([1.1,1,1]);
                        objectCoordSystems[i].scaleLocally([1.1,1,1]);
                        break;
                    case 'b':
                        shapes[i].scaleLocally([1,0.9,1]);
                        objectCoordSystems[i].scaleLocally([1,0.9,1]);
                        break;
                    case 'B':
                        shapes[i].scaleLocally([1,1.1,1]);
                        objectCoordSystems[i].scaleLocally([1,1.1,1]);
                        break;
                    case 'c':
                        shapes[i].scaleLocally([1,1,0.9]);
                        objectCoordSystems[i].scaleLocally([1,1,0.9]);
                        break;
                    case 'C':
                        shapes[i].scaleLocally([1,1,1.1]);
                        objectCoordSystems[i].scaleLocally([1,1,1.1]);
                        break;
                }
            }
        }
    }
}

function scaleAllShapes(key){
    for(i=1; i<11; i++) {
        if(shapes[i].selected == true){
            switch(key){
                case 'a':
                    shapes[i].scaleGlobally([0.9,1,1]);
                    objectCoordSystems[i].scaleGlobally([0.9,1,1]);
                    break;
                case 'A':
                    shapes[i].scaleGlobally([1.1,1,1]);
                    objectCoordSystems[i].scaleGlobally([1.1,1,1]);
                    break;
                case 'b':
                    shapes[i].scaleGlobally([1,0.9,1]);
                    objectCoordSystems[i].scaleGlobally([1,0.9,1]);
                    break;
                case 'B':
                    shapes[i].scaleGlobally([1,1.1,1]);
                    objectCoordSystems[i].scaleGlobally([1,1.1,1]);
                    break;
                case 'c':
                    shapes[i].scaleGlobally([1,1,0.9]);
                    objectCoordSystems[i].scaleGlobally([1,1,0.9]);
                    break;
                case 'C':
                    shapes[i].scaleGlobally([1,1,1.1]);
                    objectCoordSystems[i].scaleGlobally([1,1,1.1]);
                    break;
            }
        }
    }
}

function SelectAllShapes(){
    cameraSelected = false;
    lightSelected = false;
    selectedAll = true;
    shapes.forEach(shape => {
        shape.selected = true;
    });
    shapes[0].selected = false;
    shapes[10].selected = false;
    console.log("all shapes selected");
}

function SelectShape(i){
    cameraSelected = false;
    selectedAll = false;
    lightSelected = false;
    shapes.forEach(shape => {
        shape.selected = false;
    });
    shapes[i].selected = true;
    console.log("shape "+ i+ " selected");
}

function SelectCamera(){
    selectedAll = false;
    lightSelected = false;
    shapes.forEach(shape => {
        shape.selected = false;
    });
    cameraSelected = true;
}

function selectLight(){
    cameraSelected = false;
    selectedAll = false;
    shapes.forEach(shape => {
        shape.selected = false;
    });
    shapes[10].selected = true;
    lightSelected = true;
}

function MoveLightWithArrows(key){
    switch(key){
        case 'ArrowUp':
            shapes[10].translateGlobally([0,0.1,0]);
            objectCoordSystems[10].translateGlobally([0,0.1,0]);
            globalLightPosition[1] += 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'ArrowDown':
            shapes[10].translateGlobally([0,-0.1,0]);
            objectCoordSystems[10].translateGlobally([0,-0.1,0]);
            globalLightPosition[1] -= 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'ArrowRight':
            shapes[10].translateGlobally([0.1,0,0]);
            objectCoordSystems[10].translateGlobally([0.1,0,0]);
            globalLightPosition[0] += 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
         case 'ArrowLeft':
            shapes[10].translateGlobally([-0.1,0,0]);
            objectCoordSystems[10].translateGlobally([-0.1,0,0]);
            globalLightPosition[0] -= 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
         case ',':
            shapes[10].translateGlobally([0,0,-0.1]);
            objectCoordSystems[10].translateGlobally([0,0,-0.1]);
            globalLightPosition[2] -= 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case '.':
            shapes[10].translateGlobally([0,0,0.1]);
            objectCoordSystems[10].translateGlobally([0,0,0.1]);
            globalLightPosition[2] += 0.1;
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        }
}

function rotateLight(key){
    //rotation Matricies where calculated online
    let rotationMatrix = [];
    switch(key){
        case 'i':
            shapes[10].rotateGlobally(0.1, [-1,0,0]);
            objectCoordSystems[10].rotateGlobally(0.1, [-1,0,0]);
            rotationMatrix = [
                1, 0, 0, 0,
                0, 0.995004165, -0.09983341664, 0,
                0, 0.09983341664, 0.995004165, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'k':
            shapes[10].rotateGlobally(0.1, [1,0,0]);
            objectCoordSystems[10].rotateGlobally(0.1, [1,0,0]);
            rotationMatrix = [
                1, 0, 0, 0,
                0, 0.995004165, 0.09983341664, 0,
                0, -0.09983341664, 0.995004165, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'o':
            shapes[10].rotateGlobally(0.1, [0,-1,0]);
            objectCoordSystems[10].rotateGlobally(0.1, [0,-1,0]);
            rotationMatrix = [
                0.995004165, 0, -0.09983341664, 0,
                0, 1, 0, 0,
                0.09983341664, 0, 0.995004165, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'u':
            shapes[10].rotateGlobally(0.1, [0,1,0]);
            objectCoordSystems[10].rotateGlobally(0.1, [0,1,0]);
            rotationMatrix = [
                0.995004165, 0, 0.09983341664, 0,
                0, 1, 0, 0,
                -0.09983341664, 0, 0.995004165, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'l':
            shapes[10].rotateGlobally(0.1, [0,0,-1]);
            objectCoordSystems[10].rotateGlobally(0.1, [0,0,-1]);
            rotationMatrix = [
                0.995004165, 0.09983341664, 0, 0,
                -0.09983341664, 0.995004165, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
        case 'j':
            shapes[10].rotateGlobally(0.1, [0,0,1]);
            objectCoordSystems[10].rotateGlobally(0.1, [0,0,1]);
            rotationMatrix = [
                0.995004165, -0.09983341664, 0, 0,
                0.09983341664, 0.995004165, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            globalLightPosition = matrixVectorMul(rotationMatrix, globalLightPosition);
            gl.uniform4fv(currentShaderProgram.uniforms.lightLocation, globalLightPosition);
            break;
    }
}

function matrixVectorMul(matrix, vector) {
    // This is a helper function that multiplies a 4x4 matrix and a 4D vector
    const returnV = [];
    for (let i = 0; i < 4; i++) {
      returnV[i] = 0;
      for (let j = 0; j < 4; j++) {
        returnV[i] += matrix[i * 4 + j] * vector[j];
      }
    }
    return returnV;
  }