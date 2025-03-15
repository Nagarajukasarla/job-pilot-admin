export type JobApplication = {
    id: string
    title: string
    company: string
    location: string
    jobType: string
    salaryFrom: number
    salaryTo: number
    description: string
    deadLine: Date
}

export type JobApplicationFormData = Omit<JobApplication, 'id'>
