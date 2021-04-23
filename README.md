# kaiju_battle


# this is my current query, that is getting stuck on getBattle. help!

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

# here's the error message:
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Kaiju.name.",
      "locations": [
        {
          "line": 99,
          "column": 5
        }
      ],
      "path": [
        "getBattle",
        "fighter1",
        "name"
      ]
    }
  ],
  "data": null
}
