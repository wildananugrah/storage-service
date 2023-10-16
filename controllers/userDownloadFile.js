import fs from 'fs'
import archiver from 'archiver'

export default async (req, res) => {

    const { files, username } = req.query

    try {

        const userProfile = await fetch(`${process.env.DIUDARA_BE_HOST}/user-profile/${username}`)
        const userProfileJson = await userProfile.json()
        const userProfileData = userProfileJson.data

        const PATH_HOME = `uploads/${userProfileData.id}`

        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // Set the headers to send the file as a download
        res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename=download.zip'
        });

        // Pipe the archive data to the response object to download the zip
        archive.pipe(res);

        // Add files to the zip. For this example, I'm adding two sample files.
        // You can add as many files as you want.
        // TODO: it should be better. 
        if (typeof files === "string") archive.append(fs.createReadStream(`${PATH_HOME}/${files}`), { name: `${files.split("/").pop()}.${files.split('.').pop().toLowerCase()}` });
        else if (typeof files === "object")
            for (let i = 0; i < files.length; i++) {
                archive.append(fs.createReadStream(`${PATH_HOME}/${files[i]}`), { name: `${files[i].split("/").pop()}` });
            }

        // Finalize the archive (this step is essential to ensure your archive is finalized and fully sent to the client)
        archive.finalize();

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
