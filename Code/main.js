

const { mat4, mat3} = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
const objectCoordSystems = [];
let gl = null;

const shaders = {
    default: "v-shader-default",
    gouraudDiffuse: "v-shader-gouraud-diffuse",
    fragment: "f-shader"
}

const locations = {
    attributes: {
        vertexLocation: null,
        colorLocation: null,
        normalLocation: null
    }, uniforms: {
        modelViewMatrix: null,
        viewMatrix: null,
        projectionMatrix: null,
        normalMatrix: null
    }
}

const viewMatrix = mat4.create();

var cameraSelected = true; //variable used to keep track of User selection
var selectedAll = false; //variable used to keep track of User selection

window.onload = async () => {

    /* --------- basic setup --------- */
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674   , 1);

    const program = createShaderProgram("v-shader-gouraud-diffuse", "f-shader");
    gl.useProgram(program);
    

    /* --------- save attribute & uniform locations --------- */
    locations.attributes.vertexLocation = gl.getAttribLocation(program, "vertexPosition");
    locations.attributes.colorLocation = gl.getAttribLocation(program, "vertexColor");
    locations.attributes.normalLocation = gl.getAttribLocation(program, "vertexNormal");
    locations.uniforms.modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    locations.uniforms.projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
    locations.uniforms.viewMatrix = gl.getUniformLocation(program, "viewMatrix");
    locations.uniforms.normalMatrix = gl.getUniformLocation(program, "normalMatrix");


    /* --------- create & send projection matrix --------- */
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, gl.FALSE, projectionMatrix);

    /* --------- create view matrix --------- */
    mat4.lookAt(viewMatrix, [0, 0, 3], [0, 0, 0], [0, 1, 0]);

    gl.uniformMatrix4fv(locations.uniforms.viewMatrix, gl.FALSE, viewMatrix);

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

    shapes.push()

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

/* --------- simple example of loading external files --------- */
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
    for(i = 1; i<10; i++){

        shapes[i].draw();
        DisplayOCS(i);
    }

    requestAnimationFrame(render)
}








