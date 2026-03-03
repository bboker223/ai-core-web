// vue.config.js
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    configureWebpack: (config) => {
        // 确保只在生产模式下混淆
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new WebpackObfuscator(
                    {
                        // 压缩代码
                        compact: true,
                        // 是否启用控制流扁平化(降低1.5倍的运行速度)
                        controlFlowFlattening: false,
                        // 随机的死代码块(增加了混淆代码的大小)
                        deadCodeInjection: false,
                        // 此选项几乎不可能使用开发者工具的控制台选项卡
                        debugProtection: true,
                        // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
                        debugProtectionInterval: true,
                        // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
                        disableConsoleOutput: true,
                        // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
                        identifierNamesGenerator: 'hexadecimal',
                        log: false,
                        // 是否启用全局变量和函数名称的混淆
                        renameGlobals: false,
                        // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
                        rotateStringArray: true,
                        // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat :true;
                        selfDefending: true,
                        // 删除字符串文字并将它们放在一个特殊的数组中
                        stringArray: true,
                        stringArrayEncoding: false,
                        stringArrayThreshold: 0.75,
                        // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
                        unicodeEscapeSequence: true
                    },
                    []
                )
            );
        }
    }


    // configureWebpack: (config) => {
    //     // 确保只在生产模式下混淆，避免影响开发调试
    //     if (process.env.NODE_ENV === 'production') {
    //         config.plugins.push(
    //             new WebpackObfuscator(
    //                 {
    //                     // 基础混淆选项
    //                     compact: true, // 启用紧凑模式
    //                     controlFlowFlattening: true, // 启用控制流扁平化
    //                     controlFlowFlatteningThreshold: 0.75, // 扁平化阈值，0.75是一个平衡点
    //                     deadCodeInjection: true, // 注入死代码
    //                     deadCodeInjectionThreshold: 0.4, // 死代码注入阈值
    //                     stringArray: true, // 启用字符串数组
    //                     stringArrayEncoding: 'base64', // 使用 Base64 编码字符串
    //                     stringArrayThreshold: 0.75, // 字符串数组混淆的阈值
    //                     transformObjectKeys: true, // 转换对象键名
    //                     identifierNamesGenerator: 'hexadecimal', // 使用十六进制标识符名称
    //
    //                     // 保持兼容性的选项
    //                     // 禁用自执行代码保护，以免和Vue或某些库冲突
    //                     selfDefending: false,
    //                     // 禁用调试保护，以免浏览器控制台进入死循环
    //                     debugProtection: false,
    //                     debugProtectionInterval: false,
    //
    //                     // 保留重要的全局变量，防止混淆后出错
    //                     reservedNames: [],
    //                     reservedStrings: ['^\\s*debugger\\s*'],
    //                 },
    //                 // 这是插件的第二个参数，用于排除不需要混淆的文件。
    //                 // 因为你之前提到了需要全部混淆，所以这里留空即可。
    //                 // 也可以根据需要排除一些文件，例如node_modules下的文件
    //                 []
    //             )
    //         );
    //     }
    // }
}
