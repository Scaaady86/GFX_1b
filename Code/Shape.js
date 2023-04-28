class Shape {
    constructor() {
        this.vertices = [];
        this.colors = [];
        this.normals = [];

        var selected = false; //variable used to keep track of User selection

        this.buffers = {
            /* --------- initialize buffers --------- */
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
        }

        /* --------- initialize transformation matrix --------- */
        this.transformationMatrix = mat4.create();
        this.normalMatrix = mat3.create();
    }

    initData(vertices, colors, normals) {
        /* --------- flatten & convert data to 32 bit float arrays --------- */
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());
        this.normals = new Float32Array(normals.flat());

        /* --------- send data to buffers --------- */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }

    initDataCS(vertices, colors) {
        /* --------- flatten & convert data to 32 bit float arrays --------- */
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());

        /* --------- send data to buffers --------- */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    }

    draw() {
        /* --------- set up attribute arrays --------- */
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
        Shape.setupAttribute(this.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation, true);

        /* --------- combine view and model matrix into modelView matrix --------- */
        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.transformationMatrix);

        // construct normal matrix as inverse transpose of modelView matrix
        mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

        /* --------- send modelView matrix to GPU --------- */
        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);
        gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);

        /* --------- draw the shape --------- */
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 4);
    }

    drawLines() {
        /* --------- set up attribute arrays --------- */
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);

        /* --------- combine view and model matrix into modelView matrix --------- */
        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.transformationMatrix);

        /* --------- send modelView matrix to GPU --------- */
        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);

        /* --------- draw the shape --------- */
        gl.drawArrays(gl.LINES, 0, this.vertices.length / 4);
    }

    rotateLocally(angle, axis) {
        /**
         * The transformation functions that glMatrix provides apply the new transformation as the right hand operand,
         * which means the new transformation will be the first one to be applied (this will result in a local transformation)
         *
         * The function call below would look like this if you write down the matrices directly:
         * transformationMatrix * rotationMatrix
         * 
         */
        mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, axis);
        
    }

    rotateGlobally(angle, axis) {
        /**
         * To get global transformations, you need to apply the new transformation after all the other transformations, i.e. as the left-most operand:
         * rotationMatrix * transformationMatrix
         * 
         * You can do this manually by construction the transformation matrix and then using mat4.multiply(out, leftOperand, rightOperand).
         * Uncomment the code below (and comment out the code above) to do global rotations instead of local ones.
         * 
         */
        
            const rotationMatrix = mat4.create();
            mat4.rotate(rotationMatrix, rotationMatrix, angle, axis);
            mat4.mul(this.transformationMatrix, rotationMatrix, this.transformationMatrix)
        
    }

    scaleLocally(vector){
        mat4.scale(this.transformationMatrix, this.transformationMatrix, vector);
    }

    scaleGlobally(vector){
        const scalingMatrix = mat4.create();
        mat4.scale(scalingMatrix, scalingMatrix, vector);
        mat4.mul(this.transformationMatrix, scalingMatrix, this.transformationMatrix)
    }

    translateLocally(vector){
        mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);
    }

    translateGlobally(vector) {
        const translationMatrix = mat4.create();
        mat4.translate(translationMatrix, translationMatrix, vector);
        mat4.mul(this.transformationMatrix, translationMatrix, this.transformationMatrix)
    }

    static setupAttribute(buffer, location, isNormal = false) {
        if (location === -1 || location === undefined) return;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            isNormal? 3 : 4, // number of elements for each attribute/vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // is data normalised?
            (isNormal ? 3 : 4) * Float32Array.BYTES_PER_ELEMENT, // size for one vertex
            0 // offset from begin of vertex to the attribute
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }
}
