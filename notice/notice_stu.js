var person;
var cat;
/*
cooky function get the user name and and catagery(it tis student or teacher) from locaStorage.
and the get the all the notification that belongs to the user through get_notice_student.php..
*/
function cooky()
{
	var cook=document.cookie;
	cook=cook.split(";");
	cook=cook[cook.length-1];
	cook=cook.split("=");
	person=cook[0];//"preetham"
	cat=cook[1];//"student";
	var xml=new XMLHttpRequest();
	xml.onreadystatechange=function (){
	if(this.readyState==4  && this.status==200)
	{
		var text=this.responseText;
		text=text.split("~");
		var not=text[0].split("^");
		var read=text[1].split("^");
		var star=text[2].split("^");
		var inc=0;
		if(not[inc].split("!")[0]=="NOTHING")
		{
			document.getElementById("nothing").style.display="block";
		}
		else document.getElementById("nothing").style.display="none";
		while(not[inc].split("!")[0]!="NOTHING" && inc<5)
		{
			create_div(inc+1,read[inc],change_text(not[inc]).split("!")[0],not[inc].split("!")[1],star[inc]);
			inc++;
		}
	}
	}
	xml.open("GET","get_notice_student.php?q="+person+":"+cat,true)
	xml.send();
}
function send_request(psn,tp,co_no,check,r)//it will stores the all the stared ar unstared values and read and unread values in database
{
var xml=new XMLHttpRequest();
xml.onreadystatechange=function(){
if(this.status==200 && this.readyState==4){
}
}
xml.open("GET","set_readstar.php?q="+psn+"~"+tp+"~"+co_no+"~"+check+"~"+r,true);
xml.send();
}
function reset_eloberate(id,text)// when the user click on paragraph it will reduce the eloberated text
{
id.textContent=text.slice(0,10)+"....";
id.setAttribute("onclick","elobarate(this,'"+text+"')");
}
function elobarate(id,text)// when the user click on paragraph it will elobare the text
{
id.innerHTML=text
id.setAttribute("onclick","reset_eloberate(this,'"+text+"')");
}
function reset_change_bc(id)// when the click on paragraph backgroundColor changes to light
{
id.style.backgroundColor="#6699ff";
id.setAttribute("onclick","change_bc(this)");
}
function change_bc(id)// make the backgroundColor to dark for unread messages
{
send_request(person,cat,id.id,0,1)
id.style.backgroundColor="#e6eeff";//#6699ff;
}
function reset_change_image(id) //changes to unstar image
{
send_request(person,cat,id.id,0,2)
id.src="/image/unstar.png";
id.setAttribute("onclick","change_image(this)");
}
function change_image(id)//changes to star image
{
send_request(person,cat,id.id,1,2)
id.src="/image/star.png";
id.setAttribute("onclick","reset_change_image(this)");
}
function change_text(text)//replace '\n' with <br>
{
	var res="";
	text=text.split('\r');
	for(var i=0;i<text.length;i++)
	res=res+text+"<br>";
	return res;
}
function create_div(val,i,text,date_time,ch// it will create message box with all atributes
{
	var check=document.createElement("img")
	//check.src="/image/unstar.png";
	//check.setAttribute("onclick","change_image(this)");
	check.id=val;
	if(ch==1)
	change_image(check);
	else 
	reset_change_image(check);
	check.style="height:30px;width:30px;float:left;";
	var division=document.createElement("div");
	division.style="border:thick solid;padding:20px;border-width:1px;box-shadow: 0px 0px 2px 2px #888888;width:900px;position:relative;left:200px;";
	division.id=val;
	if(i==1)
	reset_change_bc(division);
	else
	change_bc(division);
	//division.setAttribute("onclick","change_bc(this)");
	div_text=document.createElement("div");
	div_text.style="margin-left:50px;";
	var par=document.createElement("span");
	par.textContent=text.slice(0,10)+"....";
	par.setAttribute("onclick","elobarate(this,'"+text+"')");
	var sp=document.createElement("span");
	sp.textContent=date_time;
	sp.style="float:right;";
	document.body.appendChild(division);
	document.body.appendChild(document.createElement("br"));
	division.appendChild(check);
	division.appendChild(div_text);
	div_text.appendChild(par);
	division.appendChild(sp);
}
//create_div(1,"dksadk,fksfmzbskxbvsxbv<br>lhfncpqjeaczhfq afsbdkasbdk<br>abdhvdjad","zdfbkfkf",0);
//create_div(0,"dksadk,fksfmzbskxbvsxbv<br>lhfncpqjeaczhfq afsbdkasbdk<br>abdhvdjad","zdfbkfkf",1);
//alert(document.cookie);
cooky();