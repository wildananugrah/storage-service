import fs from 'fs'
import archiver from 'archiver'

export default async (req, res) => {

    const userId = 'e93f311d-ed9d-46f1-a514-55d619fc9fc9'
    const PATH_HOME = `uploads/${userId}`

    const { files } = req.query

    try {

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
        for (let i = 0; i < files.length; i++) {
            archive.append(fs.createReadStream(`${PATH_HOME}/${files[i]}`), { name: `file${i}.jpg` });
        }

        // Finalize the archive (this step is essential to ensure your archive is finalized and fully sent to the client)
        archive.finalize();

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}
