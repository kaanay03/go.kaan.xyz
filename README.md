# go.kaan.xyz
![Build and Deploy](https://github.com/kaanay03/go.kaan.xyz/workflows/Build%20and%20Deploy/badge.svg) 
![License](https://img.shields.io/badge/license-MIT-blue)

The source code for my personal link shortener. [go.kaan.xyz](https://go.kaan.xyz)

![MyLinks Image](https://cdn.kaan.xyz/img/45cobR.png)

## Project Tree
`public` - Static assets  
`views` - Frontend templates  
`routes` - Request handlers  
`models` - Database models  
`middleware` - Middleware functions  
`server.js` - Server setup  

## Config
### Environmental Variables
| Key            | Value                                   |
|----------------|-----------------------------------------|
| MONGO_URI      | Your MongoDB connection string.         |
| SESSION_SECRET | Any secret key to encrypt session data. |

**Development**  
Configure environmental variables in `.env` file in root directory of the project.

## Setup
```
git clone https://github.com/kaanay03/go.kaan.xyz
cd go.kaan.xyz
npm install

npm run dev 
OR
npm start
```

## License
go.kaan.xyz is released under the [MiT License](https://opensource.org/licenses/MIT).
