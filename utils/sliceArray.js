export default function (array, chunkSize) {
    const splitArray = [];
    console.log(chunkSize)
    if(chunkSize == 0){
        return array
    }else{
        let x = 0;
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            splitArray[x] = chunk
            x++
        }
        return splitArray
    }
}
