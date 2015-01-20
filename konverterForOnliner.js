// ==UserScript==
// @name        Konverter
// @namespace   konverter.onliner.by
// @include     http://*.onliner.by*
// @version     1.0.3
// @author      Norman_by
// @grant       none
// ==/UserScript==
var kurs = $('.top-informer-currency>a>span._u').text();
var expr = /\s/gi; 
var chislo = parseInt( kurs.replace(expr,'').slice(1), 10);

 

function convertKurs(selector) {
   selector.map(function(indx, element){
     
     var summByr = parseInt(($(element).text().replace(expr,'')), 10);
     var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
   
      $(element).text(summDol).attr({"title":summByr});
      $(element).parent().html( $(element).parent().html().replace("руб.",''));
  
     
  });
};
function convertKursKatalog(selector) {
   selector.map(function(indx, element){
    
    var arrTmp = $(element).html().split('&nbsp;руб.');
     arrTmp[0]= arrTmp[0].replace(expr,'').split("-");
      
    if (arrTmp[0].length == 2) {
			var summByr = parseInt(( arrTmp[0][0] ), 10);  
			var summByr2 = parseInt(( arrTmp[0][1] ), 10);  
			var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' - ' + '$ ' + String(Math.round(summByr2/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			 
        } else {
      var summByr = parseInt(( arrTmp[0][0] ), 10);  
      var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        }
	 
	     $(element).html(summDol+arrTmp[1]) ;
     });
};

/*-------*/
setTimeout(function () {
      $(document).ajaxSuccess(function(){
         
        convertKurs($('p.big>a>strong')); //авто-мото барахолка
        convertKurs($('td.cost>big>strong')); //барахолка
        convertKursKatalog($('td.pprice')); //каталог
        convertKurs($('ul.b-ba-topicdet>li.cost>strong')); //барахолка объявление
		convertKurs($('span.autoba-hd-details-costs>span.cost>strong')); //авто-барахолка объявление
     });
      
       
		convertKurs($('p.big>a>strong')); //авто-мото барахолка
		convertKurs($('td.cost>big>strong')); //барахолка
		convertKursKatalog($('td.pprice')); //каталог
		convertKurs($('ul.b-ba-topicdet>li.cost>strong')); //барахолка объявление
		convertKurs($('span.autoba-hd-details-costs>span.cost>strong')); //авто-барахолка объявление
   
    
}, 2000);
