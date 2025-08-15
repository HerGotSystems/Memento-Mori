
'use client';

import { useState } from 'react';
import { MortalityData } from '@/types/mortality';
import { saveScenario, getStoredScenarios } from '@/utils/storage';
import { getRandomQuote } from '@/data/quotes';
import Link from 'next/link';

interface ResultsDisplayProps {
  data: MortalityData;
  onReset: () => void;
}

export function ResultsDisplay({ data, onReset }: ResultsDisplayProps) {
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [scenarioName, setScenarioName] = useState(data.formData.scenarioName || '');
  const [saved, setSaved] = useState(false);
  const [quote] = useState(getRandomQuote());

  const existingScenarios = getStoredScenarios();
  const canSave = existingScenarios.length < 3 && !saved;

  const handleSave = () => {
    if (scenarioName.trim()) {
      const scenarioToSave = {
        ...data,
        formData: {
          ...data.formData,
          scenarioName: scenarioName.trim()
        }
      };
      saveScenario(scenarioToSave);
      setSaved(true);
      setShowSaveForm(false);
    }
  };

  const formatProbability = (prob: number) => {
    if (prob < 0.001) return '<0.1%';
    return `${(prob * 100).toFixed(1)}%`;
  };

  const formatOdds = (prob: number) => {
    const odds = Math.round(1 / prob);
    return `1 in ${odds.toLocaleString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Philosophical Context */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
        <blockquote className="philosophical-quote text-lg mb-3">
          {quote.text}
        </blockquote>
        <p className="text-sm text-gray-600">— {quote.author}</p>
      </div>

      {/* Main Results */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Your Mortality Perspective</h2>
        
        {/* Key Statistics */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Daily Probability</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {formatProbability(data.dailyProbability)}
            </p>
            <p className="text-sm text-gray-600">
              Odds: {formatOdds(data.dailyProbability)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Statistical chance of mortality on any given day
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Annual Probability</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">
              {formatProbability(data.annualProbability)}
            </p>
            <p className="text-sm text-gray-600">
              Odds: {formatOdds(data.annualProbability)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Statistical chance of mortality within one year
            </p>
          </div>
        </div>

        {/* Life Expectancy */}
        <div className="text-center p-6 bg-purple-50 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-2">Statistical Life Expectancy</h3>
          <p className="text-2xl font-bold text-purple-600 mb-2">
            {data.lifeExpectancy} years
          </p>
          <p className="text-sm text-gray-600">
            Estimated remaining years based on current factors
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Population average - individual outcomes vary significantly
          </p>
        </div>

        {/* Risk Factors Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Profile Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Age:</strong> {data.formData.age} years</p>
              <p><strong>Gender:</strong> {data.formData.gender}</p>
              <p><strong>Smoking:</strong> {data.formData.smoking}</p>
            </div>
            <div>
              <p><strong>Exercise:</strong> {data.formData.exercise}</p>
              <p><strong>BMI Category:</strong> {data.formData.bmi}</p>
              <p><strong>Chronic Conditions:</strong> {data.formData.chronicConditions}</p>
            </div>
          </div>
        </div>

        {/* Philosophical Reflection */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">Reflection Questions</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• How does this statistical perspective change your view of today?</li>
            <li>• What would you prioritize if you truly internalized life's finite nature?</li>
            <li>• Which relationships and activities deserve more of your attention?</li>
            <li>• What legacy do you want to create with your remaining time?</li>
            <li>• How can this awareness motivate positive life changes?</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onReset}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Calculate Another Scenario
          </button>

          {canSave && (
            <button
              onClick={() => setShowSaveForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save This Scenario
            </button>
          )}

          {existingScenarios.length > 0 && (
            <Link
              href="/compare"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compare Scenarios
            </Link>
          )}
        </div>

        {/* Save Form */}
        {showSaveForm && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-3">Save This Scenario</h4>
            <div className="flex gap-3">
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="Enter scenario name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSave}
                disabled={!scenarioName.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              You can save up to 3 scenarios for comparison ({existingScenarios.length}/3 used)
            </p>
          </div>
        )}
      </div>

      {/* Important Disclaimers */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-3">Important Disclaimers</h3>
        <ul className="space-y-2 text-red-700 text-sm">
          <li>• These are population-level statistical estimates, not individual predictions</li>
          <li>• Many factors affecting mortality are not captured in this simplified model</li>
          <li>• Individual outcomes can vary dramatically from statistical averages</li>
          <li>• This tool is for educational and philosophical purposes only</li>
          <li>• Consult healthcare professionals for medical advice and health decisions</li>
          <li>• If this information causes distress, please see our <Link href="/resources" className="underline">resources page</Link></li>
        </ul>
      </div>
    </div>
  );
}
