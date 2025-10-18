# YouTube Video Downloader (React + Flask + AWS)

![React](https://img.shields.io/badge/Frontend-React-blue.svg)
![Flask](https://img.shields.io/badge/Backend-Flask-darkgreen.svg)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange.svg)
![ffmpeg](https://img.shields.io/badge/Video%20Processing-ffmpeg-red.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

A full-stack **YouTube Video Downloader** built using **React** and **Flask** that allows users to **download specific portions of a YouTube video** by selecting custom **start and end times**.  
The application leverages **ffmpeg** for efficient video segment processing and **AWS S3** for secure cloud storage.  
Additionally, **AWS Lambda** handles automated transcoding into multiple video formats for flexible playback.

## Features

**Partial Video Download** – Select custom start and end timestamps for downloading specific segments.  
**ffmpeg Integration** – Process, trim, and serve video segments directly from the backend.  
**AWS S3 Storage** – Store processed videos securely and efficiently in the cloud.  
**Lambda-Based Transcoding** – Convert videos to multiple formats automatically (e.g., MP4, MKV, MOV).  
**Modern React Frontend** – Intuitive and responsive UI for easy video selection and download.  
**Flask API Backend** – Handles download requests, video processing, and AWS integration.  
