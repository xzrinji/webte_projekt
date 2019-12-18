
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
      source: names
    });
  } );

function datum()
{
  var text = latinize(document.getElementById('vstup').value.toLowerCase());
  //document.getElementById('informacie').innerHTML = hash[text][0]+ ". " + hash[text][1];
  var key = names[hash_names[text]];
  document.getElementById('informacie').innerHTML = hash[key][0]+ ". " + hash[key][1];

}


$.when(nacitaj()).done(function(){


  var d = new Date();
  var mesiac = d.getMonth();
  var den = d.getDate();
  var datum = [den,months[mesiac]];
  var dnes = document.getElementById('dnes');
    for(var key in hash) {

      if(hash[key][0] == datum[0] && hash[key][1] == datum[1])
       dnes.innerHTML += key;
  }

});
