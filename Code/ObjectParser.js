//object parser for loading any kind of .obj
function objectParser(data){
    let vertices = [];
    let vertexIndices = [];
    let normals = [];
    let normalIndices = [];
    let colors = [];

    //Split the data into rows
    const rows = data.split("\n");
    let chunks = [];

    //Put the values of the rows in an array
    for(let row of rows){
        chunks.push(row.split(' '));
    }

    //Extract the vertices, normals and split the f lines
    let fSplit = [];
    for(let chunk of chunks){
        const type = chunk[0];

        if(type === 'v')
        vertices.push(chunk);

        if(type === 'vn')
        normals.push(chunk);

        if(type === 'f'){
            for (let value = 1; value < chunk.length; ++value){
                fSplit.push(chunk[value].split('//'));
            }
        }
    }

    // extract the Indices
    for(let value = 0; value < fSplit.length; ++value){
        vertexIndices.push(parseFloat(fSplit[value][0])-1);
        normalIndices.push(parseFloat(fSplit[value][1])-1);
    }

    //finalise the vertices and normals
    let parsedVertices = [];
    let parsedNormals = [];

    for(let index of vertexIndices){
        parsedVertices.push(parseFloat(vertices[index][1]));
        parsedVertices.push(parseFloat(vertices[index][2]));
        parsedVertices.push(parseFloat(vertices[index][3]));
        parsedVertices.push(1);
    }
    for(let index of normalIndices){
        parsedNormals.push(parseFloat(normals[index][1]));
        parsedNormals.push(parseFloat(normals[index][2]));
        parsedNormals.push(parseFloat(normals[index][3]));
    }
    

    for (let i of parsedNormals){
        colors.push(0.5, 0, 0, 1);
    }

    return [parsedVertices, colors, parsedNormals];
}