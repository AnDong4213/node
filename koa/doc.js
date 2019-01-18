安装两个版本的koa  
一、版本安装  
1.安装koa1  
npm install koa -g   //必须安装到全局，安装到C:\Users\taolue\AppData\Roaming\npm\node_modules\koa  
2.安装koa2  
npm install koa@2 -g  
二、创建项目  
1.安装koa生成器(koa1和koa2都用此生成器)  
npm install koa-generator -g  
  
2.koa1 生成一个test项目,切到test目录并下载依赖   
koa test  
cd test   
npm install  
运行：npm start  
访问：http://localhost:3000  
  
3.创建koa2项目  
koa2 生成一个test项目,切到test目录并下载依赖   
koa2 test   
cd test   
npm install  
运行：npm start  
访问：http://localhost:3000 


1. koa的get提交接收参数用 this.query['email']或this.request.query['']








