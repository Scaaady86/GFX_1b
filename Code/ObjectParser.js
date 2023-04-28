//object parser for loading any kind of .obj
function objectParser(data){
    let vertices = [];
    let indices = [];
    let colors = [];

    const rows = data.split("\n");
    let chunks = [];

    for(let row of rows){
        chunks.push(row.split(' '));
    }
    console.log("chunks");
    console.log(chunks);
    for(let chunk of chunks){
        const type = chunk[0];

        if(type === 'v')
        vertices.push(chunk);
        for (let value = 1; value < chunk.length; ++value){
            switch (type){
                case 'f':
                    console.log(chunk[value]);
                    indices.push(parseInt(chunk[value])-1);
                    break;
            }
        }
    }

    console.log("vertices");
    console.log(vertices);
    console.log("indices");
    console.log(indices);
    let parsedVertices = [];

    for(let index of indices){
        parsedVertices.push(parseFloat(vertices[index][1]));
        parsedVertices.push(parseFloat(vertices[index][2]));
        parsedVertices.push(parseFloat(vertices[index][3]));
        parsedVertices.push(1);
    
    }

    for (let i of indices){
        colors.push(0, 0, 0, 1);
    }

    console.log(parsedVertices);
    return [parsedVertices, colors];
}