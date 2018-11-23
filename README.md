Webpack:
    1. 什么是webpack
        webpack作为一个模块打包器，主要用于前端工程中的依赖梳理和模块打包，将我们开发的具有高可读性和可维护性的代码文件打包成浏览器可以识别并正常运行的压缩代码，主要包括样式文件处理成css，各种新式的JavaScript转换成浏览器认识的写法等，也是前端工程师进阶的不二法门。
    ----------------------------------------------------------------------------

    2. 为什么要使用webpack
        1.支持模块化:让我们可以把复杂的程序细化为小的文件
            在模块化编程中，开发者将程序分解成离散功能块，并称之为模块。
            webpack 模块能够以各种方式表达它们的依赖关系:
                ES2015 import 语句
                CommonJS require() 语句
                AMD define 和 require 语句
                css/sass/less 文件中的 @import 语句。
                样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

        2.编译工作： webpack 通过 loader 可以支持各种语言和预处理器编写模块:
                        less ->css  sass -> css  es6 -> es5  typescript -> ES5
            

        3.创建一个本地服务器：基于Node的服务器(用于热更新：不需要手动刷新，代码修改完毕，自动刷新)

        4.所有的文件名必须是英文状态下的。
    
    ---------------------------------------------------------------------------------

    3.webpack简单案例使用 （案例demo1）
        1.创建项目（demo1文件夹）

        2.初始化package.json
        命令：npm init

        3.安装项目依赖的webpack
        命令：npm install --save-dev webpack

        4.创建两个文件夹app和build
        src：源代码
        build：编译只有的输出路径

        5.编写对应的代码
        hello:
            module.exports = function(){
                var hello = document.createElement("div");
                hello.textContent = "hello world";
                return hello;
            }
        index:
            var hello = require("./hello.js");
            document.getElementById("app").appendChild(hello());

        build/index.html
            引入打包的出口文件

        6.使用webpack进行编译
            命令：webpack  路径/入口文件  -o  路径/出口文件
            具体：webpack  src/index.js  -o  build/bundle.js
        
        7. 编写一个入口和出口的webpack的配置文件webpack.config.js:
            webpack.config.js配置项简介:
            Entry：入口文件配置，Webpack 执行构建的第一步将从 Entry 开始，完成整个工程的打包。
            Module：模块，在Webpack里一切皆模块，Webpack会从配置的Entry开始递归找出所有依赖的模块，最常用的是rules配置项，功能是匹配对应的后缀，
                    从而针对代码文件完成格式转换和压缩合并等指定的操作。
            Loader：模块转换器，用于把模块原内容按照需求转换成新内容，这个是配合Module模块中的rules中的配置项来使用。
            Plugins：扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。(插件API)
            Output：输出结果，在Webpack经过一系列处理并得出最终想要的代码后输出结果，配置项用于指定输出文件夹，默认是./dist。
            DevServer：用于配置开发过程中使用的本机服务器配置，属于webpack-dev-server这个插件的配置项。

            入口(entry)
                单入口: entry:"src/index.js",
                多入口：entry: {
                            page1: 'src/index1.js',
                            page2: 'src/index2.js',
                            page3: 'src/index3.js',
                    }
            输出(output)
                单出口: output:{
                            fileName:'bundle.js', // 用于输出文件的文件名
                            path:'./build' // 目标输出目录 path 的绝对路径。
                        }
                多出口：output: {
                            fileName:'[name].js', 
                            path:'./build'
                        }

            2.在根目录下去编写webpack.config.js

            3.定义入口：entry

            4.定义出口：output

            5.__dirname：nodejs中的方法，当前路径
            module.exports = {
                // 入口文件
                entry:"src/index.js",
                output:{
                    path:__dirname+"/build",
                    filename:"bundle.js"
                }
            }

            6.执行
            webpack命令

        ---------------------------------------------------------------------------------

        手动构建vue项目（demo2）
            package.json node依赖包 npm init命令生成
            安装webpack依赖
                npm install --save-dev webpack webpack-cli
            + webpack.config.js
            + .babelrc
            + index.html
            + src文件
            + src/main.js
            + src/App.vue
            
            搭建vue项目
                npm install --save-dev vue-loader
                npm install --save-dev vue-template-compiler

            搭webpack服务器
                npm install --save-dev webpack-dev-server

            修改配置
                "dev": "webpack-dev-server --hot --mode development"
                "build": "webpack --progress --hide-modules --mode production"

            webpack-dev-server有以下可选参数：
                --content-base //设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。
                --quiet: //控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面
                --no-info: // 不显示任何信息
                --colors: //对信息进行颜色输出
                --no-colors: //对信息不进行颜色输出
                --compress: //开启gzip压缩
                --host <hostname/ip>: //设置ip
                --port <number>: //设置端口号，默认是:8080
                --inline: //webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
                --hot: //开发热替换
                --open: //启动命令，自动打开浏览器
                --history-api-fallback: //查看历史url
            
            ***loader是webpack可以通过配置脚本，或者外部依赖来执行一些功能
              
                     需要在webpack.config.js文件中loader的配置vue-loader(解析和转换 .vue 文件)
                       注意： 在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
                            const VueLoaderPlugin = require('vue-loader/lib/plugin');
                            plugins: [
                                new VueLoaderPlugin()
                            ],

                        module: {
                            rules: [
                                { 
                                    test: /\.vue$/,
                                    loader: 'vue-loader'
                                }
                            ]
                        }
                    test：用正则匹配制定的文件类型；
                    use：当你匹配了这个文件后，使用什么样的loader去处理匹配到的文件，use接收的是一个数组，意味着当他匹配到文件后，它可以启用多个的loader去处理文件的内容；
                        例如： { 
                                test: /\.ts$/, 
                                use: 'ts-loader' 
                               }
                               {
                                   test: /\.scss$/,
                                    use: [
                                        {
                                            loader: "style-loader" // 将 JS 字符串生成为 style 节点
                                        }, {
                                            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                                        }, {
                                            loader: "sass-loader" // 将 Sass 编译成 CSS
                                        }
                                    ]
                               }
                               {
                                   test: /\.scss$/,
                                    loader: 'style-loader!css-loader!sass-loader'
                               }
                    include：'' // 匹配特定路径；
                    exclude： '' //排除特定路径；
                    resourceQuery: /xxxx/ // 正则，匹配路径；
                    and: [...] //必须匹配数组中所有条件;
                    or: [...] //匹配数组中任意一个条件；
                    not: [...] //排除匹配数组中所有条件；
                    options //用来限定具体的 loader 使用的配置参数

                // loader的常用配置
                *CSS处理
                    1.安装依赖
                    命令：npm install --save-dev style-loader  css-loader
                    2.loader的编写
                    {
                        test:/\.css$/,
                        loader:"style-loader!css-loader"
                    }

                *图片处理
                1.webpack提供了图片的处理方案
                命令：npm install --save-dev file-loader url-loader
                2.loader的编写
                {
                    test:/\.(png|jpg|gif|jpeg)$/,
                    loader:"url-loader?limit=2048" // 小于2M的图片，进行base64编码
                }

                *Less处理
                1.安装less处理依赖
                npm install --save-dev less less-loader
                2.loader的编写
                {
                    test:/\.less$/,
                    loader:"style-loader!css-loader!less-loader"
                }

                *js处理
                1.安装less处理依赖
                npm install --save-dev babel-loader
                {
                    test:/\.js$/,
                    loader:"babel-loader",
                }
                在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。.babelrc是一个json格式的文件。
                创建.babelrc文件
                {
                    "presets":["es2015"]
                }
                在.babelrc配置文件中，主要是对预设(presets) 和 插件(plugins) 进行配置

            ***插件 plugin
            const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader @15版本及以上必写
            const CopyWebpackPlugin = require('copy-webpack-plugin') // 用于拷贝文件

            plugins: [
                new VueLoaderPlugin(),
                new CopyWebpackPlugin([
                    {
                        from : './index.html',
                        to: './'
                    }
                ]),
            ],

            *** Resolve配置webpack如何寻找模块对应的文件
            resolve: {
                alias: { //通过别名来把原导入路径映射成一个新的导入路径,可以加快webpack查找模块的速度
                    'components': './src/components/',
                    '@': srcDir
                },
                extensions: ['.ts', '.js', '.json'] // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
            },

            *** DevServer会启动一个HTTP服务器用于服务网页请求，同时会帮助启动webpack，并接收webpack发出的文件变更信号，通过websocket协议自动刷新网页做到实时预览。
            devServer: {
                contentBase: path.join(__dirname, "dist"), //静态文件根目录
                port: 8080, // 端口
                host: 'localhost'
            }

  
        