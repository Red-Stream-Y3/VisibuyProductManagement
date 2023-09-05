import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import findConfig from 'find-config';

const express = require("express");
const app = express();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: findConfig('.env.dev') });
  }

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

