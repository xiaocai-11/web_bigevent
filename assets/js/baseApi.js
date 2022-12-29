// 封装一个自动拼接 url地址的 函数
// 每次调用 $.get $.post $.ajax 的时候
// 都会先 调用 ajaxPrefilter 这个函数
// 在这个函数里，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //  在发起真正的Ajax请求之前，同意拼接 请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})