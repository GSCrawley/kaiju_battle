# kaiju_battle

# run the server with: node server.js
 
# in your web browser navigate to: http://localhost:4000/graphql 

# try the following query to see it working:

{
    allKaiju {
        name
        power
     }
    
     allCities {
       name
       population
     }
    
     getKaiju(id:1) {
        name
      power
    }
{
		getBattle(fighter1:"Godzilla", fighter2:"Mothra", arena:"Tokyo") {
			fighter1 {
				name
      	power
      }
			fighter2   {
                name
				power
    }
			arena {
			name
			population
			}
   }
  
   }

