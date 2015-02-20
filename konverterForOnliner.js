// ==UserScript==
// @name Konverter
// @namespace konverter.onliner.by
// @include *.onliner.by*
// @version 1.0.11
// @author Norman_by
// @source https://github.com/Norman-by/konverter
// @grant none
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
		 
		
		var arrTmp = $(element).html().match(/((([0-9]{1,3}&nbsp;){1,}(\d{3}))|(([0-9]{1,3}\s)*(\d{3})))/gi);
		 
		if (arrTmp.length == 2)
		{
			var summByr = parseInt(( arrTmp[0].replace(expr,'') ), 10);
			var summByr2 = parseInt(( arrTmp[1].replace(expr,'') ), 10);
			if ($.isNumeric(summByr))
			var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' - ' + '$ ' + String(Math.round(summByr2/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		} else
		{
			var summByr = parseInt(( arrTmp[0].replace(expr,'') ), 10);
			if ($.isNumeric(summByr))
			var summDol = '$ ' + String(Math.round(summByr/chislo)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		}
			
				if(!!summDol&&!!arrTmp[1])
						$(element).html(summDol);
				if(!!summDol&&!!!arrTmp[1])
						$(element).html(summDol);
		

		
		
	});
};
/*-------*/
function krrasota() {
	kurs = $('.top-informer-currency>a>span._u').text();
	expr = /\s|&nbsp;/gi;
	chislo = parseInt( kurs.replace(expr,'').slice(1), 10);
	convertKurs($('p.big>a>strong')); //авто-мото барахолка
	convertKurs($('td.cost>big>strong')); //барахолка
	convertKursKatalog($('.pprice>a')); //каталог 
	convertKursKatalog($('.b-offers>.b-offers-desc>.b-offers-desc__info>.b-offers-desc__info-price>.b-offers-desc__info-sub')); //каталог один товар - список продавцов
	convertKursKatalog($('.product-primary-i>.b-offers-desc>.b-offers-desc__info>.b-offers-desc__info-price>.b-offers-desc__info-sub>a')); //каталог один товар - описание
	convertKurs($('ul.b-ba-topicdet>li.cost')); //барахолка объявление
	convertKurs($('span.autoba-hd-details-costs>span.cost')); //авто-барахолка объявление
}
setTimeout(function () {
	$(document).ajaxSuccess(function(){
		krrasota();
	});
	krrasota();
}, 2000);
