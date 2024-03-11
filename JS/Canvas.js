var cronometro;

function detenerse(){	
	clearInterval(cronometro);
}

function carga(){
	contador_s =0;
	contador_m =0;
	s = document.getElementById("segundos");
	m = document.getElementById("minutos");

	cronometro = setInterval(
	function(){
		if(contador_s==60){
			contador_s=0;
			contador_m++;
			m.innerHTML = contador_m;

			if(contador_m==60){
				contador_m=0;
			}
		}
		s.innerHTML = contador_s;
		contador_s++;
	},1000);
}

var imgalt= "",aciertos=0,pantalla=1,puntos=0,a,b,c;
var arrastrando;
var myscore;
let usedindx=[],usedpos=[];
function init(){
 lvlstart();
 addlisteners();
}

/*var mySound;
var myMusic;

function musica(){
    mySound = new sound("sounds/musica.mp3");
    myMusic = new sound("sounds/musica.mp3");
    myMusic.play();
}

function musicano(){
    myMusic.stop();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
}*/

function addlisteners(){
  var animals = document.getElementsByClassName('animal');
  var biomas = document.getElementsByClassName('bioma');

    for(i=0;i<3;i++){
      var animal= animals[i];
      animal.addEventListener('dragstart',draginit,false);
      animal.addEventListener('dragend',dragend,false);

      var bioma= biomas[i];
      bioma.addEventListener('dragover',dragover,false);
      bioma.addEventListener('dragleave',dragleave,false);
      bioma.addEventListener('drop',dropthebase,false);
    }
}

function lvlstart(){
  var next= document.getElementById("siglvl");
  next.classList.add("hidden");

  var animals = document.getElementsByClassName('animal');
  var biomas = document.getElementsByClassName('bioma');
  var nombres = document.getElementsByClassName('nombre');
  var nombrestext= document.getElementsByClassName('nombretext');
  if(pantalla==1){
  	for(i=0;i<3 ;i++){
		var j= getRan(0,8);
		while(usedindx.indexOf(j)>=0){
      		j=getRan(0,8);
  		}
    	usedindx[i]=j;
  
		var x= getRan(0,3);

	    while(usedpos.indexOf(x)>=0){
    	x=getRan(0,3);
  		}
    	usedpos[i]=x;
 	}
}else{
   a=usedindx[0];
   b=usedindx[1];
   c=usedindx[2];
   for(i=0;i<3 ;i++){
		var j= getRanNoRep(0,8);
		while(usedindx.indexOf(j)>=0){
      		j=getRanNoRep(0,8);
		}
    	usedindx[i]=j;
  		var x= getRan(0,3);

    	while(usedpos.indexOf(x)>=0){
      		x=getRan(0,3);
		}
    usedpos[i]=x;
 	}
}



for(i=0;i<3;i++){
  	var animal= animals[i];
	animal.style.backgroundImage= "url(../Images/Canva_png "+(usedindx[i])+".png)";
	animal.setAttribute("id",usedindx[i]);
	animal.classList.remove("hidden");
	var bioma= biomas[usedpos[i]];
	bioma.style.backgroundImage= "url(images/biomes/"+(usedindx[i])+".png)";
	bioma.setAttribute("id",usedindx[i]);
	var nombre= nombres[usedpos[i]];
	nombre.setAttribute("id","n"+usedindx[i]);
	var nombretext= nombrestext[usedpos[i]];
	nombretext.setAttribute("id","nt"+usedindx[i]);
}
}

function getRan(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRanNoRep(min, max,a,b,c) {
  var res= Math.floor(Math.random() * (max - min)) + min;
  if(res==a || res==b || res==c){
    getRanNoRep(min,max,a,b,c);
  }else{
    return(res);
  }
}

function  nextlvl(){
      lvlstart();
}

function dropthebase(e){
	p = document.getElementById("puntos");
	e.preventDefault();
	var datos= e.dataTransfer.getData('text');
	this.classList.remove("over");
	
	if(e.target.id==imgalt){
		arrastrando.classList.add("hidden");
		var audio = new Audio('sounds/'+e.target.id+'.ogg');
		var nom = document.getElementById("n"+e.target.id);
		var nomtext = document.getElementById("nt"+e.target.id);
		nomtext.innerHTML=getNombre(imgalt);
    	nom.classList.add("nombre_visible");
    	aciertos+=1;
    	puntos+=50;
    	audio.play(audio);
    	p.innerHTML = puntos;
    	this.style.backgroundImage="url(images/good/"+e.target.id+".png)";
  	if(aciertos==3){
    	usedpos=[];
    	pantalla=2;
	      
		for(i=0;i<3;i++){
      		var nom = document.getElementById("n"+usedindx[i]);
      		nom.classList.remove("nombre_visible");
      	}
		var next= document.getElementById("siglvl");
		next.classList.remove("hidden");
		setTimeout(lvlstart,3000);
  	}

  	if(aciertos==6){
    setTimeout( function() { window.location.href = "congrat.html"; }, 6000 );
    var audio = new Audio('sounds/complete.mp3');       
    audio.play();
    localStorage.setItem("puntos",puntos);
    localStorage.setItem("tiempo",contador_s);
    cronometro.detenerse();
  	}
	}else{
  		var audio = new Audio('sounds/wrong.mp3');
  		audio.play();
  		puntos-=20;
  		p.innerHTML = puntos;
 	}
}

function dragover(e){
  e.preventDefault();/*Evita que el default*/
  this.classList.add("over");
  return false;
}

function dragleave(e){
  this.classList.remove("over");
}

function draginit(e){
  arrastrando= this;
  var padre= document.createElement("div");
  var clone= this.cloneNode(true);
  padre.appendChild(clone);
  e.dataTransfer.setData('text',padre.innerHTML);
  imgalt= e.target.id;
}

function dragend(e){
   this.classList.remove("over");
}

function getNombre(id){
  switch(id){
    case "0" :
      return "Vaca";
    break
      case "1" :
      return "Lobo";
    break
      case "2" :
      return "Cabra";
    break
      case "3" :
      return "Llama";
    break
      case "4" :
      return "Panda";
    break
      case "5" :
      return "Perico";
    break
      case "6" :
      return "Cerdito";
    break
      case "7" :
      return "Conejo";
    break
      case "8" :
      return "Araña";
    break
    default: "";

  }
} 

window.addEventListener("load",init,false);