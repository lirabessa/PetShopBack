const {google} = require("googleapis")
const {Readable} = require("stream")
const { OAuth2Client } = require("google-auth-library")



const GOOGLE_DRIVE_CLIENT_ID = "816380505411-01eca1blss2udnjk97ab08ga7lvt68cf.apps.googleusercontent.com"
const GOOGLE_DRIVE_CLIENT_SECRET = "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"
const GOOGLE_DRIVE_REDIRECT_URI = "https://developers.google.com/oauthplayground"
const GOOGLE_DRIVE_REFRESH_TOKEN = "1//04vNPL-y8SFRZCgYIARAAGAQSNwF-L9IrCj7rTZc_b8sk3EGDeIbShDt1gfkpapvmiBhGduSq6_RNCLQgtXl3gjlWQFtQgjHOEfE"





const createDriveClient = (clientId, clientSecret, redirectUri, refreshToken) => {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    client.setCredentials({ refresh_token: refreshToken });
    return google.drive({
        version: 'v3',
        auth: client,
    });
}
const client = createDriveClient(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN);
const createFolder = async (folderName) => {
    try{
        const folder = await client.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            },
            fields: 'id, name',
        })
        return folder
    }catch(error){
        console.error(error)
        throw error
    }
}

const verifyAndcreateFolderIfNotExist = async (folderName) => {
    try{
        const folder = await searchFolder(folderName);
        if(folder.data.files.length){
            return folder.data.files[0].id;
        }else{
            const newFolder = await createFolder(folderName);
            return newFolder.data.id;
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}

const searchFolder = async (folderName) => {
    try {
        const folders = await client.files.list({
                q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
                fields: 'files(id, name, createdTime)',
        });
        return folders;
    } catch (error) {
        console.error(`Erro ao buscar pasta ${folderName}:`, error);
        throw error;
    }
};

const sendFileFromDrive = async (filename, mimetype, fileContent, folderId) => {
    const fileMetadata = {
        name: filename,
        parents: [folderId] // ID da pasta onde o arquivo será salvo
    };
    const media = {
        mimeType: mimetype,
        body: Readable.from(fileContent)
    };

    try {
        const response = await client.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name',
            supportsAllDrives: true,

        });

        const fileId = response.data.id;
        await setFilePermissions(fileId);

        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}

    const setFilePermissions = async (fileId) => {
        const permissions = {
            role: 'reader',
            type: 'anyone',
        };

        try {
            await client.permissions.create({
                fileId: fileId,
                requestBody: permissions,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // const async getImageLinkById(imageId){
    //     try{
    //         const response = await client.files.get({
    //             fileId: imageId,
    //             fields: 'webViewLink'
    //         });
    //         return response.data.webViewLink;
    //     }catch(error){
    //         console.error(error);
    //         throw error;
    //     }
    // }

const getImageLinkById = async (imageId) => {
    try{
        const response = await client.files.get({
            fileId: imageId,
            fields: 'webViewLink'
        });
        const webViewLink = response.data.webViewLink;
        const splitLink = webViewLink.split('/');
        const newLink = `https://drive.google.com/uc?id=${splitLink[5]}`;
        return newLink;
    }catch(error){
        console.error(error);
        throw error;
    }
}


module.exports = {createDriveClient, verifyAndcreateFolderIfNotExist, sendFileFromDrive };


//export default new Drive(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN);