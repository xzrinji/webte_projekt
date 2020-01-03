
var months = [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún",
           "Júl", "August", "September", "Október", "November", "December" ];
var names = []
var hash = new Object()
var hash_names = new Object()
function nacitaj(){
return $.ajax({
    url:'meniny.xml',
    type:'GET',
    dataType:'xml',
    success:function(data){
    //console.log(data);
      var xml  = data;
      var i = 0;
      $(xml).find('zaznam').each(function(){

        var name = $(this).find("SK").text();
        var dateStr = $(this).find("den").text();
        var month = parseInt(dateStr.substring(0,2));
        var day = parseInt(dateStr.substring(2,4));
        //console.log(name + " ma meniny " + months[month-1] + " " +day);
        names.push(name);
        var date = [day,months[month-1]];
        hash[name] = date;
        hash_names[latinize(name.toLowerCase())] = i;
        i++
    });
    }
});
}

$( function() {
  //console.log(hash)
    $( "#vstup" ).autocomplete({
      //source: names
      source: names
  } );
});

function detectDate(str)
{
  return /^([\d]{1,2})\.([\d]{1,2})$/.test(str);
}

function dateTooltip()
{
  document.getElementById('tooltip').style.visibility = "visible";
  document.getElementById('tooltiptext').style.visibility = "visible";
}

function detectNum(str)
{
  return /[\d]/.test(str);
}

function findNameFromDate(str)
{
  var den;
  if(str.length == 3){
    den = parseInt(str.slice(-1));

  }else if (str.length == 4) {
    if(str[1] == '.')
      den = parseInt(str.slice(-2))
    else {
      den = parseInt(str.slice(-1))
    }

  }
  else {
    den = parseInt(str.slice(-2));
  }
  var mesiac = parseInt(str.substr(0,2));
  var datum = [den,months[mesiac-1]];
  var found = false;
  console.log(months[mesiac-1] + " " + den);
  for(var key in hash) {

    if(hash[key][0] == datum[0] && hash[key][1] == datum[1])
     {

       found = true;
       document.getElementById('informacie').innerHTML = key;
     }
   }
   if(!found)
    dateTooltip();

}

function datum()
{
  document.getElementById('tooltip').style.visibility = "hidden";
  document.getElementById('tooltiptext').style.visibility = "hidden";
  var input = document.getElementById("vstup").value;
  if(detectNum(input))
  {
    ;
    if(!detectDate(input))
      dateTooltip();
    else {
      findNameFromDate(input);

    }
  }else{
    var text = input.toLowerCase();
    //document.getElementById('informacie').innerHTML = hash[text][0]+ ". " + hash[text][1];
    var key = names[hash_names[text]];
    try{
      document.getElementById('informacie').innerHTML = hash[key][0]+ ". " + hash[key][1];
    }catch(error)
    {
      var informacie = document.getElementById('informacie');
      informacie.innerHTML = "meniny neboli vynajdené";
    }
  }
}

updateTime();
var update = setInterval(updateTime,10000);

function updateTime()
{
  var d = new Date();
  var hodiny = document.getElementById('hodiny-dnes');
  if(d.getMinutes() < 10)
  {
    hodiny.innerHTML = d.getHours() + ":0" + d.getMinutes();
  }else{
    hodiny.innerHTML = d.getHours() + ":" + d.getMinutes();
  }

  //hodiny.innerHTML = d.toLocaleTimeString();
  console.log("updated time");
}



$.when(nacitaj()).done(function(){


  var d = new Date();
  var rok = d.getFullYear();
  var mesiac = d.getMonth();
  var den = d.getDate();
  var datum = [den,months[mesiac]];
  var datumdiv = document.getElementById('datum-dnes');
  var meninydiv = document.getElementById('meniny-dnes');
  datumdiv.innerHTML += months[mesiac] + " ";
  datumdiv.innerHTML += den + ". ";
  datumdiv.innerHTML += rok + " ";

    for(var key in hash) {

      if(hash[key][0] == datum[0] && hash[key][1] == datum[1])
       {
         meninydiv.innerHTML += key;

       }

}



});
