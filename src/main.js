const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = [
    {logo:'B',url:'https://www.bilibili.com'},
    {logo:'X',url:'https://xiedaimala.com'},
    {logo:'555电影(广告多)',url:'https://o8tv.com'},
]
const simplifyUrl = (url)=>{
    return url.replace('http://','')
            .replace('https://','')
            .replace('www.','')
            .replace(/\/.*/,'')
};
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi);
    $li.on('click',()=>{
        window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
        e.stopPropagation()//阻止冒泡
        hashMap.splice(index,1)
        render()
    })
    });
}

render()
$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请输入你要添加的网址')
        if(url.indexOf('http') !== 0 ){
            url = 'https://' + url
        }
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),
            logoType:'text',
            url:url
        })
        render()
    });

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i = 0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
