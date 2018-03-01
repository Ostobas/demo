const inputs = {
	prices: [25,60,60,0,60,90],
	promotions: [1180000, 60000, 60000, 60000, 60000, 250000],
	qualities: [.9, .6, .6, .6, .6, .9],
	marketSetup: {
		demand: 10000,
		elas: 1.5,
		weights: {
			price: .4,
			promotion: .3,
			quality: .3
		}
	},
	priceSetup: {
		min: 50,
		max: 250,
		alfa: 4.5
	},
	promotionSetup: {
		mean: 60000
	},
	qualitySetup: {}
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
	} else return 0
}

function getPromotionIndex(promotion, setup) {
	return Math.max(Math.atan(promotion / setup.mean) / (Math.PI / 2), 0)
}

function getQualityIndex(quality, setup) {
	return quality
}

function getWeightedIndexes(inputs) {
	const priceIndexes = 
		inputs.prices.map(p => getPriceIndex(p, inputs.priceSetup))
	const promotionIndexes = 
		inputs.promotions.map(p => getPromotionIndex(p, inputs.promotionSetup))
	const qualityIndexes = 
		inputs.qualities.map(q => getQualityIndex(q, inputs.qualitySetup))

	let results = []
	for(let i = 0; i < priceIndexes.length; i++) {
		results.push(
			priceIndexes[i] * inputs.marketSetup.weights.price +
			promotionIndexes[i] * inputs.marketSetup.weights.promotion +
			qualityIndexes[i] * inputs.marketSetup.weights.quality
		)
	}

	return results
}

function getMarketRatings(values, setup) {
	const average = avg(values)
	return values.map(v => (v / average) ** setup.elas)
}

function getShares(indexes) {
	const total = sum(indexes)
	return indexes.map(i => i / total)
}

function getDemands(inputs) {
	const segmentIndexes = getWeightedIndexes(inputs)
	const marketIndexes = getMarketRatings(segmentIndexes, inputs.marketSetup)
	const demands = getShares(marketIndexes)
		.map(share => share * inputs.marketSetup.demand)
	return  demands.map(d => Math.round(d))
}

console.log('demand:',getDemands(inputs))
