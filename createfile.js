const { fakerDE: faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');
const PARAGRAPHS = 50000;

function createSampleFile() {
  const filePath = path.join(__dirname, 'files', 'sample.txt');
  // const content = faker.lorem.paragraphs(50000000); // Generate 50000000 paragraphs of lorem ipsum text as it is in memory
  // fs.writeFileSync(filePath, content, 'utf8');

  for (let i = 0; i < PARAGRAPHS; i++) {
    const content = faker.lorem.paragraphs(10000); // Generate 1000 paragraph of lorem ipsum text
    fs.appendFileSync(filePath, content + '\n', function(err, data) {
        if (err) {
            console.error('Error appending to file:', err);
        }
        console.log(`Appended paragraph ${i + 1} to file.`, data); // Log each append operation
    }); // Append to the file
  }

  console.log(`Sample file created at ${filePath}`);
}

createSampleFile()