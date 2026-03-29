export const mockFetchSkillsData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.geography && filters.geography !== 'All') params.append('geography', filters.geography);
    if (filters.industry && filters.industry !== 'All') params.append('industry', filters.industry);
    
    const response = await fetch(`http://localhost:8000/api/skills?${params.toString()}`);
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

export const getEmergingSkills = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/skills/emerging');
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emerging skills", error);
    return [];
  }
};

export const getTopSkillsByDemand = async (limit = 3) => {
  try {
    const response = await fetch(`http://localhost:8000/api/skills/top?limit=${limit}`);
    if (!response.ok) throw new Error('API failed');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch top skills", error);
    return [];
  }
};
