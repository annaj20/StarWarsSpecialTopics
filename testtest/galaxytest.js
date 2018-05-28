 let mybubble;
 let shp;
 let stars;
 let time;
 let speedoftime;
 let goal;
 let startingframes;
 let frameadjust;
 let ships = [];
 let shipdata = [];
 let data;
 let places = [
 	{  	
 	name: "Naboo",
    	coordinates: [746,641],
     	color : 255
 	},
 	{
   	name: "Tatooine",
     	coordinates: [944,605],
     	color : 255
 	},
 	{
   	name: "Coruscant",
     	coordinates: [538,351],
     	color : 255
 	},
 	{
 	name: "Kamino",
     	coordinates: [1026,556],
     	color : 255
 	},
 	{
 	name: "Geonosis",
     	coordinates: [937,643],
     	color : 255
 	},
 	{
 	name: "Utapau",
     	coordinates: [685,779],
     	color : 255
 	},
 	{
 	name: "Kashyyyk",
     	coordinates: [830,344],
     	color : 255
 	},
 	{
 	name: "Mustafar",
     	coordinates: [558,752],
     	color : 255
 	},
 	{
 	name: "Polis Massa",
     	coordinates: [531,785],
     	color : 255
 	},
 	{
 	name: "Alderaan",
     	coordinates: [683,359],
     	color : 255
 	},
 	{
 	name: "Yavin VI",
     	coordinates: [817,197],
     	color : 255
 	},
 	{
 	name: "Hoth",
     	coordinates: [492,703],
     	color : 255
 	},
 	{
 	name: "Dagobah",
     	coordinates: [682,732],
     	color : 255
 	},
 	{
 	name: "Bespin",
     	coordinates: [482,686],
     	color : 255
 	},
 	{
 	name: "Endor",
     	coordinates: [347,631],
     	color : 255
 	},
 	{
 	name: "Sullust",
     	coordinates: [670,651],
     	color : 255
 	}
 ];
 
 let mentioned_locations = [['Naboo', 'Naboo'],
  [],
  ['Naboo'],
  [],
  [],
  [],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  [],
  [],
  ['Naboo', 'Naboo', 'Naboo', 'Naboo', 'Naboo'],
  [],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  ['Naboo', 'Coruscant'],
  [],
  ['Naboo', 'Coruscant', 'Coruscant', 'Coruscant'],
  ['Naboo'],
  [],
  ['Naboo', 'Coruscant', 'Tatooine'],
  ['Naboo', 'Naboo'],
  ['Tatooine'],
  ['Naboo', 'Tatooine'],
  ['Tatooine', 'Naboo'],
  [],
  [],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  ['Tatooine', 'Naboo', 'Naboo'],
  [],
  ['Coruscant'],
  [],
  [],
  ['Naboo'],
  ['Naboo'],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ['Tatooine'],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  ['Naboo'],
  [],
  ['Naboo', 'Tatooine'],
  ['Tatooine'],
  [],
  ['Coruscant', 'Coruscant', 'Coruscant', 'Coruscant'],
  ['Naboo'],
  [],
  [],
  ['Coruscant'],
  [],
  [],
  ['Coruscant', 'Naboo', 'Naboo', 'Naboo'],
  ['Naboo', 'Naboo', 'Naboo'],
  [],
  [],
  [],
  ['Alderaan', 'Naboo'],
  [],
  ['Naboo'],
  ['Naboo'],
  [],
  [],
  ['Naboo', 'Naboo'],
  [],
  ['Naboo', 'Naboo', 'Naboo'],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  [],
  ['Naboo', 'Naboo'],
  [],
  [],
  [],
  [],
  ['Naboo'],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []];
 
 function preload(){
   shp = loadImage("ship.png");
   stars = loadImage("galaxymap-1.jpg")
 
   // Load data from a TSV file
   data = loadTable("data.tsv","tsv","header")
   
   
 }
 
 function setup(){
   createCanvas(1263,902);
   for (i = 0; i < data.getRowCount(); i++){
     // get the data from table
     ship_id = data.getNum(i,0)
     leg_data = data.getNum(i,1)
     departure_data = data.getNum(i,2)
     arrival_data = data.getNum(i,3)
     originx_data = data.getNum(i,4)
     originy_data = data.getNum(i,5)
     destinationx_data = data.getNum(i,6)
     destinationy_data = data.getNum(i,7)
     // Create new ship object if first leg
     // Otherwise get old object and add to it
     if (leg_data == 1) {
       current_ship = {ship:ship_id}
       current_ship.journey = [{start:[originx_data, originy_data], destination:[destinationx_data,destinationy_data],departure:departure_data,arrival:arrival_data}]
       shipdata.push(current_ship)
     } else if (leg_data > 1) {
       current_ship = shipdata[ship_id]
       current_ship.journey.push({start:[originx_data, originy_data], destination:[destinationx_data,destinationy_data],departure:departure_data,arrival:arrival_data})
     } 
   }
   // Create Ship objects for each ship journey
   for (i = 0; i < shipdata.length; i++){
     current_ship = shipdata[i]
     ships.push(new Ship(current_ship.journey[0].start[0],current_ship.journey[0].start[1], shp, current_ship))
   }
 
   // Set values for data, and display the background image
   image(stars, 0, 0,stars.width/2, stars.height/2);
   time = 1;
   startingframes = time * 60;
   speedoftime = 1;
   goal = 0;
   frameadjust = -20;
 
 }
 
 //code from Mitchell
 
 
 function colorLocations() {
 	for (var location in mentioned.locations) {
 		let place = searchByName(location);
 		if (place !== -1) {
 		place.color = (int) (0.9 * place.color);
 	  }
 	}
 }
 
 function searchByName(name) {
  	for (var place in places) {
     		if (place.name === name) {
       		return place;
 		}
   	}
   return -1;
 }
 

