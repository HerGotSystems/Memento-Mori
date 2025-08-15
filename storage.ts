
import { MortalityData } from '@/types/mortality';

const STORAGE_KEY = 'memento-mori-scenarios';
const MAX_SCENARIOS = 3;

export function getStoredScenarios(): MortalityData[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading scenarios from localStorage:', error);
    return [];
  }
}

export function saveScenario(scenario: MortalityData): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const existing = getStoredScenarios();
    
    // Check if we're at the limit
    if (existing.length >= MAX_SCENARIOS) {
      console.warn(`Cannot save more than ${MAX_SCENARIOS} scenarios`);
      return false;
    }
    
    // Add the new scenario
    const updated = [...existing, scenario];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving scenario to localStorage:', error);
    return false;
  }
}

export function deleteScenario(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const existing = getStoredScenarios();
    const filtered = existing.filter(scenario => scenario.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting scenario from localStorage:', error);
    return false;
  }
}

export function clearAllScenarios(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing scenarios from localStorage:', error);
    return false;
  }
}

export function getScenarioCount(): number {
  return getStoredScenarios().length;
}

export function canSaveMoreScenarios(): boolean {
  return getScenarioCount() < MAX_SCENARIOS;
}
