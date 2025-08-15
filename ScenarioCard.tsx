
'use client';

import { MortalityData } from '@/types/mortality';

interface ScenarioCardProps {
  scenario: MortalityData;
  onDelete: (id: string) => void;
}

export function ScenarioCard({ scenario, onDelete }: ScenarioCardProps) {
  const formatProbability = (prob: number) => {
    if (prob < 0.001) return '<0.1%';
    return `${(prob * 100).toFixed(1)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getScenarioName = () => {
    return scenario.formData.scenarioName || `Scenario ${scenario.id}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 gentle-hover">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {getScenarioName()}
        </h3>
        <button
          onClick={() => onDelete(scenario.id)}
          className="text-red-500 hover:text-red-700 text-sm"
          title="Delete scenario"
        >
          ✕
        </button>
      </div>

      {/* Key Statistics */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Daily Risk:</span>
          <span className="font-medium">{formatProbability(scenario.dailyProbability)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Annual Risk:</span>
          <span className="font-medium">{formatProbability(scenario.annualProbability)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Life Expectancy:</span>
          <span className="font-medium">{scenario.lifeExpectancy} years</span>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Profile:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Age:</span>
            <span>{scenario.formData.age}</span>
          </div>
          <div className="flex justify-between">
            <span>Gender:</span>
            <span>{scenario.formData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span>Smoking:</span>
            <span>{scenario.formData.smoking}</span>
          </div>
          <div className="flex justify-between">
            <span>Exercise:</span>
            <span>{scenario.formData.exercise}</span>
          </div>
          <div className="flex justify-between">
            <span>BMI:</span>
            <span>{scenario.formData.bmi}</span>
          </div>
          <div className="flex justify-between">
            <span>Conditions:</span>
            <span>{scenario.formData.chronicConditions}</span>
          </div>
        </div>
      </div>

      {/* Created Date */}
      <div className="text-xs text-gray-400 mt-4 pt-2 border-t">
        Created: {formatDate(scenario.createdAt)}
      </div>
    </div>
  );
}
