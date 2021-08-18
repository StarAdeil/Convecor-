//Обьект дистанция со значениями при конвертировании
let convertObj = {
	"allName":["m","cm","ft","in"],
	"m":{
		"m":1,
		"cm":100,
		"ft":3.281,
		"in":39.37
	},
	"cm":{
		"cm":1,
		"m":0.01,
		"ft":0.03281,
		"in":0.3937
	},
	"ft":{
		"ft":1,
		"m":0.3048,
		"cm":30.48,
		"in":12
	},
	"in":{
		"in":1,
		"m":0.0254,
		"cm":2.54,
		"ft":0.08333
	},
}
//Заполнение Селект стандартными значениями
for(let i = 0 ; i < convertObj.allName.length ; i++){
	$("select").append( $("<option></option>").text(convertObj.allName[i]).attr("value",convertObj.allName[i]) );
}
//Событие конверктация по значениям в обьекте конверт
$("#resButton").on("click",function(){
	$("#res").text( ((convertObj // Результат впишеться в поле рез
	[$("#typeOne").val()]//Значение первого селекта 
	[$("#convertTo").val()])//Значение второго селекта 
	*$("#countValue").val() ).toFixed(3) );//Число 
});
//Новый тип дистанции
function newTypeDistance(newName,haveName,count){
	let standart = 0;
	convertObj.allName.push(newName);
	$("select").append( $("<option></option>").text(newName).attr("value",newName) );
	//Определяем стандарт по которому будем вычислять, ищем тип который уже есть в обьекте  , 
	//если при создание новый тип больше значения еталона то делим , если меньше умножаем
	if(count > 0){
		standart = (convertObj[haveName][haveName])/count;
	}else if(count < 0){
		standart = (convertObj[haveName][haveName])*count;
	}
	convertObj[haveName][newName] = standart;
	//Добавляем в каждую имеющейся велечину в обьекте новую со значением при конвертации на нее
	//При создании берем в каждой велечене в обьекте значение которое бралось для стандарта и переводиться так как соотношение к стандарту 
	for(let key in convertObj){
		if(key != "allName"){
			convertObj[key][newName] = (convertObj[key][haveName])*standart;
		}
	}
	convertObj[newName] = {};//Создаем обьект новой велечины внутри обьекта 
	//Создаем и наполняем новую велечену и значения при конвертации на уже имеющейся велечины
	for(let key in convertObj){
			if(key != "allName" && key != newName){
				convertObj[newName][key] =  (convertObj[haveName][key])*count ;
			}
	}
}

$("#resButton2").on("click",function(){
	//console.log($("#nameNewType").val());//Название нового значения
	//console.log($("#haveType").val());//Выбираем уже  имеющейся
	//console.log($("#newTypeCount").val());//количество нового по отношению к старому типу
	newTypeDistance($("#nameNewType").val(),$("#haveType").val(),$("#newTypeCount").val());
	console.log(convertObj);
});

//newTypeDistance("mm","cm",0.1);
//newTypeDistance("km","m",1000);
console.log(convertObj);




