// import React, { useState } from 'react';
// import AWS from 'aws-sdk';
// require('dotenv').config();

// const S3_BUCKET = 'resprint-media';
// const REGION = 'us-east-1';

// AWS.config.update({
// 	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
// });

// const myBucket = new AWS.S3({
// 	params: { Bucket: S3_BUCKET },
// 	region: REGION,
// });

// const UploadImageToS3WithNativeSdk = () => {
// 	const [progress, setProgress] = useState(0);
// 	const [selectedFile, setSelectedFile] = useState(null);
// 	const [fileName, setFileName] = useState(undefined);

// 	const handleFileInput = (e) => {
// 		//console.log(e.target.files[0]);
// 		setFileName(e.target.files[0].name);
// 		setSelectedFile(e.target.files[0]);
// 	};

// 	const uploadFile = (file) => {
// 		const params = {
// 			// ACL: 'public-read',
// 			Body: file,
// 			Bucket: S3_BUCKET,
// 			Key: file.name,
// 		};

// 		myBucket
// 			.putObject(params)
// 			.on('httpUploadProgress', (evt) => {
// 				setProgress(Math.round((evt.loaded / evt.total) * 100));
// 			})
// 			.send((err) => {
// 				if (err) console.log(err);
// 			});
// 	};

// 	return (
// 		<div>
// 			<div>Native SDK File Upload Progress is {progress}%</div>
// 			<input type="file" onChange={handleFileInput} />
// 			<button type="button" onClick={() => uploadFile(selectedFile)}>
// 				Upload
// 			</button>
// 		</div>
// 	);
// };

// export default UploadImageToS3WithNativeSdk;
