const contentful = require('contentful-management');
const fs = require('fs');
const readline = require('readline');

require("dotenv").config({
    path: `../.env.${process.env.NODE_ENV}`,
});

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

async function importContentModels() {
try {
        // Prompt the user for the necessary keys
        const spaceId = await askQuestion("Please enter your Contentful Space ID: ");
        const accessToken = await askQuestion("Please enter your Contentful Management API Access Token (CFPAT-): ");
        const contentDeliveryApiKey = await askQuestion("Please enter your Contentful Content Delivery API Key: ");

        // Log the inputs for verification
        console.log(`Space ID: ${spaceId}`);
        console.log(`Management API Access Token: ${accessToken}`);
        console.log(`Content Delivery API Key: ${contentDeliveryApiKey}`);

        // Write to .env.development and .env.production files
        const envContent = `CONTENTFUL_SPACE_ID=${spaceId}\nCONTENTFUL_CMA_TOKEN=${accessToken}\nCONTENTFUL_ACCESS_TOKEN=${contentDeliveryApiKey}\n`;
        fs.writeFileSync('../.env.development', envContent);
        fs.writeFileSync('../.env.production', envContent);

        // Create a Contentful client
        const client = contentful.createClient({
            accessToken: accessToken
        });

        // Authenticate and get the target space
        const space = await client.getSpace(spaceId);
        const environment = await space.getEnvironment('master');

        // Read the JSON data containing content models
        const contentModels = require('../data.json');

        // Iterate over each content model and import it
        for (const contentType of contentModels.contentTypes) {
            console.log(`Importing content model '${contentType.sys.id}'...`);
            await environment.createContentTypeWithId(contentType.sys.id, contentType);
            console.log(`Content model '${contentType.sys.id}' imported successfully.`);
        }

        console.log('All content models imported successfully.');
    } catch (error) {
        console.error('Error importing content models:', error);
    }
}

importContentModels();
