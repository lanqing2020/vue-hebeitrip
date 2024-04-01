module.exports = {
    plugins: {
        autoprefixer: {
            // autoprefixer自动补齐CSS3前缀
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions"
            ]
        },
        "postcss-pxtorem": {
            rootValue({ file }) {
                return file.indexOf("vant") !== -1 ? 37.5 : 75; // 这一段代码,设计稿的宽度是750
                // return file.indexOf("vant") !== -1 ? 108 : 216; // 设计稿宽度为1080px，基准值分别为108和216
            },
            propList: ["*"],    // 需要转换的css属性，默认*全部
        }
    }
}