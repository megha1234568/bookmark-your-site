
     document.getElementById('list').onclick=function(){
     document.getElementById('container').style.transform='scale(1)'
     }
     document.getElementById('close').onclick=function(){
       document.getElementById('container').style.transform='scale(0)'
     }
     
     //listen for form
     document.getElementById('form').addEventListener('submit',MemorizeMarkers)
    function MemorizeMarkers(x){
         //variables

         var Name=document.getElementById('WebsiteName').value;
         var URL=document.getElementById('url').value;
        //prevent default
         x.preventDefault()

          // check validation 

         if(!Name & URL){
           alert('Please Insert the Site Name and URL')
           return false;
         }else if (!Name){
          alert('Please Insert the Site Name')
          return false;
         }else if(!URL){
          alert('Please Insert the URL')
          return false;
         }else{
           showlight()
           setTimeout(hidelight,1000)
         }

         //storage the mrkers even if we closed the browser

         var markers=
             {
             SiteName:Name,
             SiteUrl:URL
             }
            

        if(localStorage.getItem('SiteMarkers')===null){
            var SiteMarkers=[]
            SiteMarkers.push(markers)
        
         var myJSON=JSON.stringify(SiteMarkers)
         localStorage.setItem('SiteMarkers',myJSON)
        }else{
          //get sitemarkers from local storage as an object
          var get=JSON.parse(localStorage.getItem('SiteMarkers'))
          //Push it again to the array
          get.push(markers)
          //convert it to a string
          var myJSON=JSON.stringify(get)
          //display it as a string
          localStorage.setItem('SiteMarkers',myJSON)
        }
          //redisplay again to prevent display the result after reloading reloading the page
         Display()
         document.getElementById('form').reset()
     }

     //delete sitemark function

     function Delete(siteUrl){
      var SiteMarks=JSON.parse(localStorage.getItem('SiteMarkers'))
      for(var i=0;i<SiteMarks.length;i++){
        if(SiteMarks[i].SiteUrl==siteUrl){
          SiteMarks.splice(i,1)
        }
      }
      //reset localstorage
      localStorage.setItem('SiteMarkers',JSON.stringify(SiteMarks))
     //redisplay again to prevent display the result after reloading reloading the page
     Display()
     }

  //function to display them in the overlayed page
     function Display(){
       var SiteMarks=JSON.parse(localStorage.getItem('SiteMarkers'))
       var results=document.getElementById('yourSites')
       results.innerHTML='';
       for(var i=0;i<SiteMarks.length;i++){
        var siteName=SiteMarks[i].SiteName
        var siteUrl=SiteMarks[i].SiteUrl
           results.innerHTML+='<div>'+'<h3>'+siteName+'<a href="'+siteUrl+'" target="_blank">Go</a>'+'<button onclick="Delete(\''+siteUrl+'\')" target="_blank">Delete</button>'+'</h3>'+'</div>'
       }

     }
  
   //functions to appear and disappear the red ball
   function showlight(){
      document.getElementById('light').style.display='block'
   }

   function hidelight(){
      document.getElementById('light').style.display='none'
   }

   

 