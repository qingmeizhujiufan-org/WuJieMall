const path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
//app 主题
const theme = require('./package.json').theme;

const postcssOpts = {
    ident: 'postcss',
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        })
    ],
};

module.exports = {
    entry: {
        "index": path.resolve(__dirname, 'src/index'),
        //添加要打包在vendor.js里面的库
        vendor: ['react', 'react-dom', 'react-router']
    },

    output: {
        filename: '[name].[chunkhash:5].js',
        chunkFilename: 'chunk.[chunkhash:5].js',
        path: path.join(__dirname, '/build'),
    },

    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json'],
        //设置别名方便引用
        alias: {
            Utils: path.resolve(__dirname, 'src/util/'),//本地工具包
            Comps: path.resolve(__dirname, 'src/components/'),//组件
            RestUrl: path.resolve(__dirname, 'src/actions/RestUrl/'),//rest、http服务地址
            Img: path.resolve(__dirname, 'src/assets/img/'),//图片
        }
    },

    externals: {
        echarts: 'echarts'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ["import", {
                                libraryName: "antd-mobile",
                                style: true
                            }],
                            ["import", {
                                "libraryName": "lodash",
                                "libraryDirectory": "",
                                "camel2DashComponentName": false
                            }]
                        ],
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192&name=img/[name]_[hash:5].[ext]"
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: "url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]"
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {loader: 'postcss-loader', options: postcssOpts},
                        {loader: 'less-loader', options: {modifyVars: theme}}
                    ]
                })
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', {loader: 'postcss-loader', options: postcssOpts}
                    ]
                })
            }, {
                test: /\.svg$/i,
                use: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // antd-mobile使用的svg目录
                    path.resolve(__dirname, './src/'),  // 个人的svg文件目录，如果自己有svg需要在这里配置
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash:5].js',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({template: './public/index.html'}),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                compress: {
                    comparisons: false
                },
                output: {
                    ascii_only: true
                },
                warnings: true
            }
        }),//最小化一切
        new webpack.optimize.AggressiveMergingPlugin(),//合并块
        /* 分析包的大小分布 */
        // new BundleAnalyzerPlugin(),
    ]
}
