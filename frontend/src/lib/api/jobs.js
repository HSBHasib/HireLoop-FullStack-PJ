const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`);
    const data = await res.json();
    return data;
}