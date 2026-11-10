(function(){
  var DEV=[
    {id:'pc',file:'index.html',name:'PC 端',w:1280,h:800,cls:''},
    {id:'tablet',file:'tablet.html',name:'平板端',w:768,h:1024,cls:'tab'},
    {id:'mobile',file:'mobile.html',name:'手机端',w:375,h:812,cls:'phone'}
  ];
  var SEC=[['home','首屏 Banner'],['brands','品牌入口'],['events','热门活动'],['about','关于 BBWave'],['license','合法资质'],['support','客服与负责任博彩']];
  var cur=document.body.dataset.dev,d=DEV.filter(function(x){return x.id===cur})[0];
  var sec=(location.hash||'').replace('#','')||'home';

  // 左侧目录
  var toc='<div class="grp">页面原型</div>';
  DEV.forEach(function(x){
    toc+='<a class="dev'+(x.id===cur?' on':'')+'" href="'+x.file+'">'+x.name+'<span>'+x.w+'×'+x.h+'</span></a><div class="subs">'+
      SEC.map(function(s){return '<a href="'+x.file+'#'+s[0]+'" data-s="'+s[0]+'">'+s[1]+'</a>'}).join('')+'</div>';
  });
  document.getElementById('side').innerHTML='<div class="brand"><i>BB</i><div><b>BBWave 集团官网</b><small>页面原型 · 2026-11-10</small></div></div><nav class="toc">'+toc+'</nav><div class="foot">原型内右上角可切换 EN / 中；左下角可显示原型批注</div>';

  // 顶栏
  document.getElementById('bar').innerHTML='<button class="menu-btn" id="mb">☰</button><h1>'+d.name+'原型</h1><span class="tag">'+d.w+' × '+d.h+'</span><span class="sp"></span><a class="btn" href="proto/site.html" target="_blank">新窗口打开原型</a>';
  document.getElementById('mb').onclick=function(){document.getElementById('side').classList.toggle('open')};

  // 设备框
  var top=d.cls==='phone'?'<div class="notch"><b></b></div>':(d.cls==='tab'?'':'<div class="chrome"><i></i><i></i><i></i><span>bbwave.ph</span></div>');
  var fr=document.getElementById('frame');fr.className='frame '+d.cls;
  fr.innerHTML=top+'<iframe id="ifr" title="'+d.name+'" src="proto/site.html#'+sec+'"></iframe>';
  var ifr=document.getElementById('ifr');

  function fit(){
    var st=document.getElementById('stage'),aw=st.clientWidth-48,ah=st.clientHeight-48;
    var chromeH=d.cls==='phone'?28+20:(d.cls==='tab'?24:34);
    var h=d.h;
    if(!d.cls){ // PC：按宽度缩放，高度撑满可视区
      var s=Math.min(1,aw/d.w);h=Math.max(500,Math.floor((ah-chromeH)/s));
    }else{var s=Math.min(1,(ah-chromeH)/d.h,aw/(d.w+30))}
    ifr.style.width=d.w+'px';ifr.style.height=h+'px';
    fr.style.transformOrigin='top left';fr.style.transform='scale('+s+')';
    fr.style.marginRight=(-fr.offsetWidth*(1-s))+'px';
    fr.style.marginBottom=(-fr.offsetHeight*(1-s))+'px';
  }
  window.addEventListener('resize',fit);fit();

  function mark(s){[].forEach.call(document.querySelectorAll('.subs a'),function(a){a.classList.toggle('on',a.closest('.subs').previousElementSibling.classList.contains('on')&&a.dataset.s===s)})}
  mark(sec);
  window.addEventListener('hashchange',function(){var s=location.hash.replace('#','')||'home';ifr.src='proto/site.html#'+s;mark(s);document.getElementById('side').classList.remove('open')});
})();
