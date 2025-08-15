
'use client';

import { useState } from 'react';
import { MortalityData, FormData } from '@/types/mortality';
import { calculateMortality } from '@/utils/mortality';
import { saveScenario, getStoredScenarios } from '@/utils/storage';
import { getRandomQuote } from '@/data/quotes';

interface MortalityFormProps {
  onSubmit: (data: MortalityData) => void;
}

export function MortalityForm({ onSubmit }: MortalityFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: 35,
    gender: 'male',
    smoking: 'never',
    exercise: 'moderate',
    bmi: 'normal',
    chronicConditions: 'none',
    scenarioName: ''
  });

  const [showSaveOption, setShowSaveOption] = useState(false);
  const [quote] = useState(getRandomQuote());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const results = calculateMortality(formData);
    const mortalityData: MortalityData = {
      ...results,
      formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Check if we should show save option
    const existingScenarios = getStoredScenarios();
    if (existingScenarios.length < 3) {
      setShowSaveOption(true);
    }

    onSubmit(mortalityData);
  };

  const handleSaveScenario = (data: MortalityData) => {
    if (formData.scenarioName.trim()) {
      const scenarioToSave = {
        ...data,
        formData: {
          ...data.formData,
          scenarioName: formData.scenarioName.trim()
        }
      };
      saveScenario(scenarioToSave);
    }
  };

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Inspirational Quote */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8">
        <blockquote className="philosophical-quote text-center">
          {quote.text}
        </blockquote>
        <p className="text-center text-sm text-gray-500 mt-2">— {quote.author}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Life Factors Assessment</h2>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            min="18"
            max="100"
            value={formData.age}
            onChange={(e) => updateFormData('age', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Age is the primary factor in mortality calculations</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Biological differences affect life expectancy statistics</p>
        </div>

        {/* Smoking */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Smoking Status
          </label>
          <select
            value={formData.smoking}
            onChange={(e) => updateFormData('smoking', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="never">Never smoked</option>
            <option value="former">Former smoker (quit &gt;1 year ago)</option>
            <option value="current">Current smoker</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Smoking significantly impacts mortality risk</p>
        </div>

        {/* Exercise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exercise Frequency
          </label>
          <select
            value={formData.exercise}
            onChange={(e) => updateFormData('exercise', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light (1-2 times per week)</option>
            <option value="moderate">Moderate (3-4 times per week)</option>
            <option value="active">Very active (5+ times per week)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Regular exercise provides significant health benefits</p>
        </div>

        {/* BMI Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BMI Category
          </label>
          <select
            value={formData.bmi}
            onChange={(e) => updateFormData('bmi', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="underweight">Underweight (&lt;18.5)</option>
            <option value="normal">Normal (18.5-24.9)</option>
            <option value="overweight">Overweight (25-29.9)</option>
            <option value="obese">Obese (30+)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Weight category as a proxy for metabolic health</p>
        </div>

        {/* Chronic Conditions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major Chronic Conditions
          </label>
          <select
            value={formData.chronicConditions}
            onChange={(e) => updateFormData('chronicConditions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="one">One condition (diabetes, heart disease, etc.)</option>
            <option value="multiple">Multiple conditions</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Major health conditions affect mortality risk</p>
        </div>

        {/* Scenario Name (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scenario Name (Optional)
          </label>
          <input
            type="text"
            value={formData.scenarioName}
            onChange={(e) => updateFormData('scenarioName', e.target.value)}
            placeholder="e.g., 'Current lifestyle' or 'If I quit smoking'"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Name this scenario to save and compare later</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Mortality Perspective
        </button>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center mt-4 p-4 bg-gray-50 rounded-md">
          <p className="mb-2">
            <strong>Important:</strong> This tool provides statistical estimates based on population data 
            for educational and philosophical purposes only.
          </p>
          <p>
            Results cannot predict individual outcomes and should not be used for medical decisions. 
            Consult healthcare professionals for medical advice.
          </p>
        </div>
      </form>
    </div>
  );
}
