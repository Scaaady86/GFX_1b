const { mat4, mat3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
const objectCoordSystems = [];
let gl = null;

const shaders = {
    default: "v-shader-default",
    gouraudDiffuse: "v-shader-gouraud-diffuse",
    gouraudSpecular: "v-shader-gouraud-specular",
    fragment: "f-shader"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal",
        lightLocation: "lightPosition"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix"
    }
}

const shaderPrograms = {
    noLightProgram: null,
    withLightProgram: null
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}

var cameraSelected = true; //variable used to keep track of User selection
var selectedAll = false; //variable used to keep track of User selection