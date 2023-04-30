const { mat4, mat3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
const objectCoordSystems = [];
let gl = null;

const shaders = {
    vertexDefault: "v-shader-default",
    vertexGouraudDiffuse: "v-shader-gouraud-diffuse",
    vertexGouraudSpecular: "v-shader-gouraud-specular",
    vertexPhong: "v-shader-phong",
    fragmentDefault: "f-shader-default",
    fragmentPhongDiffuse: "f-shader-phong-diffuse",
    fragmentPhongSpecular: "f-shader-phong-specular"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix",
        lightLocation: "lightLocation"
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
var lightSelected = false; //variable used to keep track of User selection
var globalLightPosition = [0.0, 10.0, 0.0, 1.0];