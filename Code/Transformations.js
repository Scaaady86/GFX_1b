/* --------- File to Handle Transformations and Selections --------- */

function MoveCameraWithArrows(key){
    switch(key){
        case 'ArrowUp':
            mat4.translate(viewMatrix, viewMatrix, [0,-0.1,0]);
            break;
        case 'ArrowDown':
            mat4.translate(viewMatrix, viewMatrix, [0,0.1,0]);
            break;
        case 'ArrowRight':
            mat4.translate(viewMatrix, viewMatrix, [-0.1,0,0]);
            break;
        case 'ArrowLeft':
            mat4.translate(viewMatrix, viewMatrix, [0.1,0,0]);
            break;

    }   
}

function MoveCameraWithMouse(x, y, mousedown){
    window.addEventListener("mousemove", (action) =>{
        if(mousedown) mat4.translate(viewMatrix, viewMatrix, [(x-action.offsetX)*0.0001, (y-action.offsetY)*-0.0001, 0]);
    });

    window.addEventListener("mouseup", (action) =>{
        mousedown = false;
    })
}

function MoveShapeLocally(key){
    if(selectedAll) {
        MoveShapeGlobally(key);
    }else{
        for(i=1; i<10; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'ArrowUp':
                        shapes[i].translateLocally([0,0.1,0]);
                        shapes[i+9].translateLocally([0,0.1,0]);
                        break;
                    case 'ArrowDown':
                        shapes[i].translateLocally([0,-0.1,0]);
                        shapes[i+9].translateLocally([0,-0.1,0]);
                        break;
                    case 'ArrowRight':
                        shapes[i].translateLocally([0.1,0,0]);
                        shapes[i+9].translateLocally([0.1,0,0]);
                        break;
                    case 'ArrowLeft':
                        shapes[i].translateLocally([-0.1,0,0]);
                        shapes[i+9].translateLocally([-0.1,0,0]);
                        break;
                    case ',':
                        shapes[i].translateLocally([0,0,-0.1]);
                        shapes[i+9].translateLocally([0,0,-0.1]);
                        break;
                    case '.':
                        shapes[i].translateLocally([0,0,0.1]);
                        shapes[i+9].translateLocally([0,0,0.1]);
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
                    shapes[i+9].translateGlobally([0,0.1,0]);
                    break;
                case 'ArrowDown':
                    shapes[i].translateGlobally([0,-0.1,0]);
                    shapes[i+9].translateGlobally([0,-0.1,0]);
                    break;
                case 'ArrowRight':
                    shapes[i].translateGlobally([0.1,0,0]);
                    shapes[i+9].translateGlobally([0.1,0,0]);
                    break;
                case 'ArrowLeft':
                    shapes[i].translateGlobally([-0.1,0,0]);
                    shapes[i+9].translateGlobally([-0.1,0,0]);
                    break;
                case ',':
                    shapes[i].translateGlobally([0,0,-0.1]);
                    shapes[i+9].translateGlobally([0,0,-0.1]);
                    break;
                case '.':
                    shapes[i].translateGlobally([0,0,0.1]);
                    shapes[i+9].translateGlobally([0,0,0.1]);
                    break;
            }
        }
    }
}

function rotateAllShapes(key){
    for(i=1; i<10; i++) {
        if(shapes[i].selected == true){
            switch(key){
                case 'i':
                    shapes[i].rotateGlobally(0.1, [-1,0,0]);
                    shapes[i+9].rotateGlobally(0.1, [-1,0,0]);
                    break;
                case 'k':
                    shapes[i].rotateGlobally(0.1, [1,0,0]);
                    shapes[i+9].rotateGlobally(0.1, [1,0,0]);
                    break;
                case 'o':
                    shapes[i].rotateGlobally(0.1, [0,-1,0]);
                    shapes[i+9].rotateGlobally(0.1, [0,-1,0]);
                    break;
                case 'u':
                    shapes[i].rotateGlobally(0.1, [0,1,0]);
                    shapes[i+9].rotateGlobally(0.1, [0,1,0]);
                    break;
                case 'l':
                    shapes[i].rotateGlobally(0.1, [0,0,-1]);
                    shapes[i+9].rotateGlobally(0.1, [0,0,-1]);
                    break;
                case 'j':
                    shapes[i].rotateGlobally(0.1, [0,0,1]);
                    shapes[i+9].rotateGlobally(0.1, [0,0,1]);
                    break;
            }
        }
    }
}

