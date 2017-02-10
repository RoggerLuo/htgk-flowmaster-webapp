import fetch from 'isomorphic-fetch'

export default {
    init(page) {

        fetch(domainName + '/webbase5/api/company/companyDetail?companyId=' + page.query.id)
            .then(response => response.json())
            .then(json => {
                if (json.length == '0') {
                    return false
                }
                window.corpName = json[0].name
                window.corpUrl = window.location.href

                if (page.query.guanzhu == '1') { //已经关注了
                    // json[0].guanzhuclass = 'yiguanzhu'
                    json[0].guanzhuText = '取消关注'
                    json[0].guanzhuStyle = "color:white;background-color:red;"
                } else {
                    // json[0].guanzhuclass = ''
                    json[0].guanzhuText = '添加关注'
                    // json[0].guanzhuStyle =

                }
                var tpl = Tool.renderTpl(detailTpl, json[0]);
                $('.corp-detail-page').html(tpl);



                $('.guanzhu').click(function() {
                    const that = this
                    if (that.innerHTML != '取消关注') {
                        fetch(domainName + '/webbase5/api/user/appUserSetting/save?id=' + page.query.id + '&userId=1&type=1')
                            .then(response => response.json())
                            .then(json => {
                                if (json[0].result == '1') {
                                    that.style.backgroundColor = 'red'
                                    that.style.color = 'white'
                                    that.innerHTML = '取消关注'
                                    refreshAfterChange()
                                }else{
                                    alert(json[0].msg)
                                }
                            })
                    } else {
                        fetch(domainName + '/webbase5/api/user/appUserSetting/delete?id=' + page.query.id + '&userId=1&type=1')
                            .then(response => response.json())
                            .then(json => {
                                if (json[0].result == '1') {
                                    that.style.backgroundColor = 'white'
                                    that.style.color = 'red'
                                    that.innerHTML = '添加关注'
                                    refreshAfterChange()

                                }
                            })
                    }
                })
                fetch(domainName + '/webbase5/api/user/changeStatus/getlistByCompanyId?userId=1&companyId=' + page.query.id)
                    .then(response2 => response2.json())
                    .then(json2 => {
                        if (!json2[0]) {
                            return false
                        }

                        if (!json2[0].dictName) {
                            return false
                        }
                        if (json2[0].dictName == "工商信息") {
                            $('.gongshangxinxiicon').addClass('icon-newsvg')
                        }
                    })
            })
    }
};
