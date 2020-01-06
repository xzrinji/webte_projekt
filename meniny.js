/*$.get( "meniny.xml", function( data ) {
   var xml = new XMLSerializer().serializeToString(data);
   var xmlDoc = $.parseXML( xml );
   var xml = $( xmlDoc );
   var zaznam = xml.find( "zaznam" );

   console.log(zaznam.length);
   for(var i = 0; i < zaznam.length; i++)
   {
     var den = zaznam[i];
     var meno = den.getElementsByTagName("SK");
     console.log(meno[0].);
   }
});
*/
var months = [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún",
           "Júl", "August", "September", "Október", "November", "December" ];
var names = []
var hash = new Object()
function nacitaj(){
return $.ajax({
    url:'meniny.xml',
    type:'GET',
    dataType:'xml',
    success:function(data){
    //console.log(data);
      var xml  = data;
      $(xml).find('zaznam').each(function(){
        var name = $(this).find("SK").text();
        var dateStr = $(this).find("den").text();
        var month = parseInt(dateStr.substring(0,2));
        var day = parseInt(dateStr.substring(2,4));
        //console.log(name + " ma meniny " + months[month-1] + " " +day);
        names.push(name);
        var date = [day,months[month-1]];
        hash[name] = date;
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
  var text = document.getElementById('vstup').value
  document.getElementById('informacie').innerHTML = hash[text][0] + ". " + hash[text][1];
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
