const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// Get All Jobs Data
export const getAllJobs = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/jobs`);
    const data = await res.json();
    return data;
}

// Get Job Data based on Company
export const getCompanyJobs = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`);
    const data = await res.json();
    return data;
}