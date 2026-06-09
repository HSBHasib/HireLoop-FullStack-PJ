'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const newJobsFunc = async (newJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobData)
    })

    const data = await res.json()
    console.log('newJob form summition dets - ', data);
    return data;
}