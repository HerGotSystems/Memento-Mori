
import { FormData, MortalityResults } from '@/types/mortality';

// Baseline annual mortality rates by age and gender (per 1000 people)
// Based on CDC 2023 life tables and actuarial data
// Source: CDC National Vital Statistics System, 2023 data
const BASELINE_MORTALITY_RATES: { [key: string]: { [age: number]: number } } = {
  male: {
    18: 1.2, 20: 1.3, 25: 1.4, 30: 1.5, 35: 1.8, 40: 2.5, 45: 3.8, 50: 5.8, 
    55: 8.8, 60: 13.2, 65: 19.8, 70: 30.1, 75: 46.2, 80: 72.4, 85: 115.3, 90: 180.0, 95: 280.0
  },
  female: {
    18: 0.4, 20: 0.5, 25: 0.6, 30: 0.7, 35: 0.9, 40: 1.3, 45: 2.0, 50: 3.0, 
    55: 4.5, 60: 6.8, 65: 10.3, 70: 16.2, 75: 26.1, 80: 43.7, 85: 76.8, 90: 125.0, 95: 200.0
  }
};

// Risk multipliers based on recent epidemiological studies and meta-analyses
// Sources: BMJ 2016, JAMA 2013, Lancet 2017, eLife 2019, Nature 2024
const RISK_MULTIPLIERS = {
  smoking: {
    never: 1.0,
    former: 1.3,    // Former smokers: 30% increased risk (eLife 2019)
    current: 2.0    // Current smokers: 100% increased risk (multiple studies)
  },
  exercise: {
    sedentary: 1.4,   // 40% increased risk for inactive (WHO, Lancet 2017)
    light: 1.2,       // 20% increased risk for minimal activity
    moderate: 1.0,    // Reference: meets PA guidelines (150 min/week)
    active: 0.8       // 20% decreased risk for high activity (BMJ 2020)
  },
  bmi: {
    underweight: 1.3, // 30% increased risk (BMJ 2016 meta-analysis)
    normal: 1.0,      // Reference: BMI 18.5-24.9
    overweight: 0.94, // 6% decreased risk (JAMA 2013 - "obesity paradox")
    obese: 1.18       // 18% increased risk for BMI ≥30 (BMJ 2016)
  },
  chronicConditions: {
    none: 1.0,        // Reference: no major chronic conditions
    one: 1.8,         // 80% increased risk with one condition
    multiple: 2.5     // 150% increased risk with multiple conditions
  }
};

function getBaselineMortalityRate(age: number, gender: 'male' | 'female'): number {
  const rates = BASELINE_MORTALITY_RATES[gender];
  
  // Find the closest age bracket
  const ages = Object.keys(rates).map(Number).sort((a, b) => a - b);
  
  if (age <= ages[0]) return rates[ages[0]];
  if (age >= ages[ages.length - 1]) return rates[ages[ages.length - 1]];
  
  // Linear interpolation between age brackets
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

function calculateRiskMultiplier(formData: FormData): number {
  const smokingMultiplier = RISK_MULTIPLIERS.smoking[formData.smoking];
  const exerciseMultiplier = RISK_MULTIPLIERS.exercise[formData.exercise];
  const bmiMultiplier = RISK_MULTIPLIERS.bmi[formData.bmi];
  const conditionsMultiplier = RISK_MULTIPLIERS.chronicConditions[formData.chronicConditions];
  
  return smokingMultiplier * exerciseMultiplier * bmiMultiplier * conditionsMultiplier;
}

function calculateLifeExpectancy(age: number, gender: 'male' | 'female', riskMultiplier: number): number {
  // Base life expectancy by gender (2023 CDC data)
  // Males: 75.8 years, Females: 81.1 years
  const baseLifeExpectancy = gender === 'male' ? 75.8 : 81.1;
  
  // Adjust for current age
  const remainingYears = Math.max(0, baseLifeExpectancy - age);
  
  // Adjust for risk factors using a more nuanced model
  // Risk multiplier affects remaining years, but with diminishing impact at older ages
  const ageAdjustmentFactor = Math.max(0.5, 1 - (age - 30) / 100); // Reduces impact of risk factors with age
  const effectiveMultiplier = 1 + (riskMultiplier - 1) * ageAdjustmentFactor;
  
  const adjustedRemainingYears = remainingYears / effectiveMultiplier;
  
  return Math.round(adjustedRemainingYears * 10) / 10;
}

export function calculateMortality(formData: FormData): MortalityResults {
  // Get baseline annual mortality rate (per 1000 people)
  const baselineRate = getBaselineMortalityRate(formData.age, formData.gender);
  
  // Calculate risk multiplier
  const riskMultiplier = calculateRiskMultiplier(formData);
  
  // Adjust baseline rate with risk factors
  const adjustedAnnualRate = (baselineRate / 1000) * riskMultiplier;
  
  // Convert to daily probability
  const dailyProbability = 1 - Math.pow(1 - adjustedAnnualRate, 1/365);
  
  // Calculate life expectancy
  const lifeExpectancy = calculateLifeExpectancy(formData.age, formData.gender, riskMultiplier);
  
  return {
    dailyProbability,
    annualProbability: adjustedAnnualRate,
    lifeExpectancy,
    riskMultiplier
  };
}

// Test function for validation
export function testCalculations() {
  const testCase: FormData = {
    age: 35,
    gender: 'male',
    smoking: 'never',
    exercise: 'moderate',
    bmi: 'normal',
    chronicConditions: 'none',
    scenarioName: 'test'
  };
  
  const results = calculateMortality(testCase);
  console.log('Test Results:', results);
  
  // Basic sanity checks
  console.log('Daily probability reasonable:', results.dailyProbability > 0 && results.dailyProbability < 0.01);
  console.log('Annual probability reasonable:', results.annualProbability > 0 && results.annualProbability < 0.1);
  console.log('Life expectancy reasonable:', results.lifeExpectancy > 20 && results.lifeExpectancy < 60);
}
