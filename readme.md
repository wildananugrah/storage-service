An application that provide another application to manage their files (image and video files) via RESTful API. 

The application enables the user to:
1. upload a file, 
2. get files, 
3. get a file, and 
4. delete a file. 

# Libraries we uses
1. [express](https://expressjs.com)
2. [morgan](https://www.npmjs.com/package/morgan)
3. [multer](https://github.com/expressjs/multer)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [nodemon](https://www.npmjs.com/package/nodemon) (dev)

# How to run 
```sh
npm run dev
```

# Preparation

## Demo

## Setup init
1. run `npm init` then enter until it is done
2. npm i nodemon multer morgan dotenv --save
3. update package.json

```json
{
  "name": "diudara-storage-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // add module type
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js" // add nodemon index.js
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.0.1"
  }
}
```

## Build index.js
1. first we build the simple one until the server running
2. setup the .env variable
3. setup multerstorage in index
4. setup morgan

## Build postUpload
1. create folder
2. check folder exists
3. copy file
4. delete file
5. setup response
6. trycatch

## Build getFiles
1. build the simple one
2. build listFilesRecursively
3. build categorizeFiles
4. trycatch

## Build deleteFile
1. unlink file
2. trycatch

## Build getFile
1. build the simple one
2. build imageResponse
3. build videoResponse

# APIs

## Upload file
```bash
curl --location 'http://{hostname}:{port}/upload' \
--form 'myFile=@"/pathToFile/{filename}"' \
--form 'user_id="{user_id}"' \
--form 'type="image | video"'
```
```json
{
    "data": {
        "filename": "20582460_1908385709410162_142670335307677696_a.jpg",
        "path": "/image/20582460_1908385709410162_142670335307677696_a.jpg"
    }
}
```

## Get files
```bash
curl --location 'http://{hostname}:{port}/files/46dc5650-10f3-4531-8a74-97e3cf480cc7'
```
```json
{
    "files": {
        "images": [
            "/20582460_1908385709410162_142670335307677696_a.jpg",
            "/YjPYp-WU_400x400.jpg"
        ],
        "videos": [
            "/test/wildan-test1.mp4",
            "/wildan-test2.mp4"
        ]
    }
}
```

## Get a file
```bash
curl --location 'http://localhost:8000/files/{userId}/{type}/{imagePath | videoPath}'
```

## Delete file
```bash
curl --location --request DELETE 'http://{hostname}:{port}/files/{userId}/{type}/{filename}'
```