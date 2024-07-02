
    var from = "/";
    var jsonData = null;
    $(document).ready(function () {
        from = window.location.href;
        from = from.substr(from.indexOf("=") + 1, from.length);
        if (from.length == window.location.href.length) from = "/"; // 如果from参数为空，默认设置为根目录
        loadJson("./json" + from);
    });

    function loadJson(baseUrl) {
        if (jsonData) {
            processData(jsonData);
        } else {
            $.getJSON(baseUrl, function (data) {
                jsonData = data;
                processData(data);
            });
        }
    }

    function processData(data) {
        let result = '';
		// 过滤掉 .ini 和 .ico 文件
		data = data.filter(item => !item.name.endsWith('.ini') && !item.name.endsWith('.ico'));
        for (let i = 0; i < data.length; i++) {
            result += '<tr>';
            result += '<td>' + createLink(data[i]) + '</td>'; // 调用createLink函数创建超链接
            result += '<td>' + formatType(data[i].type) + '</td>';
            result += '<td>' + formatDateTime(data[i].mtime) + '</td>';
            result += '<td>' + formatSize(data[i].size, data[i].type) + '</td>';
            result += '</tr>';
        }
        $('#load').append(result);
    }

    function createLink(item) {
        if (item.type === 'directory') {
            let url = './?from=' + from + '/' + item.name; // 创建目录的超链接地址
            // console.log('dir_url1:', url);
            url = url.replace('//', '/');
            // console.log('dir_url2:', url);
            return '<i class="fa-solid fa-folder fa-beat" style="color: #337ab7;"></i> &nbsp;&nbsp;<a href="' + url + '">' + item.name + '</a>'; // 返回目录的超链接
        } else {
            let url = window.location.href + '/' + item.name; // 创建文件的超链接地址
            // console.log('file1: ', url)
            if (url.includes('/?from=/')) {
                url = url.replace('/?from=/', '/json/');
                // console.log('file2: ', url)
                return '<i class="fa-solid fa-file fa-bounce" style="color: #2f4365;"></i>  &nbsp;&nbsp; <a href="' + url + '" download>' + item.name + '</a>'; // 返回文件的超链接，并添加下载属性
            } else {
                url = window.location.href + 'json/' + item.name;
                // console.log('file1: ', url)
                return '<i class="fa-solid fa-file fa-bounce" style="color: #2f4365;"></i>  &nbsp;&nbsp; <a href="' + url + '" download>' + item.name + '</a>'; // 返回文件的超链接，并添加下载属性
            }

        }
    }

    function formatType(type) {
        if (type === 'directory') {
            return '<i class="fa-solid fa-folder" style="color: #2f4365;"></i>&nbsp;&nbsp; 文件夹'
        } else {
            return '<i class="fa-solid fa-file-invoice-dollar" style="color: #24385c;"></i>&nbsp;&nbsp;文件'
        }
    }

    function formatDateTime(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // 补零处理
        var day = ('0' + date.getDate()).slice(-2); // 补零处理
        return '<i class="fa-regular fa-calendar-days" style="color: #2f4365;"></i>  ' + '&nbsp;&nbsp;' + year + '年' + month + '月' + day + '日';
    }

    function formatSize(size, type) {
        if (type === 'file') {
            var units = ['B', 'KB', 'MB', 'GB'];
            var i = 0;
            while (size >= 1024 && i < units.length - 1) {
                size /= 1024;
                i++;
            }
            return '<i class="fa-solid fa-align-right"></i>' + '&nbsp;&nbsp;' + size.toFixed(2) + ' ' + units[i];
        } else {
            return ''; // 文件夹size显示空
        }
    }

    function goBack() {
        window.history.back();
    }

    function goForward() {
        window.history.forward();
    }

    function goHome() {
        window.location.href = '/';
    }