function rotateShape(key){
    if(selectedAll){
        rotateAllShapes(key); 
    } else{
        for(i=1; i<10; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'i':
                        shapes[i].rotateLocally(0.1, [-1,0,0]);
                        shapes[i+9].rotateLocally(0.1, [-1,0,0]);
                        break;
                    case 'k':
                        shapes[i].rotateLocally(0.1, [1,0,0]);
                        shapes[i+9].rotateLocally(0.1, [1,0,0]);
                        break;
                    case 'o':
                        shapes[i].rotateLocally(0.1, [0,-1,0]);
                        shapes[i+9].rotateLocally(0.1, [0,-1,0]);
                        break;
                    case 'u':
                        shapes[i].rotateLocally(0.1, [0,1,0]);
                        shapes[i+9].rotateLocally(0.1, [0,1,0]);
                        break;
                    case 'l':
                        shapes[i].rotateLocally(0.1, [0,0,-1]);
                        shapes[i+9].rotateLocally(0.1, [0,0,-1]);
                        break;
                    case 'j':
                        shapes[i].rotateLocally(0.1, [0,0,1]);
                        shapes[i+9].rotateLocally(0.1, [0,0,1]);
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
        for(i=1; i<10; i++) {
            if(shapes[i].selected == true){
                switch(key){
                    case 'a':
                        shapes[i].scaleLocally([0.9,1,1]);
                        shapes[i+9].scaleLocally([0.9,1,1]);
                        break;
                    case 'A':
                        shapes[i].scaleLocally([1.1,1,1]);
                        shapes[i+9].scaleLocally([1.1,1,1]);
                        break;
                    case 'b':
                        shapes[i].scaleLocally([1,0.9,1]);
                        shapes[i+9].scaleLocally([1,0.9,1]);
                        break;
                    case 'B':
                        shapes[i].scaleLocally([1,1.1,1]);
                        shapes[i+9].scaleLocally([1,1.1,1]);
                        break;
                    case 'c':
                        shapes[i].scaleLocally([1,1,0.9]);
                        shapes[i+9].scaleLocally([1,1,0.9]);
                        break;
                    case 'C':
                        shapes[i].scaleLocally([1,1,1.1]);
                        shapes[i+9].scaleLocally([1,1,1.1]);
                        break;
                }
            }
        }
    }
}

function scaleAllShapes(key){
    for(i=1; i<10; i++) {
        if(shapes[i].selected == true){
            switch(key){
                case 'a':
                    shapes[i].scaleGlobally([0.9,1,1]);
                    shapes[i+9].scaleGlobally([0.9,1,1]);
                    break;
                case 'A':
                    shapes[i].scaleGlobally([1.1,1,1]);
                    shapes[i+9].scaleGlobally([1.1,1,1]);
                    break;
                case 'b':
                    shapes[i].scaleGlobally([1,0.9,1]);
                    shapes[i+9].scaleGlobally([1,0.9,1]);
                    break;
                case 'B':
                    shapes[i].scaleGlobally([1,1.1,1]);
                    shapes[i+9].scaleGlobally([1,1.1,1]);
                    break;
                case 'c':
                    shapes[i].scaleGlobally([1,1,0.9]);
                    shapes[i+9].scaleGlobally([1,1,0.9]);
                    break;
                case 'C':
                    shapes[i].scaleGlobally([1,1,1.1]);
                    shapes[i+9].scaleGlobally([1,1,1.1]);
                    break;
            }
        }
    }
}

function SelectAllShapes(){
    cameraSelected = false;
    selectedAll = true;
    shapes.forEach(shape => {
        shape.selected = true;
    });
    shapes[0].selected = false;
    console.log("all shapes selected");
}

function SelectShape(i){
    cameraSelected = false;
    selectedAll = false;
    shapes.forEach(shape => {
        shape.selected = false;
    });
    shapes[i].selected = true;
    console.log("shape "+ i+ " selected");
}

function SelectCamera(){
    selectedAll = false;
    shapes.forEach(shape => {
        shape.selected = false;
    });
    cameraSelected = true;
}