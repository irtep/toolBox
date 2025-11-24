/*

---------------------
React TS:
---------------------

npm create vite@latest . --template react

MUI:

npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto


---------------------
Node TS express:
---------------------

npm init -y
npm install express
npm install -D typescript @types/node @types/express ts-node nodemon
npx tsc --init

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

src/index.ts

import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript Express!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

add to package.json:
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}



*/