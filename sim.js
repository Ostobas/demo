const inputs = {
	prices: [60,60,60,60,60],
	demand: 100,
	priceSetup: {
		min: 50,
		max: 250,
		alfa: 4.5
	}
}

function sum(values) {
	return values.reduce((total, num) => 
		total + num, 0)
}

function avg(values) {
	return sum(values) / values.length
}

function getPriceIndex(price, setup) {
	if (price) {
		return Math.min(
			Math.max((setup.max - price) / (setup.max - setup.min), 0)
		, 1) ** setup.alfa
	} else {
		return 0
	}
}

function getSegmentIndexes(arr) {
	return arr
}

function getMarketIndexes(values, elas) {
	const average = avg(values)
	return values.map(v => (v / average) ** elas)
}

function getShares(indexes) {
	const total = sum(indexes)
	return indexes.map(i => i / total)
}

function getDemands(inputs) {
	const priceIndexes = 
		inputs.prices.map(p => getPriceIndex(p, inputs.priceSetup))
		
	return getShares(
		getMarketIndexes(
			getSegmentIndexes(priceIndexes)
		, 1.5)
	).map(share => share * inputs.demand)
}

console.log('demand:',getDemands(inputs))
