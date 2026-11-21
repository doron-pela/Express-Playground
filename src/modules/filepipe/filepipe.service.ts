import { readFile, writeFile } from 'node:fs/promises';

const filePath = './file.txt';

const fileContents = `This is another string of content I am writing into file.txt. It is a test script. And it will write. 
        \n
        I am trying to see what happens with spaces and newline characters as well. What happens now? Do I only see the text on the markup,
        or is it being printed to the file too?`;

async function writeAndReadFile() {
    await writeFile(filePath, fileContents);
    return readFile(filePath, 'utf-8');
}

export default { writeAndReadFile };
