/* --------- File to store Shapecreation --------- */

function createCube() {
    /* --------- define vertex positions & colors --------- */
    /* -------------- 3 vertices per triangle ------------- */
    const vertices = [
        // X, Y, Z, W
        0.2, 0.2, 0.2, 1,
        -0.2, 0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1,

        -0.2, 0.2, 0.2, 1,
        -0.2, -0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // front face end

        -0.2, -0.2, -0.2, 1,
        -0.2, -0.2, 0.2, 1,
        -0.2, 0.2, 0.2, 1,

        -0.2, -0.2, -0.2, 1,
        -0.2, 0.2, 0.2, 1,
        -0.2, 0.2, -0.2, 1, // left face end

        0.2, 0.2, -0.2, 1,
        -0.2, -0.2, -0.2, 1,
        -0.2, 0.2, -0.2, 1,

        0.2, 0.2, -0.2, 1,
        0.2, -0.2, -0.2, 1,
        -0.2, -0.2, -0.2, 1, // back face end

        0.2, -0.2, 0.2, 1,
        -0.2, -0.2, -0.2, 1,
        0.2, -0.2, -0.2, 1,

        0.2, -0.2, 0.2, 1,
        -0.2, -0.2, 0.2, 1,
        -0.2, -0.2, -0.2, 1, // bottom face end

        0.2, 0.2, 0.2, 1,
        0.2, -0.2, -0.2, 1,
        0.2, 0.2, -0.2, 1,

        0.2, -0.2, -0.2, 1,
        0.2, 0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // right face end

        0.2, 0.2, 0.2, 1,
        0.2, 0.2, -0.2, 1,
        -0.2, 0.2, -0.2, 1,

        0.2, 0.2, 0.2, 1,
        -0.2, 0.2, -0.2, 1,
        -0.2, 0.2, 0.2, 1, // Top face end
    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // top face: purple
    ];

    const colors = [];

    /* --------- add one color per face, so 6 times for each color --------- */
    colorData.forEach(color => {
        for (let i = 0; i < 6; ++i) {
            colors.push(color);
        }
    });

    /* --------- create shape object and initialize data --------- */
    const cube = new Shape();
    cube.initData(vertices, colors);

    return cube;
}

function createPyramid() {
    /* --------- define vertex positions & colors --------- */
    const vertices = [
        // X, Y, Z, W
        0, 0.2, 0, 1,
        -0.2, -0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // front face end

        0, 0.2, 0, 1,
        0, -0.2, -0.2, 1,
        -0.2, -0.2, 0.2, 1, // left face end

        0, 0.2, 0, 1,
        0.2, -0.2, 0.2, 1,
        0, -0.2, -0.2, 1, // right face end

        0, -0.2, -0.2, 1,
        -0.2, -0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // bottom face end

    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
    ];

    const colors = [];

    /* --------- add one color per face--------- */
    colorData.forEach(color => {
        for (let i = 0; i < 4; ++i) {
            colors.push(color);
        }
    });

    /* --------- create shape object and initialize data --------- */
    const pyramid = new Shape();
    pyramid.initData(vertices, colors)

    return pyramid;
}

function createWCS(){
    /* --------- define vertex positions & colors --------- */
    const vertices = [
        // X, Y, Z, W
        -100, 0, 0, 1,
        100, 0, 0, 1,

        0, -100, 0, 1,
        0, 100, 0, 1,

        0, 0, -100, 1,
        0, 0, 100, 1,


    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 0.0, 1.0, 1.0],    // back face: green
    ];

    const colors = [];

    /* --------- add one color per face--------- */
    colorData.forEach(color => {
        for (let i = 0; i < 3; ++i) {
            colors.push(color);
        }
    });

    /* --------- create shape object and initialize data --------- */
    const wcs = new Shape();
    wcs.initData(vertices, colors)
    return wcs;
}

function createOCS(){
     /* --------- define vertex positions & colors --------- */
    const vertices = [
        // X, Y, Z, W
        -0.5, 0, 0, 1,
        0.5, 0, 0, 1,

        0, -0.5, 0, 1,
        0, 0.5, 0, 1,

        0, 0, -0.5, 1,
        0, 0, 0.5, 1,


    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 0.0, 1.0, 1.0],    // back face: green
    ];

    const colors = [];

    /* --------- add one color per face--------- */
    colorData.forEach(color => {
        for (let i = 0; i < 3; ++i) {
            colors.push(color);
        }
    });

    /* --------- create shape object and initialize data --------- */
    const ocs = new Shape();
    ocs.initData(vertices, colors)

    return ocs;
}

function DisplayOCS(i){
    if(shapes[i].selected) shapes[i+9].drawLines();
}

function createLoadedShape(vertices, colors){
    const loadedShape = new Shape();
    loadedShape.initData(vertices, colors);

    return loadedShape; 
}