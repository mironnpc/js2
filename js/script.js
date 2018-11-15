/*1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет соответствующий DOM-узел.
2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю. Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.*/

function Container(){
	this.id = "";
	this.className = "";
	this.htmlCode = "";
}

Container.prototype.render = function(){
	return this.htmlCode;
}

//1. создаем новый метод для класса menu для самоуничтожения в DOM
Container.prototype.remove = function() {
	//находим
    var deleteElement = document.getElementById(this.id);
    //удаляем
    deleteElement.parentNode.removeChild(deleteElement);
    //возвращаем сообщение об удалении из DOM
    return "remove " + this.id + " done";
}

function Menu(my_id, my_class, my_items){
	Container.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(){
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";

	for (var item in this.items){
		if(this.items[item] instanceof MenuItem){
			result += this.items[item].render();
		}
	}
	result += "</ul>";
	return result;
}

function MenuItem(my_href, my_name){
	Container.call(this);
	this.className = "menu-item";
	this.href = my_href;
	this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	return "<li class='"+this.className+"' href='"+this.href+"'>"
	+this.itemName+"</li>" 
}

var m_item1 = new MenuItem("/", "Главная");
var m_item2 = new MenuItem("/cat", "Каталог");
var m_item3 = new MenuItem("/gal", "Галерея");

var m_items = {0:m_item1, 1:m_item2, 2:m_item3}

var menu = new Menu("my_menu", "my_class",m_items);

document.write(menu.render());

//************************* -= 1. начало =- *****************

//создаем обьект для самоуничтожения в DOM
var r_m_item1 = new MenuItem("/", "Главная для удаления");
var r_m_item2 = new MenuItem("/cat", "Каталог для удаления");
var r_m_item3 = new MenuItem("/gal", "Галерея для удаления");
var r_m_items = {0:r_m_item1, 1:r_m_item2, 2:r_m_item3}
var removedMenu = new Menu("removedMenu", "my_class", r_m_items);
//Рисуем обьект
document.write(removedMenu.render());
//вызываем метод для самоеуничтожения обьекта в DOM
removedMenu.remove();

//************************* -= 1. конец =- *****************

//************************* -= 2. начало =- *****************
//создаем и наследуемся в продвинутое меню
function advMenu(my_id, my_class, my_items, my_caption = "") {
    Container.call(this);
    this.id = my_id;
	this.className = my_class;
	this.items = my_items;
    this.caption = my_caption;
}

advMenu.prototype = Object.create(Container.prototype);
advMenu.prototype.constructor = advMenu;

advMenu.prototype.render = function(){
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";

	for (var item in this.items){
		if(this.items[item] instanceof MenuItem){
			result += this.items[item].render();
		} else if (this.items[item] instanceof advMenu) {
            result += "<li class='" + this.items[item].className + "'>" + this.items[item].caption;
            result += "<ul class='" + this.className + "' id='" + this.id + "'>";
            result += this.items[item].render();
            result += "</ul>" + "</li>";
        }
	}
	result += "</ul>";
	return result;
}

//объявляем подменю 1 и 2
var sub_m_item1 = new MenuItem("#", "подменю 1");
var sub_m_item2 = new MenuItem("#", "подменю 2");
//делаем из подменю массив
var sub_m_items = {0:sub_m_item1, 1:sub_m_item2};

//объявляем обьекты меню
var adv_m_item1 = new advMenu("menu_1", "my_class", sub_m_items, "меню 1");
var adv_m_item2 = new MenuItem("#", "меню 2");
var adv_m_item3 = new MenuItem("#", "меню 3");
//делаем из обьектов меню массив
var adv_m_items = {0:adv_m_item1, 1:adv_m_item2, 2:adv_m_item3}

//создаем новое меню
var newMenu = new advMenu("sub_menu", "my_class", adv_m_items);

//рисуем его на строницу
document.write(newMenu.render());

//*******************************************************************



//*****    ДЗ 2        ********

/*
1. Улучшить меню таким образом, чтобы оно могло иметь многоуровневую структуру.
2. Создать меню, соответствующее меню интернет-магазина (личный кабинет, каталог, промоакции и т.д.).
3. Создать функционал фотогалереи: имеется статичный json-набор миниатюр, на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
4. * Создать два статических ответа {result : “success”} и {result: “error”}. В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/


// 1 и 2 задание
var my_items;
function fullMenuContent(xhr){
    my_items ={}
    //временный массив подменю
    array_subMenuItems = {}
    //массив массивов подменю
    mySub_items = {}

  if(xhr.readyState == 4){
    if(xhr.status == 0){
        var items = JSON.parse(xhr.responseText);
        
        
        for (var i=0; i< items.menu_items.length;i++){
            //проверка есть ли у меню подменю
            if (items.menu_items[i].submenu instanceof Array) {
                for (var j=0; j < items.menu_items[i].submenu.length; j++) {
                     array_subMenuItems[j] = new MenuItem(items.menu_items[i].submenu[j].href, items.menu_items[i].submenu[j].title);
                }
                //передаем массив подменю в массив массивов подменю.... =/
                mySub_items[i] = array_subMenuItems;
                //чистим для следующего меню
                array_subMenuItems = {};
                //создаем меню с подменю
                my_items[i] = new advMenu("menu_" + i, "my_class", mySub_items[i], items.menu_items[i].title);
            } else {
                my_items[i] = new MenuItem(items.menu_items[i].href, items.menu_items[i].title);    
            }
        }
        var menu = new advMenu("my_menu", "My_class", my_items);
      var div = document.write(menu.render());
    }
  }
}

var xhr = false;

function checkBrowser (xhr) {
    if (window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject){
      try{
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
      } catch(e){
        try{
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }catch(e){}
      }
    }
    return xhr;
}

xhr = checkBrowser(xhr);

if (!xhr){
  alert("Ошибка: невозможно создать");
}


xhr.onreadystatechange = function (){fullMenuContent(xhr)};
xhr.open('GET', "./menu.json", true); //
xhr.send();

//3 задание

var img_xhr = false;

img_xhr = checkBrowser(img_xhr);

if (!img_xhr){
  alert("Ошибка: невозможно создать");
}

function fillImgContent () {
    
  if(img_xhr.readyState == 4){
    if(img_xhr.status == 0){
        var items = JSON.parse(img_xhr.responseText);
        var result = "";
        
        for (var i=0; i< items.image.length;i++){
            result += '<img src="' + items.image[i].href + '" alt="' + items.image[i].alt + '" style="width: 100px">';
            //console.log(result);
        }
        
      var div = document.write(result);
    }
  }
}


img_xhr.onreadystatechange = function () {
    fillImgContent(img_xhr);
};
img_xhr.open('GET', "./img.json", true); //
img_xhr.send();