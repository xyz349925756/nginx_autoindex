# nginx_autoindex 美化模板

## 预览

![image-20230913154626086](.readme.assets/image-20230913154626086.png)

![image-20230913154654152](.readme.assets/image-20230913154654152.png)

![image-20230913154716065](.readme.assets/image-20230913154716065.png)

>   如果不喜欢你们可以自己调整色彩这些.



## 使用

搭配nginx使用.

nginx配置如下

```conf
	server {
		listen  809;
		server_name  localhost;
		
		charset utf-8;
		
		location / {
			root f:\\soft\\.theme\\;
			index index.html;
		}
		
		location /json/ {
			alias f:\\soft\\;
			index json;
			autoindex on;
			autoindex_format json;		
			autoindex_localtime on;
			autoindex_exact_size off;
			
			add_header  Access-Control-Allow-Origin "*";
			add_header  Access-Control-Allow-Methods "GET, POST, OPTIONS";
			add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
			add_header  Access-Control-Allow-Credentials true;
		}
		
		 
		error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
	}
```

>   关于跨域访问的问题,没有测试,应该问题不大.