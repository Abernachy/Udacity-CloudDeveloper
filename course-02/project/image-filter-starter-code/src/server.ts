import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { filterImageFromURL, deleteLocalFiles } from './util/util'
;(async () => {
	// Init the Express application
	const app = express()

	// Set the network port
	const port = process.env.PORT || 8082

	// Use the body parser middleware for post requests
	app.use(bodyParser.json())

	// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
	// GET /filteredimage?image_url={{URL}}

	app.get('/filteredimage', async (req: Request, res: Response) => {
		// has to begin with 'https://' or 'http://'
		const image_url = req.query.image_url as string

		try {
			if (
				image_url.includes('http://') ||
				(image_url.includes('https://') && image_url.includes('.jpg')) ||
				image_url.includes('.png')
			) {
				const filteredPath: string = await filterImageFromURL(image_url)

				res.status(200).sendFile(filteredPath)
				setTimeout(() => deleteLocalFiles([filteredPath]), 3000)
			} else {
				res.status(400).send(`Error, not a valid image url. URL Recieved: ${image_url}`)
			}
		} catch (err) {
			res.status(400).send(`Error: ${err} URL: ${image_url}`)
		}
	})
	// endpoint to filter an image from a public url.
	// IT SHOULD
	//    1
	//    1. validate the image_url query
	//    2. call filterImageFromURL(image_url) to filter the image
	//    3. send the resulting file in the response
	//    4. deletes any files on the server on finish of the response
	// QUERY PARAMATERS
	//    image_url: URL of a publicly accessible image
	// RETURNS
	//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

	/**************************************************************************** */

	//! END @TODO1

	// Root Endpoint
	// Displays a simple message to the user
	app.get('/', async (req: Request, res: Response) => {
		res.send('try GET /filteredimage?image_url={{}}')
	})

	// Start the Server
	app.listen(port, () => {
		console.log(`server running http://localhost:${port}`)
		console.log(`press CTRL+C to stop server`)
	})
})()
