'strict mode'

function Vehicle(make, model, year){
	this.make = make
	this.model = model
	this.year = year
	this.isRunning = false
}

Vehicle.prototype.turnOn = function(){
	this.isRunning = true
}

Vehicle.prototype.turnOff = function(){
	this.isRunning = false
} 

Vehicle.prototype.honk = function() {
	return this.isRunning ? "beep" : {}
}

let car = new Vehicle('Mercedes', 'GX200', '2018')
car.turnOn()
console.log(car.honk())