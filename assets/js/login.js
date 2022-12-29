$(function() {
    // 1. 点击注册账号的a,隐藏登录盒子，让注册的盒子显示
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 2. 点击登录的账号a，隐藏注册的盒子，让登录的盒子显示
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        // 3. 从layui中获取 form对象
    let form = layui.form
    let layer = layui.layer
        // 通过form.verify() 函数自定义校验规则
    form.verify({
        //自定义 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 4. 进行两次密码是否一致的判断
        repwd: function(value) {
            // value 拿到的是确认密码的值
            let pwd = $('.reg-box [name=password]').val()
                // console.log(pwd)
            if (pwd !== value) {
                return '两次密码不一致，请重新输入！'
            }
        }
    })

    // 4. 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 向后台提交注册数据
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 当用户注册成功以后，自动跳转到登录页面,也就是当注册成功以后，在立马给登录按钮添加一个点击事件，跳转页面
            $('#link_login').click()

        })
    })

    // 5. 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 从后台获取登录状态
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 获取的数据，应该是用户向表单输入的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // console.log(res.token)
                    // 登录成功以后，要把token值存到本地存储中，目的是为了访问有权限的接口使用
                localStorage.setItem('token', res.token)
                    // 登录成功以后，要跳转到index页面
                location.href = 'index.html'
            }
        })
    })
})