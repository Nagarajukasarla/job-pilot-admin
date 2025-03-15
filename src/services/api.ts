import { JobApplication } from '@/types'
import supabase from './supabaseConfig'

export const fetchAllJobApplications = async (): Promise<{ data: JobApplication[] | null, error: any }> => {
    try {
        const { data, error } = await supabase.from('_jobs').select('*')
        
        if (error) {
            return { data: null, error }
        }

        const transformedData = data.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            jobType: job.job_type,
            salaryFrom: job.salary_from,
            salaryTo: job.salary_to,
            description: job.description,
            deadLine: new Date(job.dead_line)
        }))

        return { data: transformedData, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export const createJob = async (
    job: Omit<JobApplication, "id">
): Promise<{ data: any, error: any }> => {
    try {
        const jobData = {
            title: job.title,
            company: job.company,
            location: job.location,
            job_type: job.jobType,
            salary_from: job.salaryFrom,
            salary_to: job.salaryTo,
            description: job.description,
            dead_line: job.deadLine
        }

        const { data, error } = await supabase
            .from('_jobs')
            .insert(jobData)
            .select()
            .single()

        return { data, error }
    } catch (error) {
        return { data: null, error }
    }
}


