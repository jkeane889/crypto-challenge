// webpack.base.js

module.exports = {
    stats: {
        colors: true,
        reasons: true,
        chunks: false
    },
    modules: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    }
}