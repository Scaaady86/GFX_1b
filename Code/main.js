window.onload = async () => {

    /* --------- basic setup --------- */
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674   , 1);

    /* --------- create & send projection matrix --------- */
    mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    /* --------- create view matrix --------- */
    mat4.lookAt(matrices.viewMatrix, [0, 0, 3], [0, 0, 0], [0, 1, 0]);

    shaderPrograms.defaultProgram = new ShaderProgram(shaders.vertexDefault, shaders.fragmentDefault, shaderInfo);
    shaderPrograms.gouraudDiffuseProgram = new ShaderProgram(shaders.vertexGouraudDiffuse, shaders.fragmentDefault, shaderInfo);
    shaderPrograms.gouraudSpecularProgram = new ShaderProgram(shaders.vertexGouraudSpecular, shaders.fragmentDefault, shaderInfo);
    shaderPrograms.phongDiffuseProgram = new ShaderProgram(shaders.vertexPhong, shaders.fragmentPhongDiffuse, shaderInfo);
    shaderPrograms.phongSpecularProgram = new ShaderProgram(shaders.vertexPhong, shaders.fragmentPhongSpecular, shaderInfo);

    shaderPrograms.defaultProgram.enable();

    
    /* --------- create 9 shapes and corresponding OCS and translate them away from each other --------- */
    shapes.push(createWCS());
    objectCoordSystems.push(createWCS());

    var offset = -1.5;
    for(i = 1; i<5; i++){
        shapes.push(createPyramid());
        objectCoordSystems.push(createOCS());
        shapes[i].translateLocally([offset, 0.5, -1]);
        objectCoordSystems[i].translateLocally([offset, 0.5, -1]);
        offset += 1;
    }

    offset = -1.5;
    for(i = 5; i<10; i++){
        shapes.push(createCube());
        objectCoordSystems.push(createOCS());
        shapes[i].translateLocally([offset, -0.5, -1]);
        objectCoordSystems[i].translateLocally([offset, -0.5, -1]);
        offset += 0.75;
    }

    shapes.push(createLight());
    objectCoordSystems.push(createOCS());
    shapes[10].translateLocally([0, 10, 0]);
    objectCoordSystems[10].translateLocally([0, 10, 0]);

    /* --------- Attach event listener for events to the window --------- */
    window.addEventListener('keydown', function(action) {
        checkKey(action.key);
    });

    var mousedown = false;
    window.addEventListener('mousedown', function(action) {
        mousedown = true;
        MoveCameraWithMouse(action.clientX, action.clientY, mousedown);
    });

    /* --------- Load some data from external files - only works with an http server --------- */
    await loadSomething();  

    /* --------- start render loop --------- */
    requestAnimationFrame(render);
}

/* --------- Loading the Shapes --------- */
async function loadSomething() {
    const data = await fetch('shapes/bunny.obj').then(result => result.text());
    let bunny = [];
    bunny = objectParser(data);
    shapes[2] = createLoadedShape(bunny[0], bunny[1], bunny[2]);
    shapes[2].translateLocally([-0.5, 0.5, -1]);
    shapes[3] = createLoadedShape(bunny[0], bunny[1], bunny[2]);
    shapes[3].translateLocally([0.5, 0.5, -1]);

    const data2 = await fetch('shapes/teapot.obj').then(result => result.text());
    let teapot = [];
    teapot = objectParser(data2);
    shapes[1] = createLoadedShape(teapot[0], teapot[1], teapot[2]);
    shapes[1].translateLocally([-1.5, 0.5, -1]);
    shapes[4] = createLoadedShape(teapot[0], teapot[1], teapot[2]);
    shapes[4].translateLocally([+1.5, 0.5, -1]);
}


let then = 0;

function render(now) {
    /* --------- calculate time per frame in seconds --------- */
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    shapes[0].drawLines();
    for(i = 1; i<shapes.length; i++){

        shapes[i].draw();
        DisplayOCS(i);
    }

    requestAnimationFrame(render)
}








