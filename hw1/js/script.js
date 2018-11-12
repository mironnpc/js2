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
//************************* -= 2. начало =- *****************
