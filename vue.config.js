const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const os = require('os');
   
function getNetworkIp() {
  let needHost = ''; // 打开的host
  try {
      // 获得网络接口列表
      let network = os.networkInterfaces();
  // console.log("network",network)
      for (let dev in network) {
      
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
          // console.log("alias.address",alias.address)
                }
        // console.log("alias",alias)
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}

module.exports = {
  assetsDir: 'public', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  publicPath: '/', //部署应用包时的基本 URL。  
  devServer: {
    // host: getNetworkIp(),
    // port: process.env.NODE_ENV === 'development' ? port : 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      "/apil": {
				target: "https://ip.taobao.com/outGetIpInfo",
				changeOrigin: true,
				pathRewrite: {
					"^/apil": ""
				}
			}
    },
    host: 'localhost', //
    port: 8080, //
  },
}