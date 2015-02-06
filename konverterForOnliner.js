// ==UserScript==
// @name        Konverter
// @namespace   konverter.onliner.by
// @include     *.onliner.by*
// @version     1.0.8
// @author      Norman_by
// @source      https://github.com/Norman-by/konverter
// @grant       none
// ==/UserScript==

var kurs;
var expr;
var chislo;

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
      
		if (arrTmp[0].length == 2) 
		{
			var summByr = parseInt(( arrTmp[0][0] ), 10);  
			var summByr2 = parseInt(( arrTmp[0][1] ), 10);  
			if ($.isNumeric(summByr)) 
				var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' - ' + '$ ' + String(Math.round(summByr2/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		} else 
		{
			var summByr = parseInt(( arrTmp[0][0] ), 10);  
			if ($.isNumeric(summByr)) 
				var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
	   
		if(!!summDol&&!!arrTmp[1])  
			$(element).html(summDol+arrTmp[1]);
		if(!!summDol&&!!!arrTmp[1])  
			$(element).html(summDol);
     });
};

/*-------*/
function krrasota() {
	kurs = $('.top-informer-currency>a>span._u').text();
	expr = /\s/gi; 
	chislo = parseInt( kurs.replace(expr,'').slice(1), 10);
	
	convertKurs($('p.big>a>strong')); //авто-мото барахолка
        convertKurs($('td.cost>big>strong')); //барахолка
        convertKursKatalog($('.pprice')); //каталог
        convertKurs($('ul.b-ba-topicdet>li.cost')); //барахолка объявление
	convertKurs($('span.autoba-hd-details-costs>span.cost')); //авто-барахолка объявление
  
}
setTimeout(function () {
      $(document).ajaxSuccess(function(){
         krrasota();
     });
      
     krrasota();
}, 2000);

