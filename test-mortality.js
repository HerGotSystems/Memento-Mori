// Simple test script for mortality calculations
// This simulates the calculation logic in JavaScript

// Baseline annual mortality rates by age and gender (per 1000 people)
const BASELINE_MORTALITY_RATES = {
  male: {
    18: 1.2, 20: 1.3, 25: 1.4, 30: 1.5, 35: 1.8, 40: 2.5, 45: 3.8, 50: 5.8, 
    55: 8.8, 60: 13.2, 65: 19.8, 70: 30.1, 75: 46.2, 80: 72.4, 85: 115.3, 90: 180.0, 95: 280.0
  },
  female: {
    18: 0.4, 20: 0.5, 25: 0.6, 30: 0.7, 35: 0.9, 40: 1.3, 45: 2.0, 50: 3.0, 
    55: 4.5, 60: 6.8, 65: 10.3, 70: 16.2, 75: 26.1, 80: 43.7, 85: 76.8, 90: 125.0, 95: 200.0
  }
};

// Risk multipliers
const RISK_MULTIPLIERS = {
  smoking: {
    never: 1.0,
    former: 1.3,
    current: 2.0
  },
  exercise: {
    sedentary: 1.4,
    light: 1.2,
    moderate: 1.0,
    active: 0.8
  },
  bmi: {
    underweight: 1.3,
    normal: 1.0,
    overweight: 0.94,
    obese: 1.18
  },
  chronicConditions: {
    none: 1.0,
    one: 1.8,
    multiple: 2.5
  }
};

function getBaselineMortalityRate(age, gender) {
  const rates = BASELINE_MORTALITY_RATES[gender];
  const ages = Object.keys(rates).map(Number).sort((a, b) => a - b);
  
  if (age <= ages[0]) return rates[ages[0]];
  if (age >= ages[ages.length - 1]) return rates[ages[ages.length - 1]];
  
  // Linear interpolation
  for (let i = 0; i < ages.length - 1; i++) {
    if (age >= ages[i] && age <= ages[i + 1]) {
      const lowerAge = ages[i];
      const upperAge = ages[i + 1];
      const lowerRate = rates[lowerAge];
      const upperRate = rates[upperAge];
      
      const ratio = (age - lowerAge) / (upperAge - lowerAge);
      return lowerRate + (upperRate - lowerRate) * ratio;
    }
  }
  
  return rates[ages[ages.length - 1]];
}

function calculateRiskMultiplier(formData) {
  const smokingMultiplier = RISK_MULTIPLIERS.smoking[formData.smoking];
  const exerciseMultiplier = RISK_MULTIPLIERS.exercise[formData.exercise];
  const bmiMultiplier = RISK_MULTIPLIERS.bmi[formData.bmi];
  const conditionsMultiplier = RISK_MULTIPLIERS.chronicConditions[formData.chronicConditions];
  
  return smokingMultiplier * exerciseMultiplier * bmiMultiplier * conditionsMultiplier;
}

function calculateLifeExpectancy(age, gender, riskMultiplier) {
  const baseLifeExpectancy = gender === 'male' ? 75.8 : 81.1;
  const remainingYears = Math.max(0, baseLifeExpectancy - age);
  const ageAdjustmentFactor = Math.max(0.5, 1 - (age - 30) / 100);
  const effectiveMultiplier = 1 + (riskMultiplier - 1) * ageAdjustmentFactor;
  const adjustedRemainingYears = remainingYears / effectiveMultiplier;
  
  return Math.round(adjustedRemainingYears * 10) / 10;
}

function calculateMortality(formData) {
  const baselineRate = getBaselineMortalityRate(formData.age, formData.gender);
  const riskMultiplier = calculateRiskMultiplier(formData);
  const adjustedAnnualRate = (baselineRate / 1000) * riskMultiplier;
  const dailyProbability = 1 - Math.pow(1 - adjustedAnnualRate, 1/365);
  const lifeExpectancy = calculateLifeExpectancy(formData.age, formData.gender, riskMultiplier);
  
  return {
    dailyProbability,
    annualProbability: adjustedAnnualRate,
    lifeExpectancy,
    riskMultiplier
  };
}

// Test cases
const testCases = [
  {
    name: "Healthy 35-year-old male",
    data: {
      age: 35,
      gender: 'male',
      smoking: 'never',
      exercise: 'moderate',
      bmi: 'normal',
      chronicConditions: 'none'
    }
  },
  {
    name: "Smoking 45-year-old female",
    data: {
      age: 45,
      gender: 'female',
      smoking: 'current',
      exercise: 'sedentary',
      bmi: 'overweight',
      chronicConditions: 'none'
    }
  },
  {
    name: "Active 60-year-old male",
    data: {
      age: 60,
      gender: 'male',
      smoking: 'never',
      exercise: 'active',
      bmi: 'normal',
      chronicConditions: 'one'
    }
  }
];

console.log("=== Memento Mori Mortality Calculator Test ===\n");

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  const results = calculateMortality(testCase.data);
  
  console.log(`  Daily probability: ${(results.dailyProbability * 100).toFixed(4)}% (1 in ${Math.round(1/results.dailyProbability).toLocaleString()})`);
  console.log(`  Annual probability: ${(results.annualProbability * 100).toFixed(2)}% (1 in ${Math.round(1/results.annualProbability).toLocaleString()})`);
  console.log(`  Life expectancy: ${results.lifeExpectancy} years`);
  console.log(`  Risk multiplier: ${results.riskMultiplier.toFixed(2)}x`);
  
  // Sanity checks
  const dailyReasonable = results.dailyProbability > 0 && results.dailyProbability < 0.01;
  const annualReasonable = results.annualProbability > 0 && results.annualProbability < 0.2;
  const lifeExpectancyReasonable = results.lifeExpectancy > 0 && results.lifeExpectancy < 70;
  
  console.log(`  ✓ Sanity checks: Daily ${dailyReasonable ? 'PASS' : 'FAIL'}, Annual ${annualReasonable ? 'PASS' : 'FAIL'}, Life Exp ${lifeExpectancyReasonable ? 'PASS' : 'FAIL'}`);
  console.log("");
});

console.log("=== Test Complete ===");
