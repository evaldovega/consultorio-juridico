
export function Chunk(array,chunkSize=2){
    let chunkCount = Math.ceil(array.length / chunkSize);
    let chunks = new Array(chunkCount);
    for(let i = 0, j = 0, k = chunkSize; i < chunkCount; ++i) {
        chunks[i] = array.slice(j, k);
        j = k;
        k += chunkSize;
    }
    return chunks;
}