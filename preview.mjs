import http from 'node:http';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const files=new Map([['/',['index.html','text/html; charset=utf-8']],['/index.html',['index.html','text/html; charset=utf-8']],['/assets/preview.webp',['assets/preview.webp','image/webp']]]);
// 预览只提供明确列出的公开文件，不暴露 Git、文档或环境文件。
const server=http.createServer((req,res)=>{const item=files.get(new URL(req.url,'http://localhost').pathname);if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end()}if(!item){res.writeHead(404);return res.end()}const data=readFileSync(path.join(root,item[0]));res.writeHead(200,{'Content-Type':item[1],'Content-Length':data.length,'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data)});
server.listen(4179,'127.0.0.1',()=>console.log('http://127.0.0.1:4179/'));