function drawLocation(place) {
    ellipse(place.coordinates[0], place.coordinates[1], 10, 10);
   	fill(255,255, place.color);
 }
 
 function draw(){
   // Draw background
   imageMode(CORNER);
   image(stars, 0, 0,stars.width/2, stars.height/2);
   
   // draw nodes
  
   for (w = 0; w < places.length; w++) {
    let place = places[w]
    
     drawLocation(place);
   
   // Update each ship
   for (i = 0; i < ships.length; i++){
     current_ship = ships[i]
 
     // Check if ship is in transit
     goal = current_ship.intransit(time);
 
     // If ship is in transit, move according to which leg of the journey it is on
     if (goal[0]){
       current_ship.move(current_ship.data.journey[goal[1]].destination[0], current_ship.data.journey[goal[1]].destination[1], current_ship.data.journey[goal[1]].arrival);
     } 
     // Draw ship
     current_ship.display();
   }
   // Check if time should move forward
   time = timeflow(time, speedoftime);
  }
 
}
 
 
 // Move time function. This sets the interval for the time variable to move forward:
 // By default, this is set per 60 frames (so time = 1 is one second)
 function timeflow(time, speedoftime){
   if (frameCount % (speedoftime * 60) == 0){
     //colorLocations();
     return time += 1;
   } else {
     return time
   }
 }
 
 class Ship {
   // Constructor for ship
   constructor(x, y, icon, data) {
     this.pos = createVector(x, y);
     this.c = color(255);
     this.icon = icon;
     this.data = data;
     this.speed = 1;
     this.frameadjust = 0;
   }
 
   // Check if the ship should be in transit
   intransit(time){
     let it = false;
     let i = 0;
 
     // Go through each leg and check if we are currently during that leg
     for (i = 0; i < this.data.journey.length; i++) {
       let dep = this.data.journey[i].departure
       let arv = this.data.journey[i].arrival
 
       // If departure and arrival are on the same time interval,
       // make object arrive earlier than if on next interval
       if (dep == arv) {
         arv = arv + 1
         this.frameadjust = frameadjust
       } else {
         this.frameadjust = 0
       }
 
       if (time >= dep && time < arv) {
         it = true;
         break
       }
     }
 
     // Return true if the journey should be happening, and which journey it is
     return [it, i];
   }
   
   move(x, y, arrival) {
     if (this.frameadjust == frameadjust){
       arrival += 1
     }
 
     // Calculate information (arrival frame, goal, direction, and distance)
     let arrivalframe = (arrival * 60 * speedoftime) + this.frameadjust;
     let destination = createVector(x, y);
     let dir = p5.Vector.sub(destination, this.pos);
     let distance = dir.mag();
 
     // If the item is not already at the distance, check how many frames the object
     // has to arrive. Set the step interval to the distance divided by remainig frames
     if (distance > 0){
       let remainingframes = arrivalframe - (frameCount+startingframes);
       let stepdist = dir.normalize().mult(distance/remainingframes)
       this.pos = this.pos.add(stepdist);
     }
   }
 
   // Display the object
   display () {
       imageMode(CENTER);
       image(this.icon, this.pos.x, this.pos.y, shp.width / 4, shp.height / 4);  
   }
 }
